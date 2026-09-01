// =====================================
// GLOBAL
// =====================================

let projectMaster = null;

// =====================================
// SAVE PROJECT MASTER
// =====================================

function saveProjectMaster() {

const rows =
    document.querySelectorAll(
        "#boqReviewBody tr"
    );

if (
    rows.length === 0
) {

    alert(
        "No review rows found"
    );

    return;

}

const rooms = {};

const errors = [];

let masterRFV = "";
let masterOrder = "";
let masterPID = "";

rows.forEach(row => {

    const rfvId =
        row.querySelector(
            ".rfv-input"
        )?.value.trim() || "";

    const orderId =
        row.querySelector(
            ".order-input"
        )?.value.trim() || "";

    const pid =
        row.querySelector(
            ".pid-input"
        )?.value.trim() || "";

    const room =
        row.querySelector(
            ".room-input"
        )?.value.trim() || "";

    const qty =
        Number(
            row.querySelector(
                ".qty-input"
            )?.value || 0
        );
    const price =
    Number(
        row.querySelector(
            ".price-input"
        )?.value || 0
    );

    const item =
        row.querySelector(
            ".item-input"
        )?.value.trim() || "";

    const category =
        row.querySelector(
            ".category-input"
        )?.value.trim() || "";

    const description =
    row.dataset.description || "";

    if (
        !masterRFV &&
        rfvId
    ) {

        masterRFV = rfvId;

    }

    if (
        !masterOrder &&
        orderId
    ) {

        masterOrder = orderId;

    }

    if (
        !masterPID &&
        pid
    ) {

        masterPID = pid;

    }

    if (!room) {

        errors.push(
            `${item || "Unknown SKU"} : Room Missing`
        );

    }

    if (!item) {

        errors.push(
            "SKU Missing"
        );

    }

    if (!qty) {

        errors.push(
            `${item || "Unknown SKU"} : Qty Missing`
        );

    }

    if (
        !room ||
        !item ||
        !qty
    ) {

        return;

    }

    if (
        !rooms[room]
    ) {

        rooms[room] = [];

    }

   rooms[room].push({

    room,

    item,
 description,
    qty,
    price,
    category,

    display:
        `${qty}|${room}|${item}`

});

});

if (
    errors.length > 0
) {

    alert(

        "Cannot Save Project Master\n\n" +

        errors.join("\n")

    );

    return;

}

const fullHomeItems = [];

Object.values(
    rooms
).forEach(items => {

    items.forEach(item => {

        fullHomeItems.push(
            item
        );

    });

});

rooms[
    "FULL HOME"
] =
    fullHomeItems;

    const validationQueue = [];

Object.keys(rooms).forEach(room => {

    if (room === "FULL HOME") return;

    rooms[room].forEach(item => {

    validationQueue.push({

    id: validationQueue.length + 1,

    room: item.room,

    item: item.item,
  description: item.description,
    qty: item.qty,

    price: item.price,

    category: item.category,

    drawingPage: null,

    gfcQty: null,

    drawingFound: true,

    categories: [],

    checklist: [],

    remarks: "",

    validatedBy: "",

    validatedOn: "",

    status: "Pending"

});

    });

});

projectMaster = {

    sourceType:
        window.sourceType || "",

    gfcId:
        document
        .getElementById(
            "gfcIdInput"
        )
        ?.value || "",

    rfvId:
        masterRFV,

    orderId:
        masterOrder,

    pid:
        masterPID,

    rooms,

validationQueue
    
};

console.log(
    projectMaster
);

document
.getElementById(
    "validationSection"
)
.classList
.remove(
    "hidden"
);

alert(
    "Project Master Saved"
);


}


function getProjectInfo() {

    return {

        gfcId:
            projectMaster?.gfcId || "",

        rfvId:
            projectMaster?.rfvId || "",

        orderId:
            projectMaster?.orderId || "",

        pid:
            projectMaster?.pid || "",

        sourceType:
            projectMaster?.sourceType || ""

    };

}

// =====================================
// EVENTS
// =====================================

document
.getElementById(
    "saveProjectMasterBtn"
)
.addEventListener(
    "click",
    saveProjectMaster
);

