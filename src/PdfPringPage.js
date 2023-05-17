import Button from "@mui/material/Button";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
const { imageString } = require("./ImageString.js");
pdfMake.vfs = pdfFonts.pdfMake.vfs;

export default function PdfPricingPage(props) {
  const {
    formData,
    name,
    title,
    company,
    email,
    coverage,
    visitsPerYear,
    years,
    upsPm,
    siteName,
    siteAddress,
    siteCity,
    siteState,
    siteZip,
    startDate,
    adjPrice,
  } = props;

  const formatDate = (date) => {
    let parts = date.$d.toString().split(" ");

    return parts[1] + "-" + parts[2] + "-" + parts[3];
  };
  const addAnS = (value) => (value > 1 ? "s" : "");

  const headerLine = {
    columns: [
      {
        // auto-sized columns have their widths based on their content
        width: 200,
        text: [{ text: `Site Name: ${siteName}`, alignment: "left" }],
      },

      {
        // star-sized columns fill the remaining space
        // if there's more than one star-column, available width is divided equally
        width: 200,
        text: [{ text: `Contract Type: ${coverage} - ${years} year${addAnS(years)}`, alignment: "right", },
        ],
      },
    ],
    // optional space between columns
    columnGap: 150,
    margin: [20, 10, 10, 0],
    bold: true,
  };

  const footerLine = {
    text: ["SDM METRO - ","215 N. Main Street", " - Freeport, NY 11520"],
    fontSize: 12, 
    alignment: "center" 
  };

  let tableData = formData;

  function setTableData(data) {
    let equipmentArray = [];
    let modelArray = [];
    let kvaArray = [];
    let qtyArray = [];
    let battArray = [];
    let stringsArray = [];

    for (let i = 0; i < data.length; i++) {
      qtyArray.push(data[i].qty.toString());
      equipmentArray.push(data[i].manufacturer);
      modelArray.push(data[i].model);
      kvaArray.push(data[i].kva.toString());
      battArray.push(data[i].batteries.toString());
      stringsArray.push(data[i].cabinets.toString());
    }

    return [
      qtyArray,
      equipmentArray,
      modelArray,
      kvaArray,
      battArray,
      stringsArray,
    ];
  }

  var docDefinition = {
    pageSize: "LETTER",
    pageMargins: [25.4, 25.4],
    font: "Times-Roman",

    header: function(page) { 
      if (page !== 1)
      {return headerLine}
      },

      footer: function(page) { 
        if (page !== 1)
        {return footerLine}
        },

    content: [
      // if you don't need styles, you can use a simple string to define a paragraph
      {
        image: imageString,
        width: 125,
        height: 50,
        alignment: "center",
        opacity: 0.7,
      },

      // using a { text: '...' } object lets you set styling properties
      { text: "215 N. Main Street", fontSize: 10, alignment: "center" },
      { text: "Freeport, NY 11520", fontSize: 10, alignment: "center" },
      { text: "Phone: (516) 536-2600", fontSize: 10, alignment: "center" },

      {
        columns: [
          {
            // auto-sized columns have their widths based on their content
            width: 100,
            text: [`${name} \n`, `${title} \n`, `${company} \n`, `${email} \n`],
          },

          {
            // star-sized columns fill the remaining space
            // if there's more than one star-column, available width is divided equally
            width: 200,
            text: [
              "Quote Number \n",
              `${siteAddress} \n`,
              `${siteCity}, ${siteState}, ${siteZip} \n`,
              `Start Date: ${formatDate(startDate)} \n`,
            ],
          },
        ],
        // optional space between columns
        columnGap: 275,
        margin: [10, 20, 10, 0],
      },
      {
        text: "_________________________________________________________________________________",
        fontSize: 15,
        alignment: "center",
        margin: [0, 5],
      },
      {
        text: `Subject: ${siteName} - ${coverage} - ${years} year${addAnS(
          years
        )} - ${visitsPerYear} visit${addAnS(
          visitsPerYear
        )} per year (${upsPm} major vist${addAnS(upsPm)} per year)`,
        fontSize: 12,
        alignment: "justify",
        bold: true,
        margin: [5, 5],
      },

      {
        margin: [10, 20],
        layout: "lightHorizontalLines", // optional
        table: {
          // headers are automatically repeated if the table spans over multiple pages
          // you can declare how many rows should be treated as headers
          headerRows: 1,
          widths: ["*", "*", "*", "*", "*", "*"],

          body: [
            ["Qty", "Manufacturer", "Model", "kVA", "Batteries", "Cabinets"],
            setTableData(tableData),
          ],
        },
      },

      {
        text: `Total Price: $${adjPrice}`,
        fontSize: 12,
        alignment: "right",
        bold: true,
        margin: [0, 20],
      },

      {
        text: `Thank you for requesting our quote - we value your business.`,
        fontSize: 12,
        alignment: "center",
        bold: false,
        italics: true,
        margin: [0, 20],
      },

      {
        text: `*Please see the following attached pages for more information about the contract coverage plan and maintenance work scope*`,
        fontSize: 12,
        alignment: "center",
        bold: false,
        margin: [0, 20],
        pageBreak: "after",
      },

      {
        text: `Coverage Levels`,
        fontSize: 12,
        alignment: "center",
        decoration: 'underline',
        bold: true,
        margin: [0, 20],   
      },

    
    ],
  };

  function generatePDF() {
    pdfMake.createPdf(docDefinition).open();
    // pdfMake.createPdf(docDefinition).download();
  }

  return (
    <>
      <Button sx={{ m: 1 }} onClick={generatePDF} type="button">
        Print PDF
      </Button>
    </>
  );
}
