// ============================================================
// GFC PAGE LOOKUP ENGINE
// ============================================================


// ============================================================
// NORMALIZATION
// ============================================================

function normalizeLookupText(text){

    if(!text){
        return "";
    }

    return String(text)
        .replace(/\[.*?\]/g,"")
        .replace(/[^a-zA-Z0-9]+/g," ")
        .replace(/\s+/g," ")
        .trim()
        .toLowerCase();

}


// ============================================================
// ROOM NORMALIZATION
// ============================================================

function normalizeLookupRoom(room){

    if(!room){
        return "";
    }

    let value =
        normalizeLookupText(room);


    // bedroom-02 → bedroom 2
    value =
        value.replace(
            /\bbedroom\s*0*(\d+)\b/g,
            "bedroom $1"
        );


    // bed-02 → bedroom 2
    value =
        value.replace(
            /\bbed\s*0*(\d+)\b/g,
            "bedroom $1"
        );


    return value
        .replace(/\s+/g," ")
        .trim();

}


// ============================================================
// ROOM TERMS
// ============================================================

function getRoomTerms(room){

    const normalized =
        normalizeLookupRoom(room);

    const terms =
        new Set();

    if(!normalized){
        return [];
    }

    terms.add(normalized);


    const bedroomMatch =
        normalized.match(
            /^bedroom\s+(\d+)$/
        );

    if(bedroomMatch){

        const number =
            bedroomMatch[1];

        terms.add(
            `bedroom ${number}`
        );

        terms.add(
            `bed ${number}`
        );

        terms.add(
            `bedroom 0${number}`
        );

    }


    if(
        normalized ===
        "master bedroom"
    ){

        terms.add("master bedroom");
        terms.add("master bed");
        terms.add("m bedroom");
        terms.add("mbr");

    }


    if(
        normalized ===
        "living room"
    ){

        terms.add("living room");
        terms.add("living");

    }


    if(
        normalized ===
        "dining room"
    ){

        terms.add("dining room");
        terms.add("dining");

    }


    if(
        normalized ===
        "toilet"
    ){

        terms.add("toilet");
        terms.add("bathroom");
        terms.add("washroom");

    }


    return Array.from(terms);

}


// ============================================================
// SKU TERMS
// ============================================================

function getSKUTerms(item,description){

    const itemText =
        normalizeLookupText(item);

    const descriptionText =
        normalizeLookupText(description);


    const result = {

        exactSKU:
            itemText,

        exactDescription:
            descriptionText,

        skuTokens:
            itemText
                .split(" ")
                .filter(x => x.length >= 2),

        descriptionTokens:
            descriptionText
                .split(" ")
                .filter(x => x.length >= 2)

    };

    return result;

}


// ============================================================
// DRAWING TYPE DETECTION
// ============================================================

function detectDrawingTypes(text){

    const types = [];

    const t =
        normalizeLookupText(text);


    if(
        t.includes("interior elevation") ||
        t.includes("wall elevation")
    ){

        types.push(
            "INTERIOR_ELEVATION"
        );

    }


    if(
        t.includes("floor plan") ||
        t.includes("furniture plan")
    ){

        types.push(
            "FLOOR_PLAN"
        );

    }


    if(
        t.includes("ceiling plan") ||
        t.includes("false ceiling plan")
    ){

        types.push(
            "CEILING_PLAN"
        );

    }


    if(
        t.includes("electrical plan") ||
        t.includes("electrical layout")
    ){

        types.push(
            "ELECTRICAL_PLAN"
        );

    }


    if(
        t.includes("section")
    ){

        types.push(
            "SECTION"
        );

    }


    if(
        t.includes("detail")
    ){

        types.push(
            "DETAIL"
        );

    }


    return types;

}


// ============================================================
// DETECT ROOMS ON PAGE
// ============================================================

function detectRoomsOnPage(text){

    const normalized =
        normalizeLookupText(text);

    const rooms = new Set();


    // Bedroom 1 / Bedroom-01 / Bedroom 01
    const bedroomMatches =
        normalized.matchAll(
            /\bbedroom\s*0*(\d+)\b/g
        );

    for(
        const match of bedroomMatches
    ){

        rooms.add(
            `bedroom ${Number(match[1])}`
        );

    }


    // Master bedroom
    if(
        normalized.includes(
            "master bedroom"
        )
    ){

        rooms.add(
            "master bedroom"
        );

    }


    if(
        normalized.includes("living room") ||
        /\bliving\b/.test(normalized)
    ){

        rooms.add(
            "living room"
        );

    }


    if(
        normalized.includes("dining room") ||
        /\bdining\b/.test(normalized)
    ){

        rooms.add(
            "dining room"
        );

    }


    if(
        normalized.includes("kitchen")
    ){

        rooms.add(
            "kitchen"
        );

    }


    if(
        normalized.includes("utility")
    ){

        rooms.add(
            "utility"
        );

    }


    return Array.from(rooms);

}


// ============================================================
// ROOM MATCH
// ============================================================

