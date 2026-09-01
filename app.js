// =====================================
// SKU GFC VALIDATION TOOL V1
// APP.JS - PART 1
// =====================================

// =====================================
// GLOBALS
// =====================================

let validationQueue = [];

let currentQueueIndex = -1;

let currentSKU = null;

let selectedCategoryBasket = [];


// =====================================
// INITIALIZE
// =====================================

document.addEventListener(
    "DOMContentLoaded",
    initializeApp
);

function initializeApp(){

    bindEvents();

}


// =====================================
// AFTER PROJECT MASTER IS SAVED
// =====================================

function initializeValidationQueue(){

    if(
        !projectMaster ||
        !projectMaster.validationQueue
    ){
        return;
    }

    validationQueue =
        projectMaster.validationQueue;


    if(validationQueue.length){

        loadQueueItem(0);

    }

}

function getCurrentQueueItem(){

    return projectMaster.validationQueue[currentQueueIndex];

}
// =====================================
// RENDER VALIDATION QUEUE
// =====================================




// =====================================
// LOAD BY ID
// =====================================


function updateQueueNavigator(){

    const item = getCurrentQueueItem();

    if(!item){
        return;
    }

    document.getElementById("navRoom").textContent =
        item.room;

    document.getElementById("navSku").textContent =
        item.item;

    document.getElementById("navProgress").textContent =
        `${currentQueueIndex + 1} / ${projectMaster.validationQueue.length} • ${item.status}`;

}





// =====================================
// LOAD CURRENT SKU
// =====================================

function loadQueueItem(index){

    currentQueueIndex = index;

    currentSKU = validationQueue[index];

    renderCurrentSKU();

    updateWindowTitle();

    updateQueueNavigator();

}

function openJumpModal(){

    const list =
        document.getElementById("jumpList");

    list.innerHTML="";

    projectMaster.validationQueue.forEach((item,index)=>{

        const row =
            document.createElement("div");

        row.className="jump-row";

        row.innerHTML=`

            <b>${item.room}</b><br>

            ${item.item}

            <div style="float:right">

                ${item.status}

            </div>

        `;

        row.onclick=()=>{

          
             saveCurrentValidation(false);

            loadQueueItem(index);

            document
                .getElementById("jumpModal")
                .classList.add("hidden");

        };

        list.appendChild(row);

    });

    document
        .getElementById("jumpModal")
        .classList.remove("hidden");

}

// =====================================
// HIGHLIGHT ACTIVE SKU
// =====================================




// =====================================
// CURRENT SKU PANEL
// =====================================

function renderCurrentSKU(){

    if(!currentSKU){
        return;
    }

    document.getElementById(
        "currentRoom"
    ).innerText =
        currentSKU.room;

    document.getElementById(
        "currentSKU"
    ).innerText =
        currentSKU.item;
    
    document.getElementById("currentDescription").innerText =
        currentSKU.description || "-";

    document.getElementById(
        "currentQty"
    ).innerText =
        currentSKU.qty;

    document.getElementById(
        "currentPrice"
    ).innerText =
        currentSKU.price;

    document.getElementById(
        "drawingPage"
    ).value="";

    document.getElementById(
        "gfcQty"
    ).value="";

    document.getElementById(
        "drawingFound"
    ).checked=true;

    selectedCategoryBasket=[];

    renderSelectedCategories();

    generateChecklist();

}


// =====================================
// EVENT BINDINGS
// =====================================

function bindEvents(){

    document
    .getElementById(
        "saveProjectMasterBtn"
    )
    ?.addEventListener(

        "click",

        ()=>{

            setTimeout(

                initializeValidationQueue,

                200

            );

        }

    );

}
// =====================================
// APP.JS - PART 2
// CATEGORY + CHECKLIST + SAVE/RESTORE
// =====================================


// =====================================
// CATEGORY DROPDOWN
// =====================================

