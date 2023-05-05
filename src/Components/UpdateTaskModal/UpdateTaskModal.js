import React, {useContext, useState, useEffect} from "react";
import styles from './styles'

import {Context} from '../../App'

import { Input, Modal, Button  } from "@mui/material";
import Select from "react-select";

import { amazon, kill } from "../../helpers/ScriptRunner";

  function UpdateAllTaskModal({setOpen, isOpen, taskGroupId, taskId}) {

    const context = useContext(Context)

    const [proxy, setProxy] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [url, setURL] = useState('');
    const [accounts, setAccounts] = useState([]);
    const [account, setAccount] = useState([]);
    const [billing, setBilling] = useState([]);
    const [billings, setBillings] = useState([]);
    const [proxies, setProxies] = useState([]);

 
 useEffect(() => {
  if(!taskId) return
  setProxy(context.data.database.taskGroups[taskGroupId].tasks[taskId].proxy)
  setMaxPrice(context.data.database.taskGroups[taskGroupId].tasks[taskId].maxPrice)
  setURL(context.data.database.taskGroups[taskGroupId].tasks[taskId].url)
  setAccount(context.data.database.taskGroups[taskGroupId].tasks[taskId].account)
  setBilling(context.data.database.taskGroups[taskGroupId].tasks[taskId].billing)

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


    async function update(start){
      
      let taskGroups = context.data.database.taskGroups

      if(taskGroups[taskGroupId].tasks[taskId].pythonPID !== false){
          kill(taskGroups[taskGroupId].tasks[taskId].pythonPID)
      }

      taskGroups[taskGroupId].tasks[taskId].url = url
      taskGroups[taskGroupId].tasks[taskId].proxy = proxy
      taskGroups[taskGroupId].tasks[taskId].maxPrice = maxPrice
      taskGroups[taskGroupId].tasks[taskId].billing = billing
      taskGroups[taskGroupId].tasks[taskId].account = account
      taskGroups[taskGroupId].tasks[taskId].pythonPID = false
      taskGroups[taskGroupId].tasks[taskId].notifications = []

      if(start){
          const pythonPID = await amazon(taskId, taskGroups[taskGroupId].tasks[taskId], context, taskGroupId);
          taskGroups[taskGroupId].tasks[taskId].pythonPID = pythonPID;
      }             
      
      const updatedDatabase = { ...context.data.database, taskGroups: taskGroups };
      context.updateData({database: updatedDatabase });
      exit()
    }

    function exit(){
      setOpen(false)
      setMaxPrice('');
      setURL('');
      setAccount([])
      setProxy([])
      setBilling([])
    }

    return (
      <Modal
      open={isOpen}
      onClose={() => exit()}
      aria-labelledby="Update Task"
      aria-describedby="Update Task"
    >
        <div style={styles.content}>

        <div style={styles.title}>
          <h1>Update Task</h1>
        </div>

        <div style={styles.inputContainer}>
            <p>Accounts</p>
            <Select
              name="Accounts"
              options={accounts}
              onChange={(e) => setAccount(e)}
              styles={styles.dropDown}
              value={account}
            />
        </div>
          
          <div style={styles.inputContainer}>
          <p>Billing Profile</p>
          <Select
              name="Billing Profile"
              options={billings}
              onChange={(e) => setBilling(e)}
              styles={styles.dropDown}
              value={billing}
            />
          </div>

          <div style={styles.inputContainer}>
          <p>Proxy</p>
          <Select
              name="Proxy"
              options={proxies}
              onChange={(e) => setProxy(e)}
              styles={styles.dropDown}
              value={proxy}
            />
          </div>

        <div style={styles.inputContainer}>
          <p>Item url:</p>
          <Input value={url} disableUnderline={true} onChange={(event) => setURL(event.target.value)} id="url" style={styles.textInput} placeholder="Enter item URL"/>
        </div>

        <div  style={styles.inputContainer}>
          <p>Max overall:</p>
          <Input value={maxPrice} disableUnderline={true} onChange={(event) => setMaxPrice(event.target.value)} id="maxPrice" style={styles.textInput} placeholder="Enter max price"/>
        </div>

        <div style={styles.submitButtons}>
        <Button variant="contained" size="large" style={styles.addButton}  disableElevation onClick={() => update(false)}>
          Update Task
        </Button>
          <Button variant="contained" size="large" style={styles.addButton}  disableElevation onClick={() => update(true)}>
          Update Task And Start
        </Button>
        <Button variant="outlined" style={styles.cancelButton} size="medium"  disableElevation onClick={() => exit()}>
          Cancel
        </Button>     
        </div>
        </div>
    </Modal>
    );
  }
  
  export default UpdateAllTaskModal;
  