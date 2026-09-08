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

async function loadQueueItem(index){

    currentQueueIndex = index;

    currentSKU = validationQueue[index];

    renderCurrentSKU();
    applyPrediction();

    updateWindowTitle();

    updateQueueNavigator();

}

function openJumpModal(){

    const modal = document.getElementById("jumpModal");
const closeBtn = document.getElementById("closeJumpBtn");

closeBtn.onclick = () => {
    modal.classList.add("hidden");
};

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

    document.getElementById("currentRoom").innerText =
        currentSKU.room;

    document.getElementById("currentSKU").innerText =
        currentSKU.item;

    document.getElementById("currentDescription").innerText =
        currentSKU.description || "-";

    document.getElementById("currentQty").innerText =
        currentSKU.qty;

    document.getElementById("currentPrice").innerText =
        currentSKU.price;

    loadExistingValidation();

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

async function applyPrediction(){

    if(!currentSKU){
        return;
    }

    // Already validated?
    const saved =
        getValidation(currentSKU.id);

    // If page already exists, do nothing.
    if(saved && saved.drawingPage){
        return;
    }

    const prediction =
        predictDrawing(currentSKU);

    if(!prediction){
        return;
    }

    document.getElementById("drawingPage").value =
        prediction.page;

    document
        .getElementById("drawingPage")
        .classList
        .add("suggested");

    await goToPDFPage(prediction.page);

    showPredictionMessage(prediction);

}

function showPredictionMessage(prediction){

    const div =
        document.getElementById(
            "predictionMessage"
        );

    if(!div){
        return;
    }

    if(!prediction){

        div.innerHTML = "";

        return;

    }

    if(prediction.source==="SKU"){

        div.innerHTML =
            "💡 Suggested from previous validation of the same SKU";

    }

    else if(prediction.source==="ROOM"){

        div.innerHTML =
            "💡 Suggested from latest drawing of this room";

    }

}


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

   const saved =
    getValidation(currentSKU.id);

    clearValidationForm();

    if(!saved){
        return;
    }

    document.getElementById("drawingPage").value =
        saved.drawingPage || "";

    if(saved.drawingPage){

    goToPDFPage(saved.drawingPage);

}

    document.getElementById("gfcQty").value =
        saved.gfcQty || "";

const radio = document.querySelector(

`input[name="drawingStatus"][value="${saved.drawingStatus}"]`

);

if(radio){

    radio.checked = true;

}

toggleDrawingStatus();
    
    document.getElementById("overallRemarks").value =
        saved.overallRemarks || "";
    document.getElementById("elevationNo").value =
    saved.elevationNo || "";

document.getElementById("qtyValidation").value =
    saved.qtyValidation || "";

document.getElementById("missingElevation").value =
    saved.missingElevation || "";

document.getElementById("missingRemarks").value =
    saved.missingRemarks || "";

    
    selectedCategoryBasket =

        JSON.parse(

            JSON.stringify(

                saved.categories || []

            )

        );

    renderSelectedCategories();

    generateChecklist();
    
console.log("CHECKLIST LOADED", saved.checklist);
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

        let wrapper = null;

        // NEW METHOD
        if(item.id){

            const radios =
                document.getElementsByName(item.id);

            if(radios.length){

                radios.forEach(r=>{

                    r.checked =
                        (r.value===item.status);

                });

                wrapper =
                    radios[0].closest(".checklist-item");

            }

        }

        // OLD METHOD (fallback)
        if(!wrapper){

            document
            .querySelectorAll(".checklist-item")
            .forEach(row=>{

                const title =
                    row.querySelector(".checklist-title")
                    .innerText
                    .trim();

                if(title===item.title?.trim()){

                    row.querySelectorAll(
                        'input[type="radio"]'
                    ).forEach(r=>{

                        r.checked =
                            (r.value===item.status);

                    });

                    wrapper = row;

                }

            });

        }

        if(wrapper){

            wrapper.querySelector(".item-remark").value =
                item.remark || "";

        }

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
         description: currentSKU.description,

    boqQty: currentSKU.qty,

    price: currentSKU.price,

    category: currentSKU.category,

  drawingStatus:

document.querySelector(
'input[name="drawingStatus"]:checked'
)?.value || "",
    

    drawingPage:
        document.getElementById("drawingPage").value,
       
    elevationNo:
        document.getElementById("elevationNo").value,

    gfcQty:
        document.getElementById("gfcQty").value,
       
    

    missingRemarks:
        document.getElementById("missingRemarks").value,

qtyValidation:
    document.getElementById("qtyValidation").value,

missingElevation:
    document.getElementById("missingElevation").value,
       
    overallRemarks:
        document.getElementById("overallRemarks").value,
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
    
learnDrawing(record);
   saveCurrentSKUValidation(record);
    
console.log("FULL RECORD", record);

   if(showMessage){

    currentSKU.status = "Completed";

    updateQueueStatus();

}

    if(showMessage){

        alert("Validation Saved");

    }

}


// =====================================
// SAVE & NEXT
// =====================================

function saveAndNext(){

    // Save current SKU
    saveCurrentValidation(false);

    // Mark completed only after Save & Next
    currentSKU.status = "Completed";

    updateQueueNavigator();

    // Move to next SKU
    if(currentQueueIndex < validationQueue.length - 1){

        loadQueueItem(currentQueueIndex + 1);

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
    const elevation =
    document.getElementById("elevationNo");

if(elevation)
    elevation.value="";

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

    // Clear Drawing Status selection
    document
    .querySelectorAll(
        'input[name="drawingStatus"]'
    )
    .forEach(r => r.checked = false);

    // Clear new fields
    document.getElementById("qtyValidation").value = "";

    document.getElementById("missingElevation").value = "";

    document.getElementById("missingRemarks").value = "";

    // Update UI
    toggleDrawingStatus();

    // Clear categories
    selectedCategoryBasket = [];

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





// =====================================
// OVERRIDE SAVE AGAIN
// =====================================

const oldSave =
    saveCurrentValidation;

saveCurrentValidation=function(show=true){

    oldSave(show);

    checkCompletion();

};

function toggleDrawingStatus(){

    const status =
        document.querySelector(
            'input[name="drawingStatus"]:checked'
        )?.value;

    document
        .getElementById("foundSection")
        .classList.toggle(
            "hidden",
            status!=="FOUND"
        );

    document
        .getElementById("notFoundSection")
        .classList.toggle(
            "hidden",
            status!=="NOT_FOUND"
        );

    document
        .querySelector(".category-panel")
        .classList.toggle(
            "hidden",
            status!=="FOUND"
        );

}

document
.querySelectorAll(
    'input[name="drawingStatus"]'
)
.forEach(r=>{

    r.addEventListener(
        "change",
        toggleDrawingStatus
    );

});

toggleDrawingStatus();

function updateQtyValidation(){

    if(!currentSKU){
        return;
    }

    const boq =
        Number(currentSKU.qty);

    const gfc =
        Number(
            document.getElementById("gfcQty").value || 0
        );

    let status="OK";

    if(gfc<boq){

        status="LOW";

    }

    else if(gfc>boq){

        status="HIGH";

    }

    document
        .getElementById("qtyValidation")
        .value =

        `BOQ:${boq} | GFC:${gfc} | ${status}`;

}
document
.getElementById("gfcQty")
.addEventListener(
    "input",
    updateQtyValidation
);





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
.querySelectorAll(
    'input[name="drawingStatus"]'
)
.forEach(radio => {

    radio.addEventListener(
        "change",
        toggleDrawingStatus
    );

});

document
.getElementById("drawingPage")
.addEventListener("input",function(){

    this.classList.remove("suggested");

});

document
.getElementById("drawingPage")
.addEventListener("input",()=>{

const prediction =
    document.getElementById("predictionMessage");

if(prediction){

    prediction.innerHTML = "";

}

    document
    .getElementById("drawingPage")
    .classList
    .remove("suggested");

});