function evaluateRoomMatch(
    page,
    currentRoom
){

    const pageText =
        page.normalizedText || "";

    const targetRoom =
        normalizeLookupRoom(
            currentRoom
        );

    const pageRooms =
        detectRoomsOnPage(
            pageText
        );


    const roomTerms =
        getRoomTerms(
            currentRoom
        );


    let exact =
        false;

    let weak =
        false;

    let conflict =
        false;


    // Exact room detected

    for(
        const room of pageRooms
    ){

        if(
            room === targetRoom
        ){

            exact = true;

        }

    }


    // Search aliases

    if(!exact){

        for(
            const term of roomTerms
        ){

            if(
                pageText.includes(
                    term
                )
            ){

                weak = true;

                break;

            }

        }

    }


    // If page is explicitly room-specific
    // to another bedroom, reject it.

    if(
        pageRooms.length === 1 &&
        !exact
    ){

        conflict = true;

    }


    return {

        exact,
        weak,
        conflict,
        pageRooms

    };

}


// ============================================================
// SCORE PAGE
// ============================================================

function scoreGFCPage(
    page,
    currentSKU
){

    if(
        !page ||
        !currentSKU
    ){

        return null;

    }


    const text =
        page.normalizedText || "";


    if(!text){
        return null;
    }


    const roomResult =
        evaluateRoomMatch(
            page,
            currentSKU.room
        );


    const sku =
        getSKUTerms(
            currentSKU.item,
            currentSKU.description
        );


    let score = 0;

    const reasons = [];


    // ========================================================
    // ROOM
    // ========================================================

    if(roomResult.exact){

        score += 35;

        reasons.push(
            "Exact room"
        );

    }
    else if(roomResult.weak){

        score += 10;

        reasons.push(
            "Weak room match"
        );

    }


    // ========================================================
    // WRONG ROOM
    // ========================================================

    if(roomResult.conflict){

        score -= 100;

        reasons.push(
            "Different room"
        );

    }


    // ========================================================
    // EXACT SKU
    // ========================================================

    if(
        sku.exactSKU &&
        text.includes(
            sku.exactSKU
        )
    ){

        score += 70;

        reasons.push(
            "Exact SKU"
        );

    }


    // ========================================================
    // SKU TOKEN MATCH
    // ========================================================

    let skuTokenHits = 0;

    sku.skuTokens.forEach(token => {

        if(
            text.includes(token)
        ){

            skuTokenHits++;

        }

    });


    if(skuTokenHits){

        score +=
            Math.min(
                skuTokenHits * 6,
                24
            );

        reasons.push(
            `${skuTokenHits} SKU token match`
        );

    }


    // ========================================================
    // DESCRIPTION MATCH
    // ========================================================

    let descriptionHits = 0;

    sku.descriptionTokens
        .forEach(token => {

            if(
                token.length >= 3 &&
                text.includes(token)
            ){

                descriptionHits++;

            }

        });


    if(descriptionHits){

        score +=
            Math.min(
                descriptionHits * 3,
                18
            );

        reasons.push(
            `${descriptionHits} description match`
        );

    }


    // ========================================================
    // DRAWING TYPE
    // ========================================================

    const drawingTypes =
        detectDrawingTypes(
            page.text
        );


    if(
        drawingTypes.includes(
            "INTERIOR_ELEVATION"
        )
    ){

        // Interior elevation is especially useful
        // when room is explicitly identified.

        if(roomResult.exact){

            score += 25;

            reasons.push(
                "Room interior elevation"
            );

        }

    }


    if(
        drawingTypes.includes(
            "CEILING_PLAN"
        )
    ){

        score += 8;

        reasons.push(
            "Ceiling plan"
        );

    }


    if(
        drawingTypes.includes(
            "ELECTRICAL_PLAN"
        )
    ){

        score += 8;

        reasons.push(
            "Electrical plan"
        );

    }


    // ========================================================
    // ROOM + EXACT SKU BONUS
    // ========================================================

    if(
        roomResult.exact &&
        sku.exactSKU &&
        text.includes(
            sku.exactSKU
        )
    ){

        score += 35;

        reasons.push(
            "Room + exact SKU"
        );

    }


    // ========================================================
    // FINAL
    // ========================================================

    return {

        page:
            page.page,

        score:
            Math.max(
                0,
                Math.min(
                    score,
                    200
                )
            ),

        room:
            roomResult,

        drawingTypes:
            drawingTypes,

        reasons:
            reasons,

        preview:
            page.text.substring(
                0,
                500
            )

    };

}


// ============================================================
// SEARCH
// ============================================================

function searchGFCForSKU(
    currentSKU
){

    if(
        !currentSKU ||
        !isGFCPageIndexReady()
    ){

        return [];

    }


    const results = [];


    getGFCPageIndex()
        .forEach(page => {

            const result =
                scoreGFCPage(
                    page,
                    currentSKU
                );


            if(
                result &&
                result.score > 0
            ){

                results.push(
                    result
                );

            }

        });


    results.sort(
        (a,b) =>
            b.score - a.score
    );


    return results;

}


// ============================================================
// BEST MATCH
// ============================================================

function findBestGFCPage(
    currentSKU
){

    const results =
        searchGFCForSKU(
            currentSKU
        );


    if(!results.length){
        return null;
    }


    // Do not automatically trust a weak match.

    const best =
        results[0];


    if(best.score < 35){

        return {

            ...best,

            candidates:
                results.slice(0,10),

            source:
                "LOW_CONFIDENCE"

        };

    }


    return {

        ...best,

        candidates:
            results.slice(0,10),

        source:
            "SEARCH"

    };

}


// ============================================================
// DEBUG
// ============================================================

window.searchGFCForSKU =
    searchGFCForSKU;

window.findBestGFCPage =
    findBestGFCPage;
