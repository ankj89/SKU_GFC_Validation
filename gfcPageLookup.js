// ============================================================
// GFC PAGE LOOKUP ENGINE
// Phase 1
//
// Room + SKU -> best GFC page
//
// This does NOT try to understand the drawing.
// It only identifies the most likely page.
// ============================================================


// ============================================================
// NORMALIZATION
// ============================================================

function normalizeLookupText(text) {

    if (!text) {
        return "";
    }

    return String(text)
        .replace(/\[.*?\]/g, "")
        .replace(/[^a-zA-Z0-9]+/g, " ")
        .replace(/\s+/g, " ")
        .trim()
        .toLowerCase();

}


// ============================================================
// STOP WORDS
// ============================================================

const GFC_LOOKUP_STOP_WORDS = new Set([

    "the",
    "and",
    "with",
    "for",
    "only",
    "new",
    "item",
    "work",
    "works",
    "complete",
    "providing",
    "provide",
    "supply",
    "installation",
    "install",
    "as",
    "per",
    "specification",
    "specifications",
    "standard"

]);


// ============================================================
// TOKENIZE
// ============================================================

function getLookupTokens(text) {

    return normalizeLookupText(text)

        .split(" ")

        .filter(token => {

            if (!token) {
                return false;
            }

            if (token.length < 2) {
                return false;
            }

            if (
                GFC_LOOKUP_STOP_WORDS
                    .has(token)
            ) {
                return false;
            }

            return true;

        });

}


// ============================================================
// ROOM ALIASES
// ============================================================

function getRoomSearchTerms(room) {

    if (!room) {
        return [];
    }

    const normalized =
        normalizeLookupText(room);

    const terms = new Set();

    if (normalized) {
        terms.add(normalized);
    }

    // Common room variations

    const aliases = {

        "master bedroom": [
            "master bedroom",
            "master bed",
            "m bedroom",
            "mbr"
        ],

        "bedroom": [
            "bedroom",
            "bed"
        ],

        "bedroom 1": [
            "bedroom 1",
            "bed 1",
            "bedroom one",
            "bed 01",
            "bed-1"
        ],

        "bedroom 2": [
            "bedroom 2",
            "bed 2",
            "bedroom two",
            "bed 02",
            "bed-2"
        ],

        "bedroom 3": [
            "bedroom 3",
            "bed 3",
            "bedroom three",
            "bed 03",
            "bed-3"
        ],

        "living room": [
            "living room",
            "living",
            "lounge"
        ],

        "dining room": [
            "dining room",
            "dining"
        ],

        "kitchen": [
            "kitchen",
            "modular kitchen"
        ],

        "utility": [
            "utility",
            "utility area"
        ],

        "balcony": [
            "balcony"
        ],

        "toilet": [
            "toilet",
            "bathroom",
            "washroom"
        ]

    };

    Object.keys(aliases)
        .forEach(key => {

            if (
                normalized === key ||
                normalized.includes(key)
            ) {

                aliases[key]
                    .forEach(alias =>
                        terms.add(alias)
                    );

            }

        });

    return Array.from(terms);

}


// ============================================================
// SKU SEARCH TERMS
// ============================================================

function getSKUSearchTerms(item, description) {

    const terms = new Set();

    const source = [

        item || "",

        description || ""

    ].join(" ");

    const normalized =
        normalizeLookupText(source);

    if (normalized) {

        terms.add(normalized);

    }

    getLookupTokens(source)
        .forEach(token =>
            terms.add(token)
        );

    return Array.from(terms);

}


// ============================================================
// PHRASE MATCH
// ============================================================

function containsPhrase(text, phrase) {

    if (!text || !phrase) {
        return false;
    }

    return text.includes(
        normalizeLookupText(phrase)
    );

}


// ============================================================
// PAGE SCORING
// ============================================================

function scoreGFCPage(
    page,
    currentSKU
) {

    if (!page || !currentSKU) {
        return null;
    }

    const room =
        currentSKU.room || "";

    const item =
        currentSKU.item || "";

    const description =
        currentSKU.description || "";

    const pageText =
        page.normalizedText || "";

    if (!pageText) {
        return null;
    }


    let score = 0;

    let roomMatches = [];

    let skuMatches = [];


    // ========================================================
    // ROOM MATCHING
    // ========================================================

    const roomTerms =
        getRoomSearchTerms(room);

    roomTerms.forEach(term => {

        if (
            containsPhrase(
                pageText,
                term
            )
        ) {

            roomMatches.push(term);

            // Exact room phrase gets more weight

            if (
                normalizeLookupText(room)
                ===
                normalizeLookupText(term)
            ) {

                score += 35;

            }

            else {

                score += 20;

            }

        }

    });


    // ========================================================
    // SKU / DESCRIPTION MATCHING
    // ========================================================

    const skuTerms =
        getSKUSearchTerms(
            item,
            description
        );

    // Exact SKU phrase

    const normalizedSKU =
        normalizeLookupText(item);

    if (
        normalizedSKU &&
        containsPhrase(
            pageText,
            normalizedSKU
        )
    ) {

        score += 60;

        skuMatches.push(
            normalizedSKU
        );

    }


    // Description phrase

    const normalizedDescription =
        normalizeLookupText(
            description
        );

    if (
        normalizedDescription &&
        normalizedDescription.length > 5 &&
        containsPhrase(
            pageText,
            normalizedDescription
        )
    ) {

        score += 35;

        skuMatches.push(
            normalizedDescription
        );

    }


    // Individual meaningful tokens

    const uniqueTokens =
        new Set(
            getLookupTokens(
                item + " " + description
            )
        );

    uniqueTokens.forEach(token => {

        if (
            pageText.includes(token)
        ) {

            // Don't overinflate score

            score += 4;

            skuMatches.push(token);

        }

    });


    // ========================================================
    // ROOM + SKU COMBINATION BONUS
    // ========================================================

    if (
        roomMatches.length > 0 &&
        skuMatches.length > 0
    ) {

        score += 30;

    }


    // ========================================================
    // CAP SCORE
    // ========================================================

    score =
        Math.min(score, 100);


    return {

        page: page.page,

        score: score,

        roomMatches:
            [...new Set(roomMatches)],

        skuMatches:
            [...new Set(skuMatches)],

        preview:
            page.text
                .substring(0, 300)

    };

}


// ============================================================
// SEARCH ENTIRE GFC
// ============================================================

function searchGFCForSKU(
    currentSKU
) {

    if (!currentSKU) {
        return [];
    }

    if (!gfcIndexReady) {

        console.warn(
            "GFC page index is not ready."
        );

        return [];

    }

    const results = [];

    gfcPageIndex.forEach(page => {

        const result =
            scoreGFCPage(
                page,
                currentSKU
            );

        if (
            result &&
            result.score > 0
        ) {

            results.push(result);

        }

    });


    // Highest score first

    results.sort(
        (a, b) =>
            b.score - a.score
    );


    return results;

}


// ============================================================
// GET BEST MATCH
// ============================================================

function findBestGFCPage(
    currentSKU
) {

    const results =
        searchGFCForSKU(
            currentSKU
        );

    if (!results.length) {

        return null;

    }

    return {

        ...results[0],

        candidates:
            results.slice(0, 10),

        source:
            "SEARCH"

    };

}


// ============================================================
// PUBLIC DEBUG
// ============================================================

window.searchGFCForSKU =
    searchGFCForSKU;

window.findBestGFCPage =
    findBestGFCPage;
