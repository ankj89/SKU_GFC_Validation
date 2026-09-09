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

${buildCategoryValidation(record)}

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

function buildCategoryValidationExcel(record){

    const lines=[];

    (record.checklist || []).forEach(item=>{

        if(item.status !== "Absent"){
            return;
        }

        let title = item.title;

        // Insert "NOT" before common ending words
        title = title.replace(/\b(Mentioned|mentioned|Shown|shown|Provided|provided|Demarcated|demarcated|Specified|specified|Indicated|indicated|Marked|marked|Available|available|Visible|visible)\b/i,
            "NOT $1"
        );

        lines.push("• " + title);

        if(item.remark && item.remark.trim()){

            lines.push("   Remarks : " + item.remark);

        }

        lines.push("");

    });

    if(lines.length===0){

        return "OK";

    }

    return lines.join("\n");

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
