import React, {useContext, useState} from "react";
import styles from './styles'
import {Context} from '../../App'
import { Input, Modal, Button } from "@mui/material";
import Select from "react-select";

  function BulkUpdateBilling({setOpen, isOpen}) {

    const context = useContext(Context)

    const [name, setName] = useState('');

    const [shippingPostCode, setShippingPostCode] = useState('');
    const [shippingAddressLine1, setShippingAddressLine1] = useState('');
    const [shippingAddressLine2, setShippingAddressLine2] = useState('');
    
    const [billingPostCode, setBillingPostCode] = useState('');
    const [billingAddressLine1, setBillingAddressLine1] = useState('');
    const [billingAddressLine2, setBillingAddressLine2] = useState('');

    const [cardNumber, setCardNumber] = useState('');
    const [sortCode, setSortCode] = useState('');
    const [CVC, setCVC] = useState('');
    const [expiresAt, setExpiresAt] = useState('');
    const [page, setPage] = useState(1);

    const [activeFields1, setActiveFields1] = useState([]);
    const [activeFields2, setActiveFields2] = useState([]);
    const [activeFields3, setActiveFields3] = useState([]);
    const [activeFields1Unfiltered, setActiveFields1Unfiltered] = useState([]);
    const [activeFields2Unfiltered, setActiveFields2Unfiltered] = useState([]);
    const [activeFields3Unfiltered, setActiveFields3Unfiltered] = useState([]);
const fields1 = [  
{value: 'name', label: 'Name'},
{value: 'shippingPostCode', label: 'Shipping Post Code'},
{value: 'shippingAddressLine1', label: 'Shipping Address Line1'},
{value: 'shippingAddressLine2', label: 'Shipping Address Line2'},
];

const fields2 = [  
{value: 'billingPostCode', label: 'Billing Post Code'},
{value: 'billingAddressLine1', label: 'Billing Address Line1'},
{value: 'billingAddressLine2', label: 'Billing Address Line2'},
];

const fields3 = [ 
{value: 'cardNumber', label: 'Card Number'},
{value: 'sortCode', label: 'Sort Code'},
{value: 'CVC', label: 'CVC'},
{value: 'expiresAt', label: 'Expires At'}
];
    function formatFields(inputedFields){
      let arr = []
      
      inputedFields.forEach((field) => {
          arr.push(field.value)
      })
   
      if(page == 1){
        activeFields1.forEach((currentField) => {
        if (!arr.includes(currentField)) {
          if (currentField === 'name') {
            setName('');
          } else if (currentField === 'shippingPostCode') {
            setShippingPostCode('');
          } else if (currentField === 'shippingAddressLine1') {
            setShippingAddressLine1('');
          } else if (currentField === 'shippingAddressLine2') {
            setShippingAddressLine2('');
          } 
        }
      });
      setActiveFields1Unfiltered(inputedFields)    
      setActiveFields1(arr)
      } else if(page == 2){
        activeFields2.forEach((currentField) => {
        if (!arr.includes(currentField)) {
          if (currentField === 'billingPostCode') {
            setBillingPostCode('');
          } else if (currentField === 'billingAddressLine1') {
            setBillingAddressLine1('');
          } else if (currentField === 'billingAddressLine2') {
            setBillingAddressLine2('');
          }
        }
      });
      setActiveFields2Unfiltered(inputedFields)
      setActiveFields2(arr)      
      } else {
          activeFields3.forEach((currentField) => {
          if (!arr.includes(currentField)) {
            if (currentField === 'cardNumber') {
              setCardNumber('');
            } else if (currentField === 'sortCode') {
              setSortCode('');
            } else if (currentField === 'CVC') {
              setCVC('');
            } else if (currentField === 'expiresAt') {
              setExpiresAt('');
            }
          }
        });  
        setActiveFields3Unfiltered(inputedFields)
        setActiveFields3(arr)    
      }
      }

    async function update(){     
    let billing = context.data.database.billing
    console.log(billing)
    Object.entries(billing).forEach(([key, value], index) => {
      if (activeFields1.includes('name')) {
        value.name = name;
      }
      if (activeFields1.includes('shippingPostCode')) {
        value.shippingPostCode = shippingPostCode;
      }
      if (activeFields1.includes('shippingAddressLine1')) {
        value.shippingAddressLine1 = shippingAddressLine1;
      }
      if (activeFields1.includes('shippingAddressLine2')) {
        value.shippingAddressLine2 = shippingAddressLine2;
      }
      if (activeFields2.includes('billingPostCode')) {
        value.billingPostCode = billingPostCode;
      }
      if (activeFields2.includes('billingAddressLine1')) {
        value.billingAddressLine1 = billingAddressLine1;
      }
      if (activeFields2.includes('billingAddressLine2')) {
        value.billingAddressLine2 = billingAddressLine2;
      }
      if (activeFields3.includes('cardNumber')) {
        value.cardNumber = cardNumber;
      }
      if (activeFields3.includes('sortCode')) {
        value.sortCode = sortCode;
      }
      if (activeFields3.includes('CVC')) {
        value.CVC = CVC;
      }
      if (activeFields3.includes('expiresAt')) {
        value.expiresAt = expiresAt;
      }
      if(activeFields1.length > 0 || activeFields2.length > 0 || activeFields3.length > 0) value.billingSameAs = false
    });    
    console.log(billing)
      const updatedDatabase = { ...context.data.database, billing: billing };
      context.updateData({database: updatedDatabase });
      exit()
    }

    function exit(){
      setOpen(false)
      setName('')
      setShippingAddressLine1('')
      setShippingAddressLine2('');
      setShippingPostCode('');
      setBillingAddressLine1('')
      setBillingAddressLine2('');
      setBillingPostCode('');
      setCardNumber('')
      setSortCode('');
      setExpiresAt('');
      setCVC('');
      setActiveFields1([])
      setActiveFields2([])
      setActiveFields3([])
    }

    return (
      <Modal
      open={isOpen}
      onClose={() => exit()}
      aria-labelledby="Update Billing Profiles"
      aria-describedby="Update Billing Profiles"
    >            
      <div style={styles.content}>

        <div style={styles.title}>
          <h1>Update Billing Profiles</h1>
        </div>

{page === 1 ? <>
        <div style={styles.dropDownContainer}>
            <p>Section 1 Fields</p>
            <Select
              name="Fields"
              options={fields1}
              isMulti
              isClearable={true}
              onChange={(e) => formatFields(e)}
              styles={styles.dropDown}
              value={activeFields1Unfiltered}
            />
        </div>


{activeFields1.includes('name') && 
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
}

{activeFields1.includes('shippingAddressLine1') && 
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
}

{activeFields1.includes('shippingAddressLine2') && 
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
}

{activeFields1.includes('shippingPostCode') && 
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
}
</>: page === 2 ? <>

<div style={styles.dropDownContainer}>
<p>Section 2 Fields</p>
<Select
  name="Fields"
  options={fields2}
  isMulti
  isClearable={true}
  onChange={(e) => formatFields(e)}
  styles={styles.dropDown}
  value={activeFields2Unfiltered}
/>
</div>

{activeFields2.includes('billingAddressLine1') && 
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
}

{activeFields2.includes('billingAddressLine2') && 
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
}

{activeFields2.includes('billingPostCode') && 
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
}
</>:<>

<div style={styles.dropDownContainer}>
<p>Section 3 Fields</p>
<Select
  name="Fields"
  options={fields3}
  isMulti
  isClearable={true}
  onChange={(e) => formatFields(e)}
  styles={styles.dropDown}
  value={activeFields3Unfiltered}
/>
</div>

{activeFields3.includes('cardNumber') && 
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
}

{activeFields3.includes('sortCode') &&

<div style={styles.inputContainer}>
  <p>Sort Code:</p>
  <Input
    value={sortCode}
    disableUnderline={true}
    onChange={(event) => setSortCode(event.target.value)}
    id="sortCode"
    sx={styles.textInput}
    placeholder="Enter Sort Code"
  />
</div>}

{activeFields3.includes('expiresAt') &&
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
</div>}

{activeFields3.includes('CVC') && 
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
</div>}
</>
  }

      <div style={styles.submitButtons}>
        {page == 1 ? 
        <Button variant="contained" size="large" style={styles.addButton}  disableElevation onClick={() =>  setPage((prev) => prev + 1)}>
          Next
        </Button> 
        : page === 2 ? 
        <>  
        <Button variant="contained" size="large" style={styles.addButton}  disableElevation onClick={() =>  setPage((prev) => prev - 1)}>
          Back
        </Button>
        <Button variant="contained" size="large" style={styles.addButton}  disableElevation onClick={() =>  setPage((prev) => prev + 1)}>
         Next
        </Button>
        </>
        : 
        <>  
        <Button variant="contained" size="large" style={styles.addButton}  disableElevation onClick={() => setPage((prev) => prev - 1)}>
          Back
        </Button>
          <Button variant="contained" size="large" style={styles.addButton}  disableElevation onClick={() => update()}>
          Update Billing Profiles
        </Button>
        </>
        }

          <Button variant="outlined" style={styles.cancelButton} size="medium"  disableElevation onClick={() => exit()}>
            Cancel
          </Button>      
        </div>

        </div>

        </Modal>
    );
  }


  export default BulkUpdateBilling;
  