function populateCategoryDropdown(){

    const dropdown =
        document.getElementById(
            "categoryDropdown"
        );

    if(!dropdown){
        return;
    }

    dropdown.innerHTML="";

    Object.keys(CHECKLIST_CONFIG)
    .forEach(category=>{

        const option =
            document.createElement("option");

        option.value=category;

        option.textContent=
            formatCategoryName(category);

        dropdown.appendChild(option);

    });

}


// =====================================
// CATEGORY SELECTED
// =====================================

document
.getElementById("categoryDropdown")
?.addEventListener(

    "change",

    function(){

        const value=this.value;

        if(!value){
            return;
        }

        if(
            !selectedCategoryBasket.includes(value)
        ){

            selectedCategoryBasket.push(value);

        }

        this.selectedIndex=-1;

        renderSelectedCategories();

        generateChecklist();

    }

);


// =====================================
// CATEGORY SEARCH
// =====================================

document
.getElementById("categorySearch")
?.addEventListener(

    "input",

    function(){

        const text =
            this.value.toLowerCase();

        const dropdown =
            document.getElementById(
                "categoryDropdown"
            );

        Array.from(dropdown.options)
        .forEach(option=>{

            option.hidden =

                !option.textContent
                .toLowerCase()
                .includes(text);

        });

    }

);


// =====================================
// RENDER CATEGORY CHIPS
// =====================================

function renderSelectedCategories(){

    const container =
        document.getElementById(
            "selectedCategoryContainer"
        );

    if(!container){
        return;
    }

    container.innerHTML="";

    selectedCategoryBasket
    .forEach(category=>{

        const chip =
            document.createElement("span");

        chip.className="selected-chip";

        chip.innerHTML=`

            ${formatCategoryName(category)}

            <button
                data-category="${category}"
                type="button">

                ×

            </button>

        `;

        container.appendChild(chip);

    });

    container
    .querySelectorAll("button")
    .forEach(btn=>{

        btn.onclick=()=>{

            selectedCategoryBasket=

                selectedCategoryBasket.filter(

                    x=>x!==btn.dataset.category

                );

            renderSelectedCategories();

            generateChecklist();

        };

    });

}


// =====================================
// LOAD EXISTING VALIDATION
// =====================================

function loadExistingValidation(){

    if(!currentSKU){
        return;
    }

    const saved = validationStore.find(

        x => x.queueId === currentSKU.id

    );

    clearValidationForm();

    if(!saved){
        return;
    }

    document.getElementById("drawingPage").value =
        saved.drawingPage || "";

    document.getElementById("gfcQty").value =
        saved.gfcQty || "";

    document.getElementById("drawingFound").checked =
        saved.drawingFound ?? true;

    document.getElementById("overallRemarks").value =
        saved.overallRemarks || "";
    document.getElementById("elevationNo").value =
    record.elevationNo || "";

document.getElementById("addElevation").value =
    record.addElevation || "";

document.getElementById("missingRemarks").value =
    record.missingRemarks || "";

document.getElementById("drawingFound").checked =
    record.drawingFound ?? true;

toggleDrawingFound();

    selectedCategoryBasket =

        JSON.parse(

            JSON.stringify(

                saved.categories || []

            )

        );

    renderSelectedCategories();

    generateChecklist();

    restoreChecklist(saved);

  

}


// =====================================
// RESTORE CHECKLIST
// =====================================

function restoreChecklist(saved){

    if(!saved.checklist){
        return;
    }

    saved.checklist.forEach(item=>{

        const rows =
            document.querySelectorAll(
                ".checklist-item"
            );

        rows.forEach(row=>{

            const title=

                row.querySelector(
                    ".checklist-title"
                ).innerText;

            if(title!==item.title){
                return;
            }

            row
            .querySelectorAll(
                'input[type="radio"]'
            )
            .forEach(r=>{

                r.checked=

                    r.value===item.status;

            });

            row
            .querySelector(
                ".item-remark"
            )
            .value=

                item.remark;

        });

    });

}


// =====================================
// UPDATE CURRENT SKU PANEL
// =====================================

const oldRenderCurrentSKU =
    renderCurrentSKU;

renderCurrentSKU=function(){

    oldRenderCurrentSKU();

    loadExistingValidation();

}


// =====================================
// INITIAL POPULATION
// =====================================

populateCategoryDropdown();

// =====================================
// APP.JS - PART 3
// SAVE + NEXT + QUEUE STATUS
// =====================================


// =====================================
// SAVE CURRENT SKU
// =====================================

function saveCurrentValidation(showMessage = true){

    if(!currentSKU){
        return;
    }

   const record = {

    queueId: currentSKU.id,

    room: currentSKU.room,

    item: currentSKU.item,

    boqQty: currentSKU.qty,

    price: currentSKU.price,

    category: currentSKU.category,

    drawingFound:
        document.getElementById("drawingFound").checked,

    drawingPage:
        document.getElementById("drawingPage").value,

    gfcQty:
        document.getElementById("gfcQty").value,

    overallRemarks:
        document.getElementById("overallRemarks").value,

       elevationNo:
    document.getElementById("elevationNo").value,

addElevation:
    document.getElementById("addElevation").value,

missingRemarks:
    document.getElementById("missingRemarks").value,

drawingFound:
    document.getElementById("drawingFound").checked,

    categories:
        JSON.parse(
            JSON.stringify(
                selectedCategoryBasket
            )
        ),

    checklist:
        JSON.parse(
            JSON.stringify(
                collectChecklist()
            )
        ),

   

    savedOn:
        new Date().toISOString()

};

    const existingIndex=

        validationStore.findIndex(

            x=>x.queueId===record.queueId

        );

    if(existingIndex>=0){

        validationStore[
            existingIndex
        ]=record;

    }

    else{

        validationStore.push(record);

    }

    currentSKU.status="Completed";

    updateQueueStatus();

    if(showMessage){

        alert("Validation Saved");

    }

}


// =====================================
// SAVE & NEXT
// =====================================

function saveAndNext(){

    saveCurrentValidation(false);

    if(

        currentQueueIndex <

        validationQueue.length-1

    ){

        loadQueueItem(

            currentQueueIndex+1

        );

    }

    else{

        alert(

            "All SKUs validated."

        );

    }

}


// =====================================
// UPDATE QUEUE STATUS
// =====================================

function updateQueueStatus(){

    document
    .querySelectorAll(
        ".queue-item"
    )
    .forEach(row=>{

        const id=
            Number(row.dataset.id);

        const sku=

            validationQueue.find(

                x=>x.id===id

            );

        if(!sku){
            return;
        }

        const status=

            row.querySelector(
                ".queue-status"
            );

        status.innerText=
            sku.status;

    });

}


// =====================================
// PREVIOUS SKU
// =====================================

function previousSKU(){

    if(

        currentQueueIndex<=0

    ){

        return;

    }

    loadQueueItem(

        currentQueueIndex-1

    );

}


// =====================================
// NEXT SKU
// =====================================

function nextSKU(){

    if(

        currentQueueIndex>=

        validationQueue.length-1

    ){

        return;

    }

    loadQueueItem(

        currentQueueIndex+1

    );

}


// =====================================
// QUEUE SUMMARY
// =====================================

function getQueueProgress(){

    const completed=

        validationQueue.filter(

            x=>x.status==="Completed"

        ).length;

    return{

        completed,

        total:

            validationQueue.length

    };

}


// =====================================
// OPTIONAL TITLE UPDATE
// =====================================

function updateWindowTitle(){

    const progress=

        getQueueProgress();

    document.title=

        `(${progress.completed}/${progress.total}) SKU Validation`;

}
document
.getElementById(
    "saveValidationBtn"
)
?.addEventListener(

    "click",

    saveAndNext

);

