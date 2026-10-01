// ============================================================
// GFC PAGE INDEXER
// ============================================================

let gfcPageIndex = [];
let gfcIndexReady = false;


// ============================================================
// NORMALIZE TEXT
// ============================================================

function normalizeGFCText(text){

    if(!text){
        return "";
    }

    return String(text)
        .replace(/\s+/g," ")
        .replace(/[|]+/g," ")
        .trim()
        .toLowerCase();

}


// ============================================================
// NORMALIZE SEARCH TEXT
// ============================================================

function normalizeGFCTerm(text){

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
// BUILD INDEX
// ============================================================

async function buildGFCPageIndex(pdf){

    gfcPageIndex = [];
    gfcIndexReady = false;

    if(!pdf){
        return;
    }

    console.log(
        "Building GFC Page Index..."
    );

    for(
        let pageNo = 1;
        pageNo <= pdf.numPages;
        pageNo++
    ){

        try{

            const page =
                await pdf.getPage(pageNo);

            const content =
                await page.getTextContent();

            const items =
                content.items || [];

            const text =
                items
                    .map(x => x.str || "")
                    .join(" ");

            gfcPageIndex.push({

                page:
                    pageNo,

                text:
                    text,

                normalizedText:
                    normalizeGFCText(text),

                textItems:
                    items.map(x => ({

                        text:
                            x.str || "",

                        x:
                            x.transform
                                ? x.transform[4]
                                : 0,

                        y:
                            x.transform
                                ? x.transform[5]
                                : 0,

                        width:
                            x.width || 0,

                        height:
                            x.height || 0

                    }))

            });

        }

        catch(error){

            console.error(
                "GFC indexing failed on page",
                pageNo,
                error
            );

            gfcPageIndex.push({

                page:
                    pageNo,

                text:
                    "",

                normalizedText:
                    "",

                textItems:
                    []

            });

        }

    }

    gfcIndexReady = true;

    console.log(
        "GFC Page Index Ready:",
        gfcPageIndex.length
    );

}


function isGFCPageIndexReady(){

    return gfcIndexReady;

}


function getGFCPageIndex(){

    return gfcPageIndex;

}
