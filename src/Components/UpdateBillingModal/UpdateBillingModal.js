import React, {useContext, useState} from "react";
import styles from './styles'

import {Context} from '../../App'

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button'

  function UpdateBillingModal({setOpen, isOpen, billingId}) {

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

    async function update(){
      
    let billing = context.data.database.billing

    if(billingId){
      if(name != '') billing[billingId].name = name
      if(shippingAddressLine1 != '') billing[billingId].shippingAddressLine1 = shippingAddressLine1
      if(shippingAddressLine2 != '') billing[billingId].shippingAddressLine2 = shippingAddressLine2
      if(shippingPostCode != '') billing[billingId].shippingPostCode = shippingPostCode
      if(billingAddressLine1 != '') billing[billingId].billingAddressLine1 = billingAddressLine1
      if(billingAddressLine2 != '') billing[billingId].billingAddressLine2 = billingAddressLine2
      if(billingPostCode != '') billing[billingId].billingPostCode = billingPostCode
      if(cardNumber != '') billing[billingId].cardNumber = cardNumber
      if(sortCode != '') billing[billingId].sortCode = sortCode
      if(CVC != '') billing[billingId].CVC = CVC
      if(expiresAt != '') billing[billingId].expiresAt = expiresAt
    } else {
      await Object.entries(billing).map(([key, value]) => {
        if(name != '') value.name = name
        if(shippingAddressLine1 != '') value.shippingAddressLine1 = shippingAddressLine1
        if(shippingAddressLine2 != '') value.shippingAddressLine2 = shippingAddressLine2
        if(shippingPostCode != '') value.shippingPostCode = shippingPostCode
        if(billingAddressLine1 != '') value.billingAddressLine1 = billingAddressLine1
        if(billingAddressLine2 != '') value.billingAddressLine2 = billingAddressLine2
        if(billingPostCode != '') value.billingPostCode = billingPostCode
        if(cardNumber != '') value.cardNumber = cardNumber
        if(sortCode != '') value.sortCode = sortCode
        if(CVC != '') value.CVC = CVC
        if(expiresAt != '') value.expiresAt = expiresAt
      })
    }
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

        {billingId && 
          <TextField value={name} onChange={(event) => setName(event.target.value)} id="name" label="Name" variant="outlined" />
        }
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
        <Button variant="contained" size="large" onClick={() => update()}>
          Update All
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
  
  export default UpdateBillingModal;
  