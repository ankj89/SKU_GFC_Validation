// =====================================
// DRAWING KNOWLEDGE ENGINE
// =====================================

let drawingKnowledge = {

    skuMap: {},

    roomPageMap: {}

};

// =====================================
// RESET
// =====================================

function resetDrawingKnowledge(){

    drawingKnowledge = {

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

    // Will be implemented next

}

// =====================================
// PREDICT
// =====================================

function predictDrawing(currentSKU){

    return null;

}