// =====================================
// APP.JS - PART 4
// HELPERS + PROGRESS + RESET
// =====================================


// =====================================
// CLEAR CURRENT VALIDATION
// =====================================

function clearValidationForm(){

    const drawingPage =
        document.getElementById("drawingPage");

    if(drawingPage)
        drawingPage.value="";

    const gfcQty =
        document.getElementById("gfcQty");

    if(gfcQty)
        gfcQty.value="";

    const remarks =
        document.getElementById("overallRemarks");

    if(remarks)
        remarks.value="";

    const drawingFound =
        document.getElementById("drawingFound");

    if(drawingFound)
        drawingFound.checked=true;

    selectedCategoryBasket=[];

    renderSelectedCategories();

    generateChecklist();

    

}


// =====================================
// GO TO FIRST PENDING SKU
// =====================================

function goToFirstPending(){

    const index =

        validationQueue.findIndex(

            sku=>sku.status!=="Completed"

        );

    if(index>=0){

        loadQueueItem(index);

    }

}


// =====================================
// VALIDATION SUMMARY
// =====================================

function refreshProgress(){

    const completed =

        validationQueue.filter(

            x=>x.status==="Completed"

        ).length;

    const total =
        validationQueue.length;

    console.log(

        `Progress : ${completed}/${total}`

    );

    updateWindowTitle();

}


// =====================================
// OVERRIDE SAVE
// =====================================

const originalSaveAndNext =
    saveAndNext;

saveAndNext=function(){

    originalSaveAndNext();

    refreshProgress();

};


// =====================================
// AUTO SCROLL ACTIVE ITEM
// =====================================



    const active =

        document.querySelector(
            ".queue-item.active"
        );

    if(active){

        active.scrollIntoView({

            behavior:"smooth",

            block:"nearest"

        });

    

};


// =====================================
// PROJECT START
// =====================================

const oldInitializeValidationQueue =
    initializeValidationQueue;

initializeValidationQueue=function(){

    oldInitializeValidationQueue();

    refreshProgress();

};


// =====================================
// VALIDATION COMPLETE
// =====================================

function isValidationComplete(){

    return validationQueue.every(

        sku=>sku.status==="Completed"

    );

}


// =====================================
// FINISH MESSAGE
// =====================================

function checkCompletion(){

    if(

        isValidationComplete()

    ){

        alert(

            "Project Validation Completed."

        );

    }

}

function toggleDrawingFound(){

    const found =
        document.getElementById("drawingFound").checked;

    document
        .getElementById("drawingMissingPanel")
        .classList.toggle(
            "hidden",
            found
        );

}



// =====================================
// OVERRIDE SAVE AGAIN
// =====================================

const oldSave =
    saveCurrentValidation;

saveCurrentValidation=function(show=true){

    oldSave(show);

    checkCompletion();

};

document
.getElementById("prevSkuBtn")
.addEventListener("click",()=>{

    saveCurrentValidation(false);

    if(currentQueueIndex>0){

        loadQueueItem(currentQueueIndex-1);

    }

});

document
.getElementById("nextSkuBtn")
.addEventListener("click",()=>{

    saveCurrentValidation(false);

    if(

        currentQueueIndex <
        validationQueue.length-1

    ){

        loadQueueItem(currentQueueIndex+1);

    }

});

document
.getElementById("skuNavigator")
.onclick=openJumpModal;

document
.getElementById("closeJumpBtn")
.onclick=()=>{

    document
    .getElementById("jumpModal")
    .classList.add("hidden");

};

document
.getElementById("jumpSearch")
.addEventListener("input",function(){

    const text=this.value.toLowerCase();

    document
    .querySelectorAll(".jump-row")
    .forEach(row=>{

        row.style.display=

            row.innerText
                .toLowerCase()
                .includes(text)

                ?"block"

                :"none";

    });

});
document
.getElementById("drawingFound")
.addEventListener(
    "change",
    toggleDrawingFound
);
