import React, {useContext, useState, useEffect} from "react";
import styles from './styles'

import {Context} from '../../App'

import { Input, Modal, Button  } from "@mui/material";
import Select from "react-select";

import { amazon, kill } from "../../helpers/ScriptRunner";

  function BulkUpdateTasks({setOpen, isOpen, taskGroupId}) {

    const context = useContext(Context)

    const [endpoint, setEndpoint] = useState('');
    const [proxy, setProxy] = useState('');
    const [quantity, setQuantity] = useState('');
    const [refreshRate, setRefreshRate] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [url, setURL] = useState('');
    const [accounts, setAccounts] = useState([]);
    const [account, setAccount] = useState([]);
    const [billing, setBilling] = useState([]);
    const [billings, setBillings] = useState([]);
    const [proxies, setProxies] = useState([]);
    const [activeFields, setActiveFields] = useState([]);

   const endpoints = [{ value: 'Item Page', label: 'Item Page' },
   { value: 'Login Page', label: 'Login Page' },
   { value: 'Shipping Page', label: 'Shipping Page' },
   { value: 'Checkout Page', label: 'Checkout Page' },
   { value: 'Success Page', label: 'Success Page' },
 ]
 
 const fields = [{value: 'account', label: 'Account'},
 {value: 'billingProfile', label: 'Billing Profile'},
 {value: 'proxies', label: 'Proxies'},
  {value: 'endpoint', label: 'Endpoint'},
  {value: 'refreshRate', label: 'Refresh Rate'},
  {value: 'maxPrice', label: 'Max Price'},
  {value: 'url', label: 'URL'},
  {value: 'quantity', label: 'Quantity'}
]

 useEffect(() => {
  let accountsTemp = []
  let billingsTemp = []
  let proxiesTemp = [{ value: false, label: 'None' }]
  Object.entries(context.data.database.accounts).map(([key, value]) => {
    accountsTemp.push({value: key, label: value.name})
  })
  Object.entries(context.data.database.billing).map(([key, value]) => {
    billingsTemp.push({value: key, label: value.name})
  })
  Object.entries(context.data.database.proxyGroups).map(([key, value]) => {
    proxiesTemp.push({value: key, label: value.name})
  })
  setAccounts(accountsTemp)
  setProxies(proxiesTemp)
  setBillings(billingsTemp)
}, [isOpen])



function formatFields(inputedFields){
  let arr = []
  inputedFields.forEach((field) => {
      arr.push(field.value)
  })
  activeFields.forEach((currentField) =>{
      if(!arr.includes(currentField)){
          if(currentField == 'account') setAccount([])
          if(currentField == 'billingProfile') setBilling([])
          if(currentField == 'proxies') setProxy([])
          if(currentField == 'endpoint') setEndpoint([])
          if(currentField == 'refreshRate') setRefreshRate('')
          if(currentField == 'maxPrice') setMaxPrice('')
          if(currentField == 'url') setURL('')
          if(currentField == 'quantity') setQuantity('')

      }
  })
  setActiveFields(arr)
  }

  async function update(start) {

  let taskGroups = context.data.database.taskGroups;
  
    await Promise.all(
      Object.entries(taskGroups[taskGroupId].tasks).map(
        async ([key, value], index) => {
          if (value.pythonPID !== false) kill(value.pythonPID);
          if (activeFields.includes('endpoint')) value.endpoint = endpoint;
          if (activeFields.includes('account')) value.account = account;
          if (activeFields.includes('billingProfile'))value.billingProfile = billing;
          if (activeFields.includes('proxies')) value.proxies = proxies;
          if (activeFields.includes('refreshRate'))value.refreshRate = refreshRate;
          if (activeFields.includes('url')) value.url = url;
          if (activeFields.includes('maxPrice')) value.maxPrice = maxPrice;
          if (activeFields.includes('quantity')) value.quantity = quantity;
          if (start) {
            const pythonPID = await amazon(
              key,
              value,
              context,
              taskGroupId
            );
            value.pythonPID = pythonPID;
          }
        }
      )
    );
  
    const updatedDatabase = {
      ...context.data.database,
      taskGroups: taskGroups,
    };
    context.updateData({ database: updatedDatabase });
    exit();
  }
  

    function exit(){
      setOpen(false)
      setQuantity('');
      setRefreshRate('');
      setMaxPrice('');
      setURL('');
      setAccount([])
      setProxy([])
      setBilling([])
      setEndpoint([])
    }

    return (
      <Modal
      open={isOpen}
      onClose={() => exit()}
      aria-labelledby="Add Task"
      aria-describedby="Add Task"
    >
        <div style={styles.content}>

        <div style={styles.title}>
          <h1>Update Task</h1>
        </div>

        <div style={styles.multiContainer}>
            <p>Fields</p>
            <Select
              name="Fields"
              options={fields}
              isMulti
              isClearable={true}
              onChange={(e) => formatFields(e)}
              styles={styles.multi}
            />
        </div>

        {activeFields.includes('account') && 
        <div style={styles.inputContainer}>
            <p>Accounts</p>
            <Select
              name="Accounts"
              options={accounts}
              onChange={(e) => setAccount(e)}
              styles={styles.dropDown}
              value={account}
            />
        </div>}
          
        {activeFields.includes('billingProfile') && 
          <div style={styles.inputContainer}>
          <p>Billing Profile</p>
          <Select
              name="Billing Profile"
              options={billings}
              onChange={(e) => setBilling(e)}
              styles={styles.dropDown}
              value={billing}
            />
          </div>}

      {activeFields.includes('url') && 
        <div style={styles.inputContainer}>
          <p>Item url:</p>
          <Input value={url} disableUnderline={true} onChange={(event) => setURL(event.target.value)} id="url" style={styles.textInput} placeholder="Enter item URL"/>
        </div>}

        {activeFields.includes('maxPrice') && 
        <div  style={styles.inputContainer}>
          <p>Max overall price including shipping and tax:</p>
          <Input value={maxPrice} disableUnderline={true} onChange={(event) => setMaxPrice(event.target.value)} id="maxPrice" style={styles.textInput} placeholder="Enter max price"/>
        </div>}

        {activeFields.includes('quantity') && 
        <div  style={styles.inputContainer}>
          <p>Quantity:</p>
          <Input value={quantity} disableUnderline={true} onChange={(event) => setQuantity(event.target.value)} id="quantity" style={styles.textInput} placeholder="Enter quantity"/>
        </div>}

        {activeFields.includes('refreshRate') && 
        <div  style={styles.inputContainer}>
          <p>Refresh Rate:</p>
          <Input value={refreshRate} disableUnderline={true} onChange={(event) => setRefreshRate(event.target.value)} id="refreshRate" style={styles.textInput} placeholder="Enter Refresh Rate"/>
        </div>}

        {activeFields.includes('endpoint') && 
        <div  style={styles.inputContainer}>
            <p>End At</p>
            <Select
              name="Ends At"
              options={endpoints}
              onChange={(e) => setEndpoint(e)}
              styles={styles.dropDown}
              value={endpoint}
            />
        </div>}
          
        {activeFields.includes('proxies') && 
          <div style={styles.inputContainer}>
          <p>Proxy</p>
          <Select
              name="Proxy"
              options={proxies}
              onChange={(e) => setProxy(e)}
              styles={styles.dropDown}
              value={proxy}
            />
          </div>}

        <div style={styles.submitButtons}>
        <Button variant="contained" size="large" style={styles.addButton}  disableElevation onClick={() => update(false)}>
          Update Tasks
        </Button>
          <Button variant="contained" size="large" style={styles.addButton}  disableElevation onClick={() => update(true)}>
          Update Tasks And Start
        </Button>
        <Button variant="outlined" style={styles.cancelButton} size="medium"  disableElevation onClick={() => exit()}>
          Cancel
        </Button>     
        </div>
        </div>
    </Modal>
    );
  }
  
  export default BulkUpdateTasks;
  