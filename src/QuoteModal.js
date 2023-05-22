import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Paper from "@mui/material/Paper";
import Draggable from "react-draggable";
import ContactInfoForm from "./ContactInfoForm.js";


function PaperComponent(props) {
  return (
    <Draggable
      handle="#draggable-dialog-title"
      cancel={'[class*="MuiDialogContent-root"]'}
    >
      <Paper {...props} />
    </Draggable>
  );
}

export default function QuoteModal(props) {
  const [open, setOpen] = React.useState(false); 
  const { price, setPrice, passFormData, formData } = props;
  const [adjPrice, setAdjPrice] = React.useState(price);



  const handleClickOpen = () => {
   
    passFormData();
    setOpen(true);
    console.log(formData);
  };

  const handleClose = () => {
    setOpen(false);
    setPrice((1000).toFixed(2));
    setAdjPrice((1000).toFixed(2));
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Get A Quote
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperComponent={PaperComponent}
        aria-labelledby="draggable-dialog-title"
      >
        <DialogTitle style={{ cursor: "move" }} id="draggable-dialog-title">
          Current Price: $ {adjPrice}
        </DialogTitle>
        <DialogContent>
          <ContactInfoForm
            adjPrice={adjPrice}
            setAdjPrice={setAdjPrice}
            price={price}
            formData={formData}
          />
        </DialogContent>
        <DialogActions>        
          <Button onClick={handleClose}>Go Back</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
