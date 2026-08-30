// =====================================
// GLOBAL STORE
// =====================================

let validationStore = [];


function saveCurrentSKUValidation(record){

    const existingIndex =

        validationStore.findIndex(

            x=>x.queueId===record.queueId

        );

    if(existingIndex>=0){

        validationStore[existingIndex]=record;

    }

    else{

        validationStore.push(record);

    }

}

function getValidation(queueId){

    return validationStore.find(

        x=>x.queueId===queueId

    );

}

// =====================================
// EXPORT ACCESS
// =====================================

function getValidationStore() {

    return validationStore;

}


