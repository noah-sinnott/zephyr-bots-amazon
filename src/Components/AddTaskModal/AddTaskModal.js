import React, {useContext, useEffect, useState} from "react";
import styles from './styles'

import {Context} from '../../App'

import { Input, Modal, Button  } from "@mui/material";

import { amazon } from "../../helpers/ScriptRunner";
import { generateId } from '../../helpers/generateId'
import Select from "react-select";

  function AddTaskModal({setOpen, isOpen, taskGroupId}) {

    const context = useContext(Context)

    const [proxy, setProxy] = useState({ label: "None", value: false});
    const [quantity, setQuantity] = useState(1);
    const [maxPrice, setMaxPrice] = useState('');
    const [url, setURL] = useState('');
    const [accounts, setAccounts] = useState([]);
    const [account, setAccount] = useState([]);
    const [billing, setBilling] = useState([]);
    const [billings, setBillings] = useState([]);
    const [proxies, setProxies] = useState([]);

  useEffect(() => {
    let accountsTemp = []
    let billingsTemp = []
    let proxiesTemp = [{ value: false, label: 'None' }]
    Object.entries(context.data.database.accounts).forEach(([key, value]) => {
      accountsTemp.push({value: key, label: value.name})
    })
    Object.entries(context.data.database.billing).forEach(([key, value]) => {
      billingsTemp.push({value: key, label: value.name})
    })
    Object.entries(context.data.database.proxyGroups).forEach(([key, value]) => {
      proxiesTemp.push({value: key, label: value.name})
    })
    setAccounts(accountsTemp)
    setBillings(billingsTemp)
    setProxies(proxiesTemp)
  }, [isOpen])

  
  async function AddTask(start) {
    let taskgroups = context.data.database.taskGroups;
  
    for (let i = 0; i < quantity; i++) {
      let id = generateId();
      let newTask = {
        type: "amazon",
        url: url,
        proxy: proxy.value,
        maxPrice: maxPrice,
        notifications: [],
        pythonPID: false,
        account: account.value,
        billing: billing.value,
      };
      if (start) {
        let pythonPID = await amazon(id, newTask, context, taskGroupId)
        newTask.pythonPID = pythonPID;
        taskgroups[taskGroupId].tasks[id] = newTask;       
      } else {
        taskgroups[taskGroupId].tasks[id] = newTask;
      }
    }
    
    const updatedDatabase = { ...context.data.database, taskGroups: taskgroups };
    context.updateData({ database: updatedDatabase });
  
    exit();
  }

    function exit(){
      setOpen(false)
      setQuantity(1);
      setMaxPrice('');
      setURL('');
      setAccount([])
      setProxy({ label: "None", value: false})
      setBilling([])
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
          <p>Proxy</p>
          <Select
              name="Proxy"
              options={proxies}
              onChange={(e) => setProxy(e)}
              styles={styles.dropDown}
              defaultValue={{ label: "None", value: false}}
            />
          </div>

        <div style={styles.inputContainer}>
          <p>Item url:</p>
          <Input value={url} disableUnderline={true} onChange={(event) => setURL(event.target.value)} id="url" style={styles.textInput} placeholder="Enter item URL"/>
        </div>

        <div  style={styles.inputContainer}>
          <p>Max overall price:</p>
          <Input value={maxPrice} disableUnderline={true} onChange={(event) => setMaxPrice(event.target.value)} id="maxPrice" style={styles.textInput} placeholder="Enter max price"/>
        </div>

        <div  style={styles.inputContainer}>
          <p>Task Quantity:</p>
          <Input value={quantity} 
          disableUnderline={true}   
          onChange={(event) => {
              const value = parseInt(event.target.value);
              if (value >= 1) {  
                setQuantity(value);
              }
            }} 
         id="quantity" style={styles.textInput} 
         placeholder="Enter Task Quantity"/>
      </div>
 


        <div style={styles.submitButtons}>
        <Button variant="contained" size="large" style={styles.addButton}  disableElevation onClick={() => AddTask(false)}>
          Add {quantity > 1 ? 'Tasks' : 'Task'}
        </Button>
          <Button variant="contained" size="large" style={styles.addButton}  disableElevation onClick={() => AddTask(true)}>
          Add {quantity > 1 ? 'Tasks' : 'Task'} And Start
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
  