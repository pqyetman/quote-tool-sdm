import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import PdfPricingPage from "./PdfPringPage.js";
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import dayjs from 'dayjs';


export default function ContactInfoForm({price, setAdjPrice, formData, adjPrice}) {


  const [name, setName] = React.useState("Name");
  const [title, setTitle] = React.useState("Title");
  const [company, setCompany] = React.useState("Company");
  const [email, setEmail] = React.useState("Email");
  const [coverage, setCoverage] = React.useState("PM Only");
  const [visitsPerYear, setVisitsPerYear] = React.useState(1);
  const [years, setYears] = React.useState(1);
  const [mult, setMult] = React.useState(1);
  const [upsPm, setUpsPm] = React.useState(1);
  const [siteName, setSiteName] = React.useState("Site Name");
  const [siteAddress, setSiteAddress] =React.useState("Site Address");
  const [siteCity, setSiteCity] = React.useState("Site City");
  const [siteState, setSiteState] = React.useState("Site State");
  const [siteZip, setSiteZip] = React.useState("Site Zip");
  const [startDate, setStartDate] = React.useState(dayjs())


  React.useEffect(() => {
    const contObj = {1.0: "PM Only", 1.25: "Bronze", 1.5: "Silver", 2.0: "Gold"}

    function getKeyByValue(object, value) {
      return Object.keys(object).find(key => object[key] === value);
    }
    
    setAdjPrice((price * mult * (visitsPerYear + upsPm/4) * years * getKeyByValue(contObj, coverage) ).toFixed(2));
   

  }, [mult, years, visitsPerYear, upsPm, setAdjPrice, price, coverage]);


  function setVisitsPerYearAndUpsPms(e){

      setVisitsPerYear(e)

      if (upsPm > e) {
        setUpsPm(e)
      }
      

  }


  function mapValues(options, parameter, label, setValue) {
    return (
      <FormControl sx={{ m: 2, minWidth: 100} } size="small">
        <InputLabel id="demo-select-small-label">{label}</InputLabel>
        <Select
          labelId="demo-select-small-label"
          id={label}
          name={label}
          value={parameter}
          label={`${label}`}
          onChange={e=>setValue(e.target.value)}
        >
          {options.map((option, index) => {
            return (            
              <MenuItem key={index} value={option}>
                {option}
              </MenuItem>
              )         
          })}
        </Select>
      </FormControl>
    );
  }

  const setAnnualUpsRange = (visitsPerYear) => {

    let upsPmArray = [];

    for (let i = 1; i <= visitsPerYear; i++) { upsPmArray.push(i)}

    return upsPmArray;

  }

  let coverageRange = mapValues(["PM Only", "Bronze", "Silver", "Gold"], coverage, "Coverage", setCoverage);
  let visitsPerYearRange = mapValues([1, 2, 3, 4, 5, 6, 7, 8], visitsPerYear, "Annual Visits", setVisitsPerYearAndUpsPms);
  let yearsRange = mapValues([1, 2, 3, 4, 5, 6, 7, 8], years, "Years", setYears);
  let annualUpsPmsRange = mapValues(setAnnualUpsRange(visitsPerYear), upsPm, "UPS PMs", setUpsPm);



  const textField = (value, setValue, label) => {
    return (
      <FormControl sx={{ m: 1, minWidth: 100} } size="small">
      <TextField
        required
        label={label}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      </FormControl>
    );
  };

  const numField = (value, setValue, label) => {
    return (
      <FormControl sx={{  width: "12ch"  } } size="small">
      <TextField
        required
        type="number"
        label={label}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
        </FormControl>
    );
  };

  let multRange = numField(mult, setMult, "Multiplier")
  let custName = textField(name, setName, "Customer Name");
  let custTitle = textField(title, setTitle, "Customer Title");
  let custCompany = textField(company, setCompany, "Company");
  let custEmail = textField(email, setEmail, "Email");


  let siteNameField = textField(siteName, setSiteName, "Site");
  let siteAddressField = textField(siteAddress, setSiteAddress, "Site Address");
  let siteCityField = textField(siteCity, setSiteCity, "Site City");
  let siteStateField = textField(siteState, setSiteState, "Site State");
  let siteZipField = textField(siteZip, setSiteZip, "Site Zip");


  return (
<>

    <Box
      component="form"
      sx={{
        "& .MuiTextField-root": { m: 1 },
      }}
      noValidate
      autoComplete="off"
      
    >
        
       <MobileDatePicker label="Start Date" value={startDate} onChange={(newValue) => {setStartDate(newValue); console.log(newValue)}} />  
       {multRange} 

      <div>
        
        {coverageRange}
        {visitsPerYearRange}
        {yearsRange}
        {annualUpsPmsRange}
    
      </div>

      <div>
        {custName}
        {custTitle}
        {custCompany}
        {custEmail}
      </div>

      <div>
        {siteNameField}
        {siteAddressField}
        {siteCityField}
        {siteStateField}
        {siteZipField}
      </div>

      <PdfPricingPage
      formData={formData}
      name={name}     
      title={title}
      company={company}
      email={email}
      coverage={coverage}
      visitsPerYear={visitsPerYear}
      years ={years}
      upsPm = {upsPm}
      siteName = {siteName}
      siteAddress = {siteAddress}
      siteCity = {siteCity}
      siteState = {siteState}
      siteZip ={siteZip}
      startDate = {startDate}
      adjPrice = {adjPrice}
      />
    </Box>
  
    </>
  );
}
