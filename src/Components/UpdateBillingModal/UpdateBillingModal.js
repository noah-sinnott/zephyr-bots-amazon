import React, {useContext, useState, useEffect} from "react";
import styles from './styles'

import {Context} from '../../App'
import { kill } from "../../helpers/ScriptRunner";
import { Input, Modal, Button, FormControlLabel, Checkbox, } from "@mui/material";
import colors from "../../colors/colors";
import ConfirmationDialog from "../ConfirmationDialog/ConfirmationDialog";

  function UpdateBillingModal({setOpen, isOpen, billingId}) {

    const context = useContext(Context)

    const [name, setName] = useState('');
    const [cardHolderName, setCardHolderName] = useState('');
    const [cardNumber, setCardNumber] = useState('');
    const [CVC, setCVC] = useState('');
    const [expiresAt, setExpiresAt] = useState('');
    const [cardHolderNumber, setCardHolderNumber] = useState('');

    const [shippingFullName, setShippingFullName] = useState('');
    const [shippingNumber, setShippingNumber] = useState('');
    const [shippingPostCode, setShippingPostCode] = useState('');
    const [shippingAddressLine1, setShippingAddressLine1] = useState('');
    const [shippingAddressLine2, setShippingAddressLine2] = useState('');
    const [shippingRegion, setShippingRegion] = useState('');
    const [shippingCity, setShippingCity] = useState('');

    const [billingPostCode, setBillingPostCode] = useState('');
    const [billingAddressLine1, setBillingAddressLine1] = useState('');
    const [billingAddressLine2, setBillingAddressLine2] = useState('');
    const [billingRegion, setBillingRegion] = useState('');
    const [billingCity, setBillingCity] = useState('');

    const [page, setPage] = useState(1);
    const [billingSameAs, setBillingSameAs] = useState(false);

    const [editBillingDialog, setEditBillingDialog] = useState(false)

    useEffect(() => {
      if (!billingId) return;
    
      const billingData = context.data.database.billing[billingId];
    
      setName(billingData.name);
      setCardHolderName(billingData.cardHolderName);
      setCardNumber(billingData.cardNumber);
      setCVC(billingData.CVC);
      setExpiresAt(billingData.expiresAt);
      setCardHolderNumber(billingData.cardHolderNumber);
    
      setShippingFullName(billingData.shippingFullName);
      setShippingNumber(billingData.shippingNumber);
      setShippingPostCode(billingData.shippingPostCode);
      setShippingAddressLine1(billingData.shippingAddressLine1);
      setShippingAddressLine2(billingData.shippingAddressLine2);
      setShippingRegion(billingData.shippingRegion);
      setShippingCity(billingData.shippingCity);
    
      setBillingPostCode(billingData.billingPostCode);
      setBillingAddressLine1(billingData.billingAddressLine1);
      setBillingAddressLine2(billingData.billingAddressLine2);
      setBillingRegion(billingData.billingRegion);
      setBillingCity(billingData.billingCity);
    
      setBillingSameAs(billingData.billingSameAs);
    }, [isOpen]);
    
    function handlePage (forward){
      if(forward){
          setPage(page + 1)
      } else {
          setPage(page - 1)    
      }
    }

    async function update(){
      
      let taskGroups = context.data.database.taskGroups

      Object.entries(taskGroups).forEach(([key, taskGroup]) => {
        Object.entries(taskGroup.tasks).forEach(([key, task]) => {
          if(task.billing === billingId){
            if(task.scriptRunning !== false){
              kill(key)
              task.scriptRunning = false
              task.notifications = []
          }
          }
        })
      })
      
      let billing = context.data.database.billing

      billing[billingId].name = name;
      billing[billingId].cardNumber = cardNumber;
      billing[billingId].CVC = CVC;
      billing[billingId].expiresAt = expiresAt;
      billing[billingId].cardHolderName = cardHolderName;
      billing[billingId].cardHolderNumber = cardHolderNumber;
    
      billing[billingId].shippingFullName = shippingFullName;
      billing[billingId].shippingNumber = shippingNumber;
      billing[billingId].shippingAddressLine1 = shippingAddressLine1;
      billing[billingId].shippingAddressLine2 = shippingAddressLine2;
      billing[billingId].shippingPostCode = shippingPostCode;
      billing[billingId].shippingCity = shippingCity;
      billing[billingId].shippingRegion = shippingRegion;
    
      billing[billingId].billingAddressLine1 = billingSameAs ? shippingAddressLine1 : billingAddressLine1;
      billing[billingId].billingAddressLine2 = billingSameAs ? shippingAddressLine2 : billingAddressLine2;
      billing[billingId].billingPostCode = billingSameAs ? shippingPostCode : billingPostCode;
      billing[billingId].billingCity = billingSameAs ? shippingCity : billingCity;
      billing[billingId].billingRegion = billingSameAs ? shippingRegion : billingRegion;
    
      billing[billingId].billingSameAs = billingSameAs;

      const updatedDatabase = { ...context.data.database, billing: billing, taskGroups: taskGroups };
      context.updateData({database: updatedDatabase });
      exit()
    }

    function exit() {
      setOpen(false);
      
      setName('');
      setCardHolderName('');
      setCardNumber('');
      setCVC('');
      setExpiresAt('');
      setCardHolderNumber('');
    
      setShippingFullName('');
      setShippingNumber('');
      setShippingPostCode('');
      setShippingAddressLine1('');
      setShippingAddressLine2('');
      setShippingRegion('');
      setShippingCity('');
    
      setBillingPostCode('');
      setBillingAddressLine1('');
      setBillingAddressLine2('');
      setBillingRegion('');
      setBillingCity('');
    
      setPage(1);
      setBillingSameAs(false);
    }

    return (<>
      <ConfirmationDialog isOpen={editBillingDialog} setOpen={setEditBillingDialog} submit={() => update()} mainText2={'This will stop any running tasks with this billing profile'} submitText={'Update Billing Profile'} mainText={'Confirm you want to update this billing profile'}/>

      <Modal
        open={isOpen}
        onClose={() => exit()}
        aria-labelledby="Update Billing"
        aria-describedby="Update Billing"
      >
        <div style={styles.content}>

        <div style={styles.title}>
          <h1>Update Billing Profile</h1>
        </div>

        {
  page === 1 ? 
<>
<div style={styles.inputContainer}>
  <p>Billing Profile Name:</p>
  <Input
    value={name}
    disableUnderline={true}
    onChange={(event) => setName(event.target.value)}
    id="name"
    sx={styles.textInput}
    placeholder="Enter Billing Profile Name"
  />
</div>
<div style={styles.inputContainer}>
  <p>Card Number:</p>
  <Input
    value={cardNumber}
    disableUnderline={true}
    onChange={(event) => setCardNumber(event.target.value)}
    id="cardNumber"
    sx={styles.textInput}
    placeholder="Enter Card Number"
  />
</div>
<div style={styles.inputContainer}>
  <p>Expires At:</p>
  <Input
    value={expiresAt}
    disableUnderline={true}
    onChange={(event) => setExpiresAt(event.target.value)}
    id="expiresAt"
    sx={styles.textInput}
    placeholder="Enter Expires At"
  />
</div>
<div style={styles.inputContainer}>
  <p>CVC:</p>
  <Input
    value={CVC}
    disableUnderline={true}
    onChange={(event) => setCVC(event.target.value)}
    id="CVC"        
    sx={styles.textInput}
    placeholder="Enter CVC"
  />
</div>
<div style={styles.inputContainer}>
  <p>Card Holder's Name:</p>
  <Input
    value={cardHolderName}
    disableUnderline={true}
    onChange={(event) => setCardHolderName(event.target.value)}
    id="cardHolderName"
    sx={styles.textInput}
    placeholder="Enter Card Holder's Name"
  />
</div>
<div style={styles.inputContainer}>
  <p>Card Holder's Phone Number:</p>
  <Input
    value={cardHolderNumber}
    disableUnderline={true}
    onChange={(event) => setCardHolderNumber(event.target.value)}
    id="cardHolderNumber"
    sx={styles.textInput}
    placeholder="Enter Card Holder's Number"
  />
</div> 
</> : page === 2 ? <>
<div style={styles.inputContainer}>
  <p>Address Holder's Name:</p>
  <Input
    value={shippingFullName}
    disableUnderline={true}
    onChange={(event) => setShippingFullName(event.target.value)}
    id="shippingFullName"
    sx={styles.textInput}
    placeholder="Enter Shipping Address's Recipient's Name"
  />
</div>
<div style={styles.inputContainer}>
  <p>Address Holder's Number:</p>
  <Input
    value={shippingNumber}
    disableUnderline={true}
    onChange={(event) => setShippingNumber(event.target.value)}
    id="shippingNumber"
    sx={styles.textInput}
    placeholder="Enter Shipping Address's Recipient's Number"
  />
</div>
<div style={styles.inputContainer}>
  <p>Shipping Address Line 1:</p>
  <Input
    value={shippingAddressLine1}
    disableUnderline={true}
    onChange={(event) => setShippingAddressLine1(event.target.value)}
    id="shippingAddressLine1"
    sx={styles.textInput}
    placeholder="Enter Shipping Address Line 1"
  />
</div>
<div style={styles.inputContainer}>
  <p>Shipping Address Line 2:</p>
  <Input
    value={shippingAddressLine2}
    disableUnderline={true}
    onChange={(event) => setShippingAddressLine2(event.target.value)}
    id="shippingAddressLine2"
    sx={styles.textInput}
    placeholder="Enter Shipping Address Line 2"
  />
</div>
<div style={styles.inputContainer}>
  <p>Shipping Post Code:</p>
  <Input
    value={shippingPostCode}
    disableUnderline={true}
    onChange={(event) => setShippingPostCode(event.target.value)}
    id="shippingPostCode"
    sx={styles.textInput}
    placeholder="Enter Shipping Post Code"
  />
</div>
<div style={styles.inputContainer}>
  <p>Shipping City:</p>
  <Input
    value={shippingCity}
    disableUnderline={true}
    onChange={(event) => setShippingCity(event.target.value)}
    id="shippingCity"
    sx={styles.textInput}
    placeholder="Enter Shipping City"
  />
</div>
<div style={styles.inputContainer}>
  <p>Shipping Region / County:</p>
  <Input
    value={shippingRegion}
    disableUnderline={true}
    onChange={(event) => setShippingRegion(event.target.value)}
    id="shippingRegion"
    sx={styles.textInput}
    placeholder="Enter Shipping Region"
  />
</div>
<FormControlLabel control={<Checkbox checked={billingSameAs} sx={{color: colors.text, '&.Mui-checked': {color: colors.text}}} onChange={(e) => setBillingSameAs(e.target.checked)}/>} label="Billing Address Same As Shipping" />
</> 
: 
 <>
<div style={styles.inputContainer}>
  <p>Billing Address Line 1:</p>
  <Input
    value={billingAddressLine1}
    disableUnderline={true}
    onChange={(event) => setBillingAddressLine1(event.target.value)}
    id="billingAddressLine1"
    sx={styles.textInput}
    placeholder="Enter Billing Address Line 1"
  />
</div>
<div style={styles.inputContainer}>
  <p>Billing Address Line 2:</p>
  <Input
    value={billingAddressLine2}
    disableUnderline={true}
    onChange={(event) => setBillingAddressLine2(event.target.value)}
    id="billingAddressLine2"
    sx={styles.textInput}
    placeholder="Enter Billing Address Line 2"
  />
</div>
<div style={styles.inputContainer}>
  <p>Billing Post Code:</p>
  <Input
    value={billingPostCode}
    disableUnderline={true}
    onChange={(event) => setBillingPostCode(event.target.value)}
    id="billingPostCode"
    sx={styles.textInput}
    placeholder="Enter Billing Post Code"
  />
</div> 
<div style={styles.inputContainer}>
  <p>Billing City:</p>
  <Input
    value={billingCity}
    disableUnderline={true}
    onChange={(event) => setBillingCity(event.target.value)}
    id="billingCity"
    sx={styles.textInput}
    placeholder="Enter Billing City"
  />
</div>
<div style={styles.inputContainer}>
  <p>Billing Region / County:</p>
  <Input
    value={billingRegion}
    disableUnderline={true}
    onChange={(event) => setBillingRegion(event.target.value)}
    id="billingRegion"
    sx={styles.textInput}
    placeholder="Enter Billing Region"
  />
</div>
</>
  }
        <div style={styles.submitButtons}>
          {page === 1 ? 
        <Button variant="contained" size="large" style={styles.addButton}  disableElevation onClick={() => handlePage(true)}>
          Next
        </Button> 
        : (page === 2 && billingSameAs) || (page === 3) ? 
        <>  
        <Button variant="contained" size="large" style={styles.addButton}  disableElevation onClick={() => handlePage(false)}>
          Back
        </Button>
          <Button variant="contained" size="large" style={styles.addButton}  disableElevation onClick={() => setEditBillingDialog(true)}>
          Update Billing Profile
        </Button>
        </> 
        :
        <>  
        <Button variant="contained" size="large" style={styles.addButton}  disableElevation onClick={() => handlePage(false)}>
          Back
        </Button>
        <Button variant="contained" size="large" style={styles.addButton}  disableElevation onClick={() => handlePage(true)}>
         Next
        </Button>
        </>
        
        }
        <Button variant="outlined" style={styles.cancelButton} size="medium"  disableElevation onClick={() => exit()}>
          Cancel
        </Button>      
        </div>
        </div>
        </Modal>
        </>
    );
  }


  export default UpdateBillingModal;
  