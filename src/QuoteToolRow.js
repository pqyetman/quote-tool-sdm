import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import TextField from '@mui/material/TextField';

export default function QuotingToolRow(props) {

  const [manufacturer, setManufacturer] = React.useState("Manufacturer");
  const [model, setModel] = React.useState("Model");
  const [kva, setKva] = React.useState(0);
  const [qty, setQty] = React.useState(0);
  const [cabs, setCabs] = React.useState(0);

  const { id, addFormData} = props;
 
  React.useEffect(() => {
    
    addFormData({
      id: id,
      manufacturer: manufacturer,
      model: model,
      kva: kva,
      qty: qty,  
      strings: cabs,
    });
  },[manufacturer, model, kva, qty, cabs, id]);


  



  function mapValues(options, parameter,  handleChange, label) {
    return (
      <FormControl sx={{ m: 1, minWidth: label === "Qty." ? 60 : 150} } size="small">
        <InputLabel id="demo-select-small-label">{label}</InputLabel>
        <Select
          labelId="demo-select-small-label"
          id={label + id}
          name={label}
          value={parameter}
          label={label}
          onChange={e=>handleChange(e.target.value)}
        >
          {options.map((option, index) => {
         
            return (
              <MenuItem key={index} value={option}>
                {option}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    );
  }






  let manufacturerRange = mapValues(["Manufacturer", "APC", "Schneider", "Mitsubishi", "GE", "EATON", "Xtreme Power", "Other"], manufacturer, setManufacturer, "Manufacturer");
  let qtyRange = mapValues([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10], qty, setQty, "Qty.");



  let cabsRange = (   
    <FormControl sx={{ m: 1, width: '12ch' }} size="small">
      <TextField   
        size="small"   
        id={"cabs"+id}
        label="Cabs. per unit"
        type="number"
        onChange={(e)=>setCabs(e.target.value)}
        value={cabs}
        InputLabelProps={{
          shrink: true,
        }}
      />   
        </FormControl>
  );


  let kvaRange = (   
    <FormControl sx={{ m: 1, width: '10ch' }} size="small">
      <TextField   
        size="small"   
        id={"kva" + id}
        label="kVA"
        type="number"
        onChange={(e)=>setKva(e.target.value)}
        value={kva}
        InputLabelProps={{
          shrink: true,
        }}
      />   
        </FormControl>
  );

  let modelRange = (   
    <FormControl sx={{ m: 1, width: '25ch' }} size="small">
      <TextField   
        size="small"   
        id={"Mode" + id}
        label="Model"   
        onChange={(e)=>setModel(e.target.value)}
        value={model}
        InputLabelProps={{
          shrink: true,
        }}
      />   
        </FormControl>
  );

  return (
    <>
      {manufacturerRange}
      {modelRange}
      {kvaRange}
      {qtyRange}    
      {cabsRange}
    </>
  );
}
