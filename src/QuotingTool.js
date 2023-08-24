import * as React from "react";
import QuotingToolRow from "./QuoteToolRow";
import Button from "@mui/material/Button";
import { v4 as uuidv4 } from "uuid";
import QuoteModal from "./QuoteModal";

export default function QuotingTool() {
 
  const [items, setItems] = React.useState([{ }]);
  const [formData, setFormData] = React.useState([{}]);
  const [price, setPrice] = React.useState((1000).toFixed(2));

 

  function handleReset() {
    setFormData([{}]);
    setItems([{ }]);
  }

  function calcMultipier(data) {
    let kvaArr = data.map((data) => {
      if (+data.kva <= 100) {
        return Number((data.qty * 0.25 + +data.strings * data.qty *0.25 ).toFixed(2));
      } else if (+data.kva <= 300) {
        return Number((data.qty * 0.33 + +data.strings * data.qty * 0.33).toFixed(2));
      } else if (+data.kva <= 500) {
        return Number((data.qty * 0.45 + +data.strings * data.qty * 0.45).toFixed(2));
      } else {
        return Number((data.qty * 0.5 + +data.strings * data.qty * 0.5).toFixed(2));
      }
    });

    let kvaSum = kvaArr.reduce((accumulator, currentValue) => {
      return accumulator + currentValue;
    }, 0);

    if (kvaSum > 1) {
      setPrice((1000 * kvaSum).toFixed(2));
    }
  }

  function passFormData() {
  

    
    if (formData[0]['id'] === undefined) {
      formData.shift();
    }

    let revisedFormData = [...formData];

    calcMultipier(revisedFormData);

  }

  function addItems() {
    setItems([...items, { id: uuidv4() }]);
  }

  function removeItems(id) {
    //remove from the display
    const values = [...items];
    values.splice(
      values.findIndex((value) => value.id === id),
      1
    );
    setItems(values);

    //remove from formdata

    const formValues = [...formData];
    formValues.splice(
      formValues.findIndex((value) => value.id === id),
      1
    );
    setFormData(formValues);
  }

  const addFormData = (data) => { 
    
   

    const filtered = formData.filter((value) => value.id === data.id);


    if (filtered.length === 0) {
      setFormData([...formData, data]);
    } else {
      let removeField = formData.findIndex((obj) => obj.id === data.id);

      formData.splice(removeField, 1);
      setFormData([
        ...formData,
        {
          id: data.id,
          manufacturer: data.manufacturer,
          model: data.model,
          kva: data.kva,
          qty: data.qty,        
          strings: data.strings,
        },
      ]);
    }
  };

  return (
    <>
      <h1>Quoting Tool</h1>
      <form method="post" onReset={handleReset}>
        {items.map((items, index) => {
          return (
            <div key={index+1}>
              <h3>Item {index + 1}</h3>
              <QuotingToolRow
                id={index+1}
                addFormData={addFormData}     
              />
              <Button onClick={() => removeItems(index+1)}>Remove</Button>
            </div>
          );
        })}
        <Button onClick={addItems}>Add Items</Button>
        <hr />
        <Button type="reset">Reset form</Button>
      </form>
      <QuoteModal
        passFormData={passFormData}
        price={price}
        setPrice={setPrice}
        formData={formData}       
      />
    </>
  );
}
