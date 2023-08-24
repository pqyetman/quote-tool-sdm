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
    let stringsArray = [];

    for (let i = 0; i < data.length; i++) {
      qtyArray.push(data[i].qty.toString());
      equipmentArray.push(data[i].manufacturer);
      modelArray.push(data[i].model);
      kvaArray.push(data[i].kva.toString());
 
      stringsArray.push(data[i].strings.toString());
    }

    return [
      qtyArray,
      equipmentArray,
      modelArray,
      kvaArray,    
      stringsArray,
    ];
  }

  var docDefinition = {
    pageSize: "LETTER",
    pageMargins: [25, 25],
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
            width: 250,
            text: [`${name} \n`, `${title} \n`, `${company} \n`, `${email} \n`],
          },

          {
            width: '*',
            text: ''
          },

          {            
            width: 250,
            text: [
              "Quote Number \n",
              `${siteAddress} \n`,
              `${siteCity}, ${siteState}, ${siteZip} \n`,
              `Start Date: ${formatDate(startDate)} \n`,
            ],
            alignment: 'right',
          },
        ],
        // optional space between columns
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
          widths: ["*", "*", "*", "*",  "*"],

          body: [
            ["Qty", "Manufacturer", "Model", "kVA", "Cabinets per Unit"],
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
        text: `Coverage Packages`,
        fontSize: 12,
        alignment: "center",
        decoration: 'underline',
        bold: true,
        margin: [0, 40, 0, 10],  
      },

      {   alignment: "center",

      layout: {
          fillColor: function (rowIndex, node, columnIndex) { 
            
            if (columnIndex === 0) {  return '#D3D3D3'}
            if (columnIndex === 1) { return null }
            if (columnIndex === 2) {  return '#CD7F32'}
            if (columnIndex === 3) {  return '#C0C0C0' }
            if (columnIndex === 4) {  return '#d4af37 ' }          
          
          },},
          table: {
          widths: [100, 100, 100, 100, 100],
          body: [
            ['Coverage Level', 'PM Only', 'Bronze', 'Silver', 'Gold' ],
            ['Emergency Phone Calls', 'Included', 'Included', 'Included', 'Included', ],
            ['Remedial Coverage - Other than scheduled PMs', 'Not Included (T&M Rates)', '20% Discount (T&M Rates)', 'Included', 'Included', ],
            ['Remedial Response Coverage', '5x8', '5x8', '5x8', '7x24', ],
            ['Guaranteed Response Time', 'Not Included', '6 Hours', '4 Hours', '4 Hours', ],
            ['Parts Coverage*', 'Not Included', '20% Discount', '20% Discount', 'Included', ],
          
          ]
        }
      },

      {
        text: `PM Scope`,
        fontSize: 12,
        alignment: "center",
        decoration: 'underline',
        bold: true,
        margin: [0, 40, 0, 0],   
      },

      {
    
        ol: [
          {text: 'An Infrared Inspection/Survey of the equipment, its associated disconnects, and internal components at the above-referenced location. This task will be performed using the existing site load. ',  margin: [0,10]},
          {text:'Record Operation Circuit Voltage and Current - Capture and record the RMS values of the voltage and current using a calibrated electrical meter. ',  margin: [0,10]},
          {text:'Perform Operational Testing of the UPS Equipment, Transfer UPS to Battery (customer option), and transfer to/from bypass (customer option). A power analyzer will be utilized to determine abnormal transfer conditions.',  margin: [0,10]},
          {text:'Battery Maintenance will include the utilization of a Fluke Battery Analyzer/Alber Cellcorder ® Battery Multimeter CLC-200 when applicable.  The data storing, battery multimeter provides the most accurate method of reading cell float voltage, internal cell resistance, and intercell connection resistance.',  margin: [0,10]},
          {text:"At the completion of this service, we will assemble the results of the inspection, tests, and maintenance. We will then analyze these results to determine the condition of the equipment and/or components. This analysis will be documented in an SDM METRO UPS Condition report. SDM METRO will present the report to you and will include any recommended repairs in an effort of reducing the risk of downtime. If applicable, UPS's existing condition will be verified during the first PM.", margin: [0,10]},
        ],
        pageBreak: "after",
      },

      {
        text: `Terms & Conditions`,
        fontSize: 12,
        alignment: "center",
        decoration: 'underline',
        bold: true,
        margin: [0, 40, 0, 0],   
      },

      {
    
        ol: [
          {text: 'Unless otherwise mentioned above, all planned work in this quotation is assumed to take place during normal work hours (8 AM to 5 PM - Monday through Friday). ',  margin: [0,10]},
          {text:'You agree to be responsible for all applicable taxes on the services and/or materials provided. Payment is due within thirty (30) days of receipt of the invoice.',  margin: [0,10]},
          {text:'Unless otherwise stated elsewhere in this quotation, we will not be responsible for work that is performed by personnel other than SDM METRO.',  margin: [0,10]},
          {text:"Under no circumstances will we be responsible for a loss of profit, claims to your tenents or clients, or indirect consequential damages.", margin: [0,10]},
          {text:"Additional service requests other than those specifically covered will be performed according to the fee schedule listed above.", margin: [0,10]},
          
          [{text:"The successful performance of the tasks defined in this agreement are based on the following key assumptions: ", margin: [0,10]},
              {
                ul: [
                  
                  {text:"All services on the equipment listed in this contract, during the duration of the contract should be performed on-site by SDM METRO personnel and/or its authorized service partners. ", margin: [5,10,5,0]},
                  {text:"The equipment has been kept in an environment that adheres to the manufacturer's specifications", margin: [5,10,5,0]},
                
                ]
              }
          ],
          {text:"SDM METRO Hourly Rates:", margin: [0,10]},
        ]
      },

      {
        margin: [0,10],
        columns: [
            { width: '*', text: '' },
            {   
              width: 'auto',
              alignment: "center",

              layout: {
                      fillColor: function (rowIndex, node, columnIndex) { 
            
                        if (rowIndex === 0) {  return '#D3D3D3'}                     
          
                      }
                    },

              table: {                     
                      body: [
                        ['Regular Time Rate (Normal Hours)', 'Overtime Rate (Off Hours)'],
                        ['$187.50', '$281.25'],        
          
                        ]
                    }
          },
          { width: '*', text: '' },
        ]
      
      },

      {text: "This Agreement will become a binding legal contract only after acceptance as evidenced by your and our authorized representatives's signatures below.  No person has the authority to make any claim, representation, promise, or condition on our behalf that is not documented within this Agreement.", margin: [0,10],},

      {
        margin: [0,10],
        columns: [
            { width: 100,     
            
            text: [
              'Authorized for:\n',
              'Date: \n',
              'Signature: \n',
              'Name: \n',
              'Title: \n',
              'Company: \n',
         
            ] },
            { width: '*',     
            
            text: [
              '_________________________\n',
              '_________________________\n',
              '_________________________\n',
              `${name}\n`,
              `${title}\n`,
              `${company}\n`,
         
            ] },
       
            { width: 100,     
            
            text: [
              'Authorized for:\n',
              'Date: \n',
              'Signature: \n',
              'Name: \n',
              'Title: \n',
              'Company: \n',
         
            ] },
            { width: '*',     
            
            text: [
              'SDM METRO\n',
              '_________________________\n',
              '_________________________\n',
              '_________________________\n',
              '_________________________\n',
              'SDM METRO\n',
         
            ] },
        ]
      
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
