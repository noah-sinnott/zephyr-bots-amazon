import React, {useContext, useEffect, useState} from "react";
import styles from './styles'

import {Context} from '../../App'

import { Input, Modal, Button  } from "@mui/material";

import { amazon } from "../../helpers/ScriptRunner";
import { generateId } from '../../helpers/generateId'
import Select from "react-select";

  function AddTaskModal({setOpen, isOpen, taskGroupId}) {

    const context = useContext(Context)

    const [endpoint, setEndpoint] = useState({ label: "Item Page", value: 'Item Page' });
    const [proxy, setProxy] = useState({ label: "None", value: false});
    const [quantity, setQuantity] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [url, setURL] = useState('');
    const [refreshRate, setRefreshRate] = useState('');
    const [accounts, setAccounts] = useState([]);
    const [account, setAccount] = useState([]);
    const [billing, setBilling] = useState([]);
    const [billings, setBillings] = useState([]);
    const [proxies, setProxies] = useState([]);

   const endpoints = [{ value: 'Item Page', label: 'Item Page' },
    { value: 'Login Page', label: 'Login Page' },
    { value: 'Shipping Page', label: 'Shipping Page' },
    { value: 'Checkout Page', label: 'Checkout Page' },
    { value: 'Success Page', label: 'Success Page' },
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
    setBillings(billingsTemp)
    setProxies(proxiesTemp)
  }, [isOpen])

    async function AddTask(start){
    
      let id = generateId()

      let newTask = {
        type: 'amazon',
        url: url,
        proxy: proxy,
        endpoint: endpoint,
        quantity: quantity,
        maxPrice: maxPrice,
        refreshRate: refreshRate,
        notifications: [],
        pythonPID: false,
        account: account,
        billing: billing
      }

      if(start){
        const pythonPID = await amazon(newTask, context, taskGroupId);     
        newTask.pythonPID = pythonPID
      } 

        let taskgroups = context.data.database.taskGroups
        taskgroups[taskGroupId].tasks[id] = newTask
  
        const updatedDatabase = { ...context.data.database, taskGroups: taskgroups };
        context.updateData({database: updatedDatabase });
      
      exit()
    }

    function exit(){
      setOpen(false)
      setQuantity('');
      setRefreshRate('');
      setMaxPrice('');
      setURL('');
      setAccount([])
      setProxy({ label: "None", value: false})
      setBilling([])
      setEndpoint({ label: "Item Page", value: 'Item Page' })
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
          <h1>Add Task</h1>
        </div>

        <div  style={styles.inputContainer}>
            <p>Account</p>
            <Select
              name="Accounts"
              options={accounts}
              onChange={(e) => setAccount(e)}
              styles={styles.dropDown}
            />
        </div>
          
          <div style={styles.inputContainer}>
          <p>Billing Profile</p>
          <Select
              name="Billing Profiles"
              options={billings}
              onChange={(e) => setBilling(e)}
              styles={styles.dropDown}
            />
          </div>

        <div style={styles.inputContainer}>
          <p>Item url:</p>
          <Input value={url} disableUnderline={true} onChange={(event) => setURL(event.target.value)} id="url" style={styles.textInput} placeholder="Enter item URL"/>
        </div>

        <div  style={styles.inputContainer}>
          <p>Max overall price including shipping and tax:</p>
          <Input value={maxPrice} disableUnderline={true} onChange={(event) => setMaxPrice(event.target.value)} id="maxPrice" style={styles.textInput} placeholder="Enter max price"/>
        </div>

        <div  style={styles.inputContainer}>
          <p>Quantity:</p>
          <Input value={quantity} disableUnderline={true} onChange={(event) => setQuantity(event.target.value)} id="quantity" style={styles.textInput} placeholder="Enter quantity"/>
        </div>

        <div  style={styles.inputContainer}>
          <p>Refresh Rate:</p>
          <Input value={refreshRate} disableUnderline={true} onChange={(event) => setRefreshRate(event.target.value)} id="refreshRate" style={styles.textInput} placeholder="Enter Refresh Rate"/>
        </div>

        <div  style={styles.inputContainer}>
            <p>End At</p>
            <Select
              name="Ends At"
              options={endpoints}
              onChange={(e) => setEndpoint(e)}
              styles={styles.dropDown}
              value={{ label: "Item Page", value: 'Item Page' }}
            />
        </div>
          
          <div style={styles.inputContainer}>
          <p>Proxy</p>
          <Select
              name="Proxy"
              options={proxies}
              onChange={(e) => setProxy(e)}
              styles={styles.dropDown}
              value={{ label: "None", value: false}}
            />
          </div>

        <div style={styles.submitButtons}>
        <Button variant="contained" size="large" style={styles.addButton}  disableElevation onClick={() => AddTask(false)}>
          Add Task
        </Button>
          <Button variant="contained" size="large" style={styles.addButton}  disableElevation onClick={() => AddTask(true)}>
          Add Task And Start
        </Button>
        <Button variant="outlined" style={styles.cancelButton} size="medium"  disableElevation onClick={() => exit()}>
          Cancel
        </Button>     
        </div>
        </div>
    </Modal>
    );
  }
  
  export default AddTaskModal;
  