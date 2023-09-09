import "./App.css";
import SignIn from "./SignIn";
import Home from "./Home";
import QuotingTool from "./QuotingTool";
import EmployeeUsageCalculator from "./EmployeeUsageCalculator";
import ButtonAppBar from "./ButtonAppBar";
import { Route, Switch } from "react-router-dom";
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import MyCalendar from "./MyCalendar";


function App() {
  return (
    <div className="App">
       <LocalizationProvider dateAdapter={AdapterDayjs}>
      <ButtonAppBar />

      <Switch>
        <Route exact path="/">
          <SignIn />
        </Route>
        <Route exact path="/home">
          <Home />
        </Route>
        <Route exact path="/quotingtool">
          <QuotingTool />
        </Route>
        <Route exact path="/employeeusagecalculator">
          <EmployeeUsageCalculator />
        </Route>     
        <Route exact path="/calendar">
          <MyCalendar />
        </Route>  
      </Switch>

      </LocalizationProvider>
    </div>
  );
}

export default App;
