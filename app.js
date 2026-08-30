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

    renderValidationQueue();

    if(validationQueue.length){

        loadQueueItem(0);

    }

}


// =====================================
// RENDER VALIDATION QUEUE
// =====================================

function renderValidationQueue(){

    const container =
        document.getElementById(
            "validationQueue"
        );

    if(!container){
        return;
    }

    container.innerHTML = "";

    const roomGroups = {};

    validationQueue.forEach(item=>{

        if(!roomGroups[item.room]){

            roomGroups[item.room]=[];

        }

        roomGroups[item.room].push(item);

    });

    Object.keys(roomGroups).forEach(room=>{

        const roomBlock =
            document.createElement("div");

        roomBlock.className="queue-room";

        roomBlock.innerHTML=`

            <div class="queue-room-title">

                ${room}

            </div>

        `;

        roomGroups[room].forEach(item=>{

            const row =
                document.createElement("div");

            row.className="queue-item";

            row.dataset.id=item.id;

            row.innerHTML=`

                <span>

                    ${item.item}

                </span>

                <span class="queue-status">

                    ${item.status}

                </span>

            `;

            row.onclick=()=>{

                loadQueueItemById(item.id);

            };

            roomBlock.appendChild(row);

        });

        container.appendChild(roomBlock);

    });

}


// =====================================
// LOAD BY ID
// =====================================

function loadQueueItemById(id){

    const index =
        validationQueue.findIndex(

            x=>x.id===id

        );

    if(index>=0){

        loadQueueItem(index);

    }

}


// =====================================
// LOAD CURRENT SKU
// =====================================

function loadQueueItem(index){

    currentQueueIndex=index;

    currentSKU=
        validationQueue[index];

    highlightQueueItem();

    renderCurrentSKU();

}


// =====================================
// HIGHLIGHT ACTIVE SKU
// =====================================

function highlightQueueItem(){

    document
    .querySelectorAll(".queue-item")
    .forEach(row=>{

        row.classList.remove("active");

        if(

            Number(row.dataset.id)===currentSKU.id

        ){

            row.classList.add("active");

        }

    });

}


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



