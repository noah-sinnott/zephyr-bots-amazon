import React, {useContext, useState} from "react";
import styles from './styles'

import {Context} from '../../App'

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button'
import { generateId } from "../../helpers/generateId";

  function AddBillingModal({setOpen, isOpen}) {

    const context = useContext(Context)

    const [name, setName] = useState('');

    const [shippingPostCode, setShippingPostCode] = useState('');
    const [shippingAddressLine1, setShippingAddressLine] = useState('');
    const [shippingAddressLine2, setShippingAddressLine2] = useState('');
    
    const [billingPostCode, setBillingPostCode] = useState('');
    const [billingAddressLine1, setBillingAddressLine1] = useState('');
    const [billingAddressLine2, setBillingAddressLine2] = useState('');

    const [cardNumber, setCardNumber] = useState('');
    const [sortCode, setSortCode] = useState('');
    const [CVC, setCVC] = useState('');
    const [expiresAt, setExpiresAt] = useState('');

    async function addBilling(){
      
      let id = generateId()

      let billing = context.data.database.billing

      let newBillingProfile ={
       name : name,
       shippingAddressLine1: shippingAddressLine1,
       shippingAddressLine2: shippingAddressLine2,
      shippingPostCode: shippingPostCode,
       billingAddressLine1: billingAddressLine1,
       billingAddressLine2: billingAddressLine2,
      billingPostCode: billingPostCode,
       cardNumber: cardNumber,
       sortCode: sortCode,
        CVC: CVC,
      expiresAt: expiresAt
      }

      billing[id] = newBillingProfile
      const updatedDatabase = { ...context.data.database, billing: billing };
      context.updateData({database: updatedDatabase });
      exit()
    }

    function exit(){
      setOpen(false)
      setName('')
      setShippingAddressLine('')
      setShippingAddressLine2('');
      setShippingPostCode('');
      setBillingAddressLine1('')
      setBillingAddressLine2('');
      setBillingPostCode('');
      setCardNumber('')
      setSortCode('');
      setExpiresAt('');
      setCVC('');
    }

    return (
      <>
      {isOpen &&
      <div style={styles.background}>
        <div style={styles.mainContainer}>
        <div style={styles.form}>

          <TextField value={name} onChange={(event) => setName(event.target.value)} id="name" label="Name" variant="outlined" />
          <TextField value={shippingAddressLine1} onChange={(event) => setShippingAddressLine(event.target.value)} id="shippingAddressLine1" label="Shipping Address Line 1" variant="outlined" />
          <TextField value={shippingAddressLine2} onChange={(event) => setShippingAddressLine2(event.target.value)} id="shippingAddressLine2" label="Shipping Address Line 2"variant="outlined" />
          <TextField value={shippingPostCode} onChange={(event) => setShippingPostCode(event.target.value)} id="shippingPostCode" label="Shipping PostCode"variant="outlined" />

          <TextField value={billingAddressLine1} onChange={(event) => setBillingAddressLine1(event.target.value)} id="billingAddressLine1" label="Billing Address Line 1"variant="outlined" />
          <TextField value={billingAddressLine2} onChange={(event) => setBillingAddressLine2(event.target.value)} id="billingAddressLine2" label="Billing Adress Line 1"variant="outlined" />
          <TextField value={billingPostCode} onChange={(event) => setBillingPostCode(event.target.value)} id="billingPostCode" label="Billing Post Code"variant="outlined" />

          <TextField value={cardNumber} onChange={(event) => setCardNumber(event.target.value)} id="cardNumber" label="Card Number"variant="outlined" />
          <TextField value={sortCode} onChange={(event) => setSortCode(event.target.value)} id="sortCode" label="Sort Code"variant="outlined" />
          <TextField value={expiresAt} onChange={(event) => setExpiresAt(event.target.value)} id="expiresAt" label="Expires At"variant="outlined" />
          <TextField value={CVC} onChange={(event) => setCVC(event.target.value)} id="CVC" label="CVC"variant="outlined" />

        <div style={styles.submitButtons}>
        <Button variant="contained" size="large" onClick={() => addBilling()}>
           Add Billing Profile
        </Button>
        <Button variant="outlined"  style={{ color: 'red', borderColor: 'red' }} size="large" onClick={() => exit()}>
          Cancel
        </Button>         
        </div>
        </div>
        </div>
      </div> 
      }
      </>
    );
  }
  
  export default AddBillingModal;
  