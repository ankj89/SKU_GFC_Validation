// =====================================
// DRAWING KNOWLEDGE ENGINE
// =====================================

// =====================================
// NORMALIZE SKU
// =====================================

function getLearningKey(item){

    if(!item){
        return "";
    }

    return String(item)
        .replace(/\[.*?\]/g,"")
        .replace(/\s+/g," ")
        .trim()
        .toLowerCase();

}


// =====================================
// NORMALIZE ROOM
// =====================================

function getRoomLearningKey(room){

    if(!room){
        return "";
    }

    let value = String(room)
        .trim()
        .toLowerCase()
        .replace(/\s+/g," ")
        .replace(/[_]+/g," ")
        .replace(/-/g," ");

    // Bedroom-02 / Bedroom 02 / Bedroom-2
    // all become bedroom 2

    value = value.replace(
        /\bbedroom\s*0*(\d+)\b/g,
        "bedroom $1"
    );

    value = value.replace(
        /\bbed\s*0*(\d+)\b/g,
        "bedroom $1"
    );

    return value
        .replace(/\s+/g," ")
        .trim();

}


// =====================================
// ROOM + SKU KEY
// =====================================

function getRoomSKULearningKey(room,item){

    return (
        getRoomLearningKey(room) +
        "||" +
        getLearningKey(item)
    );

}


// =====================================
// KNOWLEDGE STORE
// =====================================

let drawingKnowledge = {

    // PRIMARY
    roomSkuMap:{},

    // FALLBACK
    skuMap:{},

    // FALLBACK
    roomPageMap:{}

};


// =====================================
// RESET
// =====================================

function resetDrawingKnowledge(){

    drawingKnowledge = {

        roomSkuMap:{},

        skuMap:{},

        roomPageMap:{}

    };

}


// =====================================
// GET
// =====================================

function getDrawingKnowledge(){

    return drawingKnowledge;

}


// =====================================
// LEARN
// =====================================

function learnDrawing(record){

    if(!record){
        return;
    }

    if(!record.drawingPage){
        return;
    }

    const page =
        Number(record.drawingPage);

    if(!page || page < 1){
        return;
    }


    // =====================================
    // PRIMARY LEARNING
    // ROOM + SKU
    // =====================================

    const roomSkuKey =
        getRoomSKULearningKey(
            record.room,
            record.item
        );

    if(roomSkuKey){

        drawingKnowledge.roomSkuMap[
            roomSkuKey
        ] = {

            room:
                record.room,

            item:
                record.item,

            page:
                page,

            category:
                record.categories &&
                record.categories.length
                    ? record.categories[0]
                    : "",

            updatedOn:
                new Date().toISOString()

        };

    }


    // =====================================
    // EXISTING CATEGORY LEARNING
    // =====================================

    if(
        record.categories &&
        record.categories.length
    ){

        const category =
            record.categories[0];

        const config =
            CHECKLIST_CONFIG[category];

        if(config){

            const level =
                config.drawingLevel;


            // FULL HOME
            if(level === "FULL_HOME"){

                const key =
                    getLearningKey(
                        record.item
                    );

                drawingKnowledge.skuMap[key] = {

                    page:
                        page,

                    category:
                        category,

                    updatedOn:
                        new Date().toISOString()

                };

            }


            // ROOM
            else if(level === "ROOM"){

                const roomKey =
                    getRoomLearningKey(
                        record.room
                    );

                drawingKnowledge.roomPageMap[
                    roomKey
                ] = {

                    page:
                        page,

                    category:
                        category

                };

            }

        }

    }

    console.log(
        "Drawing Knowledge Updated",
        drawingKnowledge
    );

}


// =====================================
// PREDICT
// =====================================

function predictDrawing(currentSKU){

    if(!currentSKU){
        return null;
    }


    // =====================================
    // 1. EXACT ROOM + SKU
    // =====================================

    const roomSkuKey =
        getRoomSKULearningKey(
            currentSKU.room,
            currentSKU.item
        );

    const learned =
        drawingKnowledge.roomSkuMap[
            roomSkuKey
        ];

    if(learned){

        return {

            page:
                learned.page,

            category:
                learned.category,

            source:
                "ROOM_SKU"

        };

    }


    // =====================================
    // 2. SKU FALLBACK
    // =====================================

    const skuKey =
        getLearningKey(
            currentSKU.item
        );

    const skuInfo =
        drawingKnowledge.skuMap[
            skuKey
        ];

    if(skuInfo){

        return {

            page:
                skuInfo.page,

            category:
                skuInfo.category,

            source:
                "SKU"

        };

    }


    // =====================================
    // 3. ROOM FALLBACK
    // =====================================

    const roomKey =
        getRoomLearningKey(
            currentSKU.room
        );

    const roomInfo =
        drawingKnowledge.roomPageMap[
            roomKey
        ];

    if(roomInfo){

        return {

            page:
                roomInfo.page,

            category:
                null,

            source:
                "ROOM"

        };

    }


    return null;

}
