// =====================================
// DRAWING KNOWLEDGE ENGINE
// =====================================

let drawingKnowledge = {

    skuMap:{},

    roomPageMap:{}

};

// =====================================
// RESET
// =====================================

function resetDrawingKnowledge(){

    drawingKnowledge={

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

    if(!record.categories){

        return;

    }

    if(record.categories.length===0){

        return;

    }

    // Use first selected category
    const category =
        record.categories[0];

    const config =
        CHECKLIST_CONFIG[category];

    if(!config){

        return;

    }

    const level =
        config.drawingLevel;

    if(level==="FULL_HOME"){

        drawingKnowledge.skuMap[record.item]={

            page:Number(record.drawingPage),

            category

        };

    }

    else if(level==="ROOM"){

        drawingKnowledge.roomPageMap[record.room]={

            page:Number(record.drawingPage),

            category

        };

    }

    console.log(

        "Drawing Knowledge",

        drawingKnowledge

    );

}

// =====================================
// PREDICT
// =====================================

function predictDrawing(currentSKU){

    return null;

}
