// =====================================
// GLOBAL STORE
// =====================================

let validationStore = [];

let currentQueueIndex = 0;

let currentValidation = null;
// =====================================
// SAVE PAGE VALIDATION
// =====================================

function saveCurrentPageValidation(
    showPopup = false
) {

    const room =

        document
        .getElementById(
            "roomDropdown"
        )
        ?.value || "";

    const selectedItems =

        getSelectedItems();

   const categories =

    [...selectedCategoryBasket];

    const drawingNotAvailable =

        document
        .getElementById(
            "drawingNotAvailable"
        )
        ?.checked || false;

    const drawingMissingReason =

        document
        .getElementById(
            "drawingMissingReason"
        )
        ?.value || "";

    const overallRemarks =

        document
        .getElementById(
            "overallRemarks"
        )
        ?.value || "";

    const checklist =

        collectChecklist();

    const extraDrawingItems =

        collectExtraItems();

    const projectInfo =

        getProjectInfo();

    const pageNo =
getCurrentPDFPage();

    const existingIndex =

        validationStore.findIndex(

            row =>

                row.pageNo ===
                pageNo

        );

   const record = {

    pageNo,

    room,

    items:
        JSON.parse(
            JSON.stringify(
                selectedItems
            )
        ),
qtyValidation:
    JSON.parse(
        JSON.stringify(
            qtyValidationData
        )
    ),

       
    categories:
    JSON.parse(
        JSON.stringify(
            selectedCategoryBasket
        )
    ),

    checklist:
        JSON.parse(
            JSON.stringify(
                checklist
            )
        ),

    extraDrawingItems:
        JSON.parse(
            JSON.stringify(
                extraDrawingItems
            )
        ),

    projectInfo:
        JSON.parse(
            JSON.stringify(
                projectInfo
            )
        ),

    drawingNotAvailable,

    drawingMissingReason,

    overallRemarks,

    savedOn:
        new Date()
        .toISOString()

};

    console.log(
    "SAVING PAGE",
    pageNo
);

console.log(
    "SAVED ITEMS",
    selectedSkuBasket
);
    if (
        existingIndex >= 0
    ) {

        validationStore[
            existingIndex
        ] = record;

    }
    else {

        validationStore.push(
            record
        );

    }

    console.log(
        "Validation Saved",
        record
    );
if (showPopup) {

    alert(
        `Page ${pageNo} saved`
    );

}

}



   



// =====================================
// CHECKLIST COLLECTION
// =====================================

function collectChecklist() {

    const results = [];

    document
    .querySelectorAll(
        ".checklist-item"
    )
    .forEach(row => {

        const title =

            row.querySelector(
                ".checklist-title"
            )
            ?.innerText || "";

        const selected =

            row.querySelector(
                'input[type="radio"]:checked'
            );

        const status =

            selected
            ? selected.value
            : "";

        const remark =

            row.querySelector(
                ".item-remark"
            )
            ?.value || "";

        results.push({

            title,

            status,

            remark

        });

    });

    return results;

}

function saveCurrentSKUValidation(showPopup=false){

    const queueItem =
        projectMaster.validationQueue[currentQueueIndex];

    const record={

        queueId:
            queueItem.id,

        room:
            queueItem.room,

        item:
            queueItem.item,

        boqQty:
            queueItem.qty,

        price:
            queueItem.price,

        category:
            queueItem.category,

        drawingFound:
            document.getElementById("drawingFound")?.checked ?? true,

        drawingPage:
            Number(
                document.getElementById("drawingPage")?.value || 0
            ),

        gfcQty:
            Number(
                document.getElementById("gfcQty")?.value || 0
            ),

        categories:
            [...selectedCategoryBasket],

        checklist:
            collectChecklist(),

        remarks:
            document.getElementById("overallRemarks").value,

        extraDrawingItems:
            collectExtraItems(),

        status:"Completed",

        savedOn:
            new Date().toISOString()

    };

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

    projectMaster.validationQueue[currentQueueIndex].status="Completed";

    if(showPopup){

        alert("Validation Saved");

    }

}

function getCurrentQueueItem(){

    return projectMaster.validationQueue[currentQueueIndex];

}

function loadQueueItem(index){

    currentQueueIndex=index;

    currentValidation=getCurrentQueueItem();

}

function saveAndNext(){

    saveCurrentSKUValidation();

    if(

        currentQueueIndex<

        projectMaster.validationQueue.length-1

    ){

        loadQueueItem(

            currentQueueIndex+1

        );

    }

}








// =====================================
// EXPORT ACCESS
// =====================================

function getValidationStore() {

    return validationStore;

}


