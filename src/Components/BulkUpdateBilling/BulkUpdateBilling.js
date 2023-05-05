import React, {useContext, useState} from "react";
import styles from './styles'
import {Context} from '../../App'
import { Input, Modal, Button } from "@mui/material";
import Select from "react-select";
import ConfirmationDialog from "../ConfirmationDialog/ConfirmationDialog";
import { kill } from "../../helpers/ScriptRunner";
  function BulkUpdateBilling({setOpen, isOpen}) {

    const context = useContext(Context)

    const [editBillingProfilesDialog, setEditBillingProfilesDialog] = useState(false);

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
    let taskGroups = context.data.database.taskGroups

    if(activeFields1.length > 0 || activeFields2.length > 0 || activeFields3.length > 0){
      Object.entries(taskGroups).forEach(([key, taskGroup]) => {
      Object.entries(taskGroup.tasks).forEach(([key, task]) => {
        if(task.pythonPID !== false){
            kill(task.pythonPID)
            task.pythonPID = false
            task.notifications = []
        }
      })
    })
  }

    Object.entries(billing).forEach(([key, value], index) => {
      let updatedValue = {
        ...value,
        name: activeFields1.includes('name') ? name : value.name,
        shippingPostCode: activeFields1.includes('shippingPostCode') ? shippingPostCode : value.shippingPostCode,
        shippingAddressLine1: activeFields1.includes('shippingAddressLine1') ? shippingAddressLine1 : value.shippingAddressLine1,
        shippingAddressLine2: activeFields1.includes('shippingAddressLine2') ? shippingAddressLine2 : value.shippingAddressLine2,
        billingPostCode: activeFields2.includes('billingPostCode') ? billingPostCode : value.billingPostCode,
        billingAddressLine1: activeFields2.includes('billingAddressLine1') ? billingAddressLine1 : value.billingAddressLine1,
        billingAddressLine2: activeFields2.includes('billingAddressLine2') ? billingAddressLine2 : value.billingAddressLine2,
        cardNumber: activeFields3.includes('cardNumber') ? cardNumber : value.cardNumber,
        sortCode: activeFields3.includes('sortCode') ? sortCode : value.sortCode,
        CVC: activeFields3.includes('CVC') ? CVC : value.CVC,
        expiresAt: activeFields3.includes('expiresAt') ? expiresAt : value.expiresAt,
        billingSameAs: activeFields1.length > 0 || activeFields2.length > 0 || activeFields3.length > 0 ? false : value.billingSameAs,
      };
      billing[key] = updatedValue
    })

      const updatedDatabase = { ...context.data.database, billing: billing, taskGroups: taskGroups };
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
      <>
      <ConfirmationDialog isOpen={editBillingProfilesDialog} setOpen={setEditBillingProfilesDialog} submit={() => update()} mainText2={'This will stop any running tasks with these billing profiles'} submitText={'Update Billing Profiles'} mainText={'Confirm you want to update these billing profiles'}/>
      
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
          <Button variant="contained" size="large" style={styles.addButton}  disableElevation onClick={() => setEditBillingProfilesDialog(true)}>
          Update Billing Profiles
        </Button>
        </>
        }

          <Button variant="outlined" style={styles.cancelButton} size="medium"  disableElevation onClick={() => exit()}>
            Cancel
          </Button>      
        </div>

        </div>

        </Modal></>
    );
  }


  export default BulkUpdateBilling;
  