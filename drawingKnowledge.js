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

    return item
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

    return String(room)
        .replace(/\s+/g," ")
        .trim()
        .toLowerCase();

}


// =====================================
// ROOM + SKU KEY
// =====================================

function getRoomSKULearningKey(
    room,
    item
){

    const roomKey =
        getRoomLearningKey(room);

    const skuKey =
        getLearningKey(item);

    return (
        roomKey +
        "||" +
        skuKey
    );

}


// =====================================
// KNOWLEDGE STORE
// =====================================

let drawingKnowledge = {

    // NEW PRIMARY LEARNING
    roomSkuMap:{},

    // OLD LEARNING RETAINED
    skuMap:{},

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

    console.log(
        "Drawing Knowledge Reset"
    );

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

    if(
        !record.drawingPage
    ){
        return;
    }


    const page =
        Number(record.drawingPage);

    if(
        !page ||
        page < 1
    ){
        return;
    }


    // =====================================================
    // PRIMARY LEARNING
    // ROOM + SKU
    // =====================================================

    const roomSkuKey =
        getRoomSKULearningKey(
            record.room,
            record.item
        );

    if(roomSkuKey){

        drawingKnowledge
            .roomSkuMap[roomSkuKey] = {

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


    // =====================================================
    // EXISTING FULL-HOME LEARNING
    // =====================================================

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


            if(
                level === "FULL_HOME"
            ){

                const key =
                    getLearningKey(
                        record.item
                    );

                drawingKnowledge
                    .skuMap[key] = {

                        page:
                            page,

                        category:
                            category,

                        updatedOn:
                            new Date().toISOString()

                    };

            }


            // =================================================
            // EXISTING ROOM LEARNING
            // =================================================

            else if(
                level === "ROOM"
            ){

                const roomKey =
                    getRoomLearningKey(
                        record.room
                    );

                drawingKnowledge
                    .roomPageMap[
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

function predictDrawing(
    currentSKU
){

    if(!currentSKU){
        return null;
    }


    // =====================================================
    // STEP 1
    // EXACT ROOM + SKU
    // =====================================================

    const roomSkuKey =
        getRoomSKULearningKey(
            currentSKU.room,
            currentSKU.item
        );

    const roomSkuInfo =
        drawingKnowledge
            .roomSkuMap[
                roomSkuKey
            ];


    if(roomSkuInfo){

        return {

            page:
                roomSkuInfo.page,

            category:
                roomSkuInfo.category,

            source:
                "ROOM_SKU"

        };

    }


    // =====================================================
    // STEP 2
    // OLD SKU LEARNING
    // =====================================================

    const key =
        getLearningKey(
            currentSKU.item
        );

    const skuInfo =
        drawingKnowledge
            .skuMap[key];


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


    // =====================================================
    // STEP 3
    // OLD ROOM LEARNING
    // =====================================================

    const roomKey =
        getRoomLearningKey(
            currentSKU.room
        );

    const roomInfo =
        drawingKnowledge
            .roomPageMap[
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
