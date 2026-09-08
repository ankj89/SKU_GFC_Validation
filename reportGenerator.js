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

function buildCategoryValidation(record){

    const issues=[];

    (record.checklist||[]).forEach(item=>{

        if(item.status!=="Absent"){

            return;

        }

        let line=item.title;

        if(item.remark){

            line+="<br><i>Remarks : "

                +item.remark+

                "</i>";

        }

        issues.push(line);

    });

    if(issues.length===0){

        return "OK";

    }

    return issues.join("<hr>");

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
