// ============================================================
// GFC PAGE INDEXER
// Phase 1
// Extracts searchable text from every GFC PDF page
// ============================================================

let gfcPageIndex = [];
let gfcIndexReady = false;


// ============================================================
// NORMALIZE TEXT
// ============================================================

function normalizeGFCText(text) {

    if (!text) {
        return "";
    }

    return String(text)
        .replace(/\s+/g, " ")
        .replace(/[|]+/g, " ")
        .trim()
        .toLowerCase();

}


// ============================================================
// NORMALIZE SEARCH TERM
// ============================================================

function normalizeGFCTerm(text) {

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
// TOKENIZE
// ============================================================

function tokenizeGFCText(text) {

    return normalizeGFCTerm(text)
        .split(" ")
        .filter(x => x.length >= 2);

}


// ============================================================
// BUILD INDEX
// ============================================================

async function buildGFCPageIndex(pdfDocument) {

    gfcPageIndex = [];
    gfcIndexReady = false;

    if (!pdfDocument) {
        return;
    }

    console.log(
        "Building GFC page index..."
    );

    for (
        let pageNo = 1;
        pageNo <= pdfDocument.numPages;
        pageNo++
    ) {

        try {

            const page =
                await pdfDocument.getPage(pageNo);

            const textContent =
                await page.getTextContent();

            const items =
                textContent.items || [];

            const text =
                items
                    .map(item => item.str || "")
                    .join(" ");

            const normalizedText =
                normalizeGFCText(text);

            const tokens =
                tokenizeGFCText(text);

            gfcPageIndex.push({

                page: pageNo,

                text: text,

                normalizedText: normalizedText,

                tokens: tokens,

                textItems: items.map(item => ({

                    text: item.str || "",

                    x:
                        item.transform
                            ? item.transform[4]
                            : 0,

                    y:
                        item.transform
                            ? item.transform[5]
                            : 0,

                    width:
                        item.width || 0,

                    height:
                        item.height || 0

                }))

            });

        }

        catch(error) {

            console.error(
                "Failed to index GFC page",
                pageNo,
                error
            );

            gfcPageIndex.push({

                page: pageNo,

                text: "",

                normalizedText: "",

                tokens: [],

                textItems: []

            });

        }

    }

    gfcIndexReady = true;

    console.log(
        "GFC page index ready:",
        gfcPageIndex.length,
        "pages"
    );

}


// ============================================================
// ACCESSORS
// ============================================================

function isGFCPageIndexReady() {

    return gfcIndexReady;

}


function getGFCPageIndex() {

    return gfcPageIndex;

}
