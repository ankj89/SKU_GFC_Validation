// =====================================
// REPORT GENERATOR V2
// =====================================

// =====================================
// GENERATE ALL REPORTS
// =====================================

function generateReports(){

    const container =
        document.getElementById(
            "reportContainer"
        );

    container.innerHTML="";

    generateFoundSKUReport(container);

    generateNotFoundSKUReport(container);

    generateExtraItemsReport(container);

}



// =====================================
// REPORT 1
// SKU FOUND
// =====================================

function generateFoundSKUReport(container){

    const records =

        validationStore.filter(r=>

            r.drawingStatus==="FOUND"

        );

    const section =
        document.createElement("div");

    section.innerHTML=

        `<h2>SKU Found Report</h2>`;

    const table =
        document.createElement("table");

    table.className="report-table";

    table.innerHTML=`

<tr>

<th>Room</th>

<th>SKU</th>

<th>Drawing Page</th>

<th>Elevation No</th>

<th>Qty Validation</th>

<th>Category Validation</th>

<th>Overall Remarks</th>

</tr>

`;

    records.forEach(record=>{

        table.innerHTML+=`

<tr>

<td>

${record.room}

</td>

<td>

${record.item}

</td>

<td style="text-align:center">

${record.drawingPage||""}

</td>

<td>

${record.elevationNo||""}

</td>

<td>

${record.qtyValidation || "Pending"}

</td>

<td>

${buildCategoryValidationExcel(record)}

</td>

<td>

${record.overallRemarks||""}

</td>

</tr>

`;

    });

    section.appendChild(table);

    container.appendChild(section);

}



// =====================================
// REPORT 2
// DRAWING NOT FOUND
// =====================================

function generateNotFoundSKUReport(container){

    const records =

        validationStore.filter(r=>

            r.drawingStatus==="NOT_FOUND"

        );

    const section =
        document.createElement("div");

    section.innerHTML=

        `<h2>SKU Not Found Report</h2>`;

    if(records.length===0){

        section.innerHTML+=

            `<p>No Missing Drawings</p>`;

        container.appendChild(section);

        return;

    }

    const table =
        document.createElement("table");

    table.className="report-table";

    table.innerHTML=`

<tr>

<th>Room</th>

<th>SKU</th>

<th>Qty</th>

<th>Elevation Number</th>

<th>Action Required</th>

</tr>

`;

    records.forEach(record=>{

        table.innerHTML+=`

<tr>

<td>

${record.room}

</td>

<td>

${record.item}

</td>

<td style="text-align:center">

${record.boqQty}

</td>

<td>

${record.missingElevation||""}

</td>

<td>

${record.missingRemarks||""}

</td>

</tr>

`;

    });

    section.appendChild(table);

    container.appendChild(section);

}



// =====================================
// REPORT 3
// EXTRA ITEMS
// =====================================

function generateExtraItemsReport(container){

    const section =
        document.createElement("div");

    section.innerHTML=

        `<h2>Extra Items Report</h2>`;

    const table =
        document.createElement("table");

    table.className="report-table";

    table.innerHTML=`

<tr>

<th>Drawing Page</th>

<th>Room</th>

<th>Description</th>

<th>Action Required</th>

</tr>

`;

    /*
        Future

        extraItemStore.forEach(...)
    */

    section.appendChild(table);

    container.appendChild(section);

}



// =====================================
// CATEGORY VALIDATION
// =====================================

// =====================================
// CATEGORY VALIDATION
// =====================================

function formatChecklistFailure(title){

    const cleanTitle = title.trim();

    const lower = cleanTitle.toLowerCase();

    const exactMap = {

        "post demolition finishing mentioned":
            "Post demolition finishing is NOT mentioned.",

        "wall thickness mentioned":
            "Wall thickness is NOT mentioned.",

        "wall height mentioned":
            "Wall height is NOT mentioned.",

        "wall finish mentioned":
            "Wall finish is NOT mentioned.",

        "new wall locations shown in plan":
            "New wall locations are NOT shown in the plan.",

        "existing wall locations shown in plan":
            "Existing wall locations are NOT shown in the plan.",

        "electrical point locations shown":
            "Electrical point locations are NOT shown.",

        "door opening shown":
            "Door opening is NOT shown.",

        "window opening shown":
            "Window opening is NOT shown.",

        "skirting area clearly demarcated in plan":
            "Skirting area is NOT clearly demarcated in the plan."

    };

    if(exactMap[lower]){
        return exactMap[lower];
    }

    if(lower.endsWith(" mentioned")){

        return cleanTitle.replace(/mentioned$/i,"is NOT mentioned.");

    }

    if(lower.endsWith(" shown")){

        return cleanTitle.replace(/shown$/i,"is NOT shown.");

    }

    if(lower.endsWith(" available")){

        return cleanTitle.replace(/available$/i,"is NOT available.");

    }

    if(lower.endsWith(" provided")){

        return cleanTitle.replace(/provided$/i,"is NOT provided.");

    }

    if(lower.endsWith(" specified")){

        return cleanTitle.replace(/specified$/i,"is NOT specified.");

    }

    if(lower.endsWith(" demarcated")){

        return cleanTitle.replace(/demarcated$/i,"is NOT demarcated.");

    }

    return cleanTitle + " - NOT COMPLIANT.";

}




function buildCategoryValidationExcel(record){

    const lines=[];

(record.checklist || []).forEach(item=>{

    if(item.status!=="Absent"){
        return;
    }

    let text =
        "• " +
        formatChecklistFailure(item.title);

    if(item.remark && item.remark.trim()){

        text +=
            "<br>&nbsp;&nbsp;&nbsp;&nbsp;<b>Remarks:</b> "
            + item.remark;

    }

    lines.push(text);

});

if(lines.length===0){

    return "OK";

}

return lines.join("<br><br>");

}



// =====================================
// QTY VALIDATION
// =====================================

function buildQtyValidation(record){

    const boq=

        Number(record.boqQty||0);

    const gfc=

        Number(record.gfcQty||0);

    let status="OK";

    if(gfc>boq){

        status="HIGH";

    }

    else if(gfc<boq){

        status="LOW";

    }

    return

        `BOQ = ${boq}

        <br>

        GFC = ${gfc}

        <br>

        <b>${status}</b>`;

}



// =====================================
// EVENT
// =====================================

document
.getElementById(
    "generateReportBtn"
)
?.addEventListener(

    "click",

    generateReports

);
