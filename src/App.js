import "./App.css";
import SignIn from "./SignIn";
import Home from "./Home";
import QuotingTool from "./QuotingTool";
import ButtonAppBar from "./ButtonAppBar";
import { Route, Switch } from "react-router-dom";
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'


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
      </Switch>

      </LocalizationProvider>
    </div>
  );
}

export default App;
