import { useState, useEffect, useRef } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import AutoGraph from "@mui/icons-material/AutoGraph";
import GetApp from "@mui/icons-material/GetApp";

import {
  calculateMonthlyWorkDays,
  removeNonBillableDays,
} from "./EUCCleanUpFunctions";
import Example from "./EUCGraph";
import { getData } from "./TeamUpApiFetch";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import dayjs from "dayjs";

export default function EmployeeUsageCalculator() {
  const [employeeObj, setEmployeeObj] = useState([]);
  const [employee, setEmployee] = useState({ name: "", id: 0 });
  const [employeeOptions, setEmployeeOptions] = useState([]);
  const [employeeEvents, setEmployeeEvents] = useState([]);
  const [startDate, setStartDate] = useState(dayjs().add(-1, "year"));
  const [endDate, setEndDate] = useState(dayjs());
  const [data, setData] = useState([
    {
      name: "Page A",
      uv: 10,
      pv: 20,
      amt: 2400,
    },
    {
      name: "Page B",
      uv: 30,
      pv: 13,
      amt: 2210,
    },
    {
      name: "Page C",
      uv: 20,
      pv: 98,
      amt: 2290,
    },
    {
      name: "Page D",
      uv: 27,
      pv: 39,
      amt: 2000,
    },
    {
      name: "Page E",
      uv: 18,
      pv: 48,
      amt: 2181,
    },
    {
      name: "Page F",
      uv: 23,
      pv: 38,
      amt: 2500,
    },
    {
      name: "Page G",
      uv: 34,
      pv: 43,
      amt: 2100,
    },
  ]);

  const dateRef = useRef([])
  const employeeEventsRef = useRef([])

 
  useEffect(() => {
    if (employeeObj.length < 1) {
      getData(
        "https://api.teamup.com/ksek8qiiuvk4p1skdv/subcalendars",
        setEmployeeObj
      );
    } else {
      setEmployeeOptions(
        employeeObj.map((item) => (
          <MenuItem key={item.id} value={item.name}>
            {item.name}
          </MenuItem>
        ))
      );
    }
  }, [employeeObj]);

  function handleEmployeeChange(event) {

    let selectedEmployeeId = employeeObj.filter(
      (employee) => employee.name === event.target.value
    )[0].id;

    setEmployee({ name: event.target.value, id: selectedEmployeeId });

    
 
 
  }

  function handleRetrieveData() { 

  dateRef.current = calculateMonthlyWorkDays(startDate.$d, endDate.$d)

    getData(
      `https://api.teamup.com/ksek8qiiuvk4p1skdv/events?startDate=
      ${startDate.$y}-${startDate.$M + 1}-${startDate.$D}&endDate=
      ${endDate.$y}-${endDate.$M + 1}-${endDate.$D}&subcalendarId[]=${
        employee.id
      }`,
      setEmployeeEvents
    );

   

  }

  function handleGraphData() {

  let dataArray = [];


   removeNonBillableDays(employeeEvents, dateRef.current)

  

   dateRef.current.forEach( value=>{

    

    let percentWeekDaysWorked = Math.round((value.weekdaysworked/value.weekDays)*100)
    let percentWeekEndsWorked = Math.round((value.weekendsworked/value.weekEnds)*100)

    let newObj = {date: value.monthYear, percentWEW: percentWeekEndsWorked, percentWDW: percentWeekDaysWorked}



    dataArray.push(newObj)

   })

  
    setData(dataArray)
  
 

  }

  return (
    <>
      <div>
        <h1>Data Filters</h1>
        <Box sx={{ minWidth: 120 }}>
          <MobileDatePicker
            label="From"
            value={startDate}
            onChange={(newValue) => setStartDate(newValue)}
            sx={{ m: 1, minWidth: 120 }}
          />
          <MobileDatePicker
            label="To"
            value={endDate}
            onChange={(newValue) => setEndDate(newValue)}
            sx={{ m: 1, minWidth: 120 }}
          />
          <FormControl sx={{ m: 1, minWidth: 120 }} size="medium">
            <InputLabel id="demo-simple-select-label">Employee</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={employee.name}
              label="Employee"
              onChange={handleEmployeeChange}
            >
              {employeeOptions}
            </Select>
          </FormControl>

          <Button
            variant="contained"
            onClick={() => handleRetrieveData()}
            size="large"
            endIcon={<GetApp />}
            sx={{ m: 1, minWidth: 120, minHeight: 55 }}
            disabled={employee.name === "" ? true : false}
          >
            Get Data
          </Button> 
        </Box>
      </div>

      <Example data={data} />
      <Button
            variant="contained"
            onClick={() => handleGraphData()}
            size="large"
            endIcon={<AutoGraph />}
            sx={{ m: 1, minWidth: 120, minHeight: 55 }}
            disabled={employee.name === "" ? true : false}
          >
            Graph
          </Button>
    </>
  );
}
