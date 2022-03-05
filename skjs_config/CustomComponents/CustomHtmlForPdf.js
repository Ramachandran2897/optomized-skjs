import React from "react";
export const customHtmlPdf = (props) => {
  const {
    tableValues,
    tableFieldName,
    tableHeadingName,
    detailsOfKeyAndValue,
    heading,
    name,
    estno,
    detailsOfKeyAndValueHeading
  } = props;
  let today = new Date();
  let date =
    today.getDate() + "-" + (today.getMonth() + 1) + "-" + today.getFullYear();
  let time = today.getHours() + ":" + today.getMinutes();
  let tableHeading = "";
  let table1 = "";
  let details = "";
  let details1 = "";
  React.Children.toArray(
    tableFieldName.map((obj) => {
      table1 = table1 + "<tr>";
      for (const key in obj) {
        table1 = table1 + `<td>${obj[key]}</td>`;
      }
      ("</tr>");
    })
  );

  const html = `
    <!DOCTYPE html>
    <html>
      <head>
      <style>
        table {
          font-family: arial, sans-serif;
          border-collapse: collapse;
          width: 100%;
        }
        
        td, th {
          border: 1px solid #dddddd;
          text-align: left;
          padding: 8px;
        }
        
        tr:nth-child(even) {
          background-color: #dddddd;
        }
        p.textRight{
            text-align: right;
        }
        .container{
            display: flex;
            align-items: center;
            max-width: 70%;
        }
        .grow{
            flex-grow: 4;
            width: 30%;
        }
        .position{
            text-align: right;
        }
        .boldfont{
            font-weight: bold;
        }
        .total_amount{
           font-size: 20px; 
           display: inline-block;
           padding-left: 70px;
        }
      </style>
      </head>
      <body>
      <p class="textRight boldfont">${estno}</p>
      <p class="textRight boldfont">${date} ${time} ${
        today.getHours() >= 12 ? "PM" : "AM"
      }</p>
      ${React.Children.toArray(
        detailsOfKeyAndValueHeading.map(({ key, value }) => {
          details1 = details1+`<div class="container">
          <p class="grow">${key}</p>
          <p class="grow boldfont">: ${value}</p>
          <p></p>
        </div>`
        })
      )}
      ${details1}
      <div style="display: flex; justify-content: space-between; align-items: center;">
      <div>
      <p class="boldfont">${heading.title1}</p>
      ${name!=="detail" ? `<p class="boldfont">${heading.title2}</p>`:""}
      </div>
      <div>
      ${name!=="detail" ? `<p class="boldfont">${heading.value1}</p>`:""}
      ${name!=="detail" ? `<p class="boldfont">${heading.value2}</p>`:""}
      </div>
      </div>
      <table>
      <tr>
      ${tableHeading = tableHeading + "<tr>"}
      ${React.Children.toArray(
        tableHeadingName.map((value) => {
          tableHeading = tableHeading + `<th> ${value} </th>`;
        })
      )}
      ${tableHeading}
      </tr>
        ${table1}
      </table>
      ${React.Children.toArray(
        detailsOfKeyAndValue.map(({ key, value }) => {
          details = details+`<div class="container">
          <p class="grow">${key}</p>
          <p class="grow boldfont">: ${value}</p>
          <p></p>
        </div>`
        })
      )}
      ${details}
      </body>
    </html>
      `;
  return html;
};
