import React, {useContext, useState, useEffect} from "react";
import styles from './styles'

import {Context} from '../../App'

import { Input, Modal, Button  } from "@mui/material";
import Select from "react-select";

import { amazon, kill } from "../../helpers/ScriptRunner";
import ConfirmationDialog from "../ConfirmationDialog/ConfirmationDialog";

  function BulkUpdateTasks({setOpen, isOpen, taskGroupId}) {

    const context = useContext(Context)

    const [proxy, setProxy] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [url, setURL] = useState('');
    const [accounts, setAccounts] = useState([]);
    const [account, setAccount] = useState([]);
    const [billing, setBilling] = useState([]);
    const [billings, setBillings] = useState([]);
    const [proxies, setProxies] = useState([]);
    const [activeFields, setActiveFields] = useState([]);
    const [editTasksDialog, setEditTasksDialog] = useState(false)

 const fields = [{value: 'account', label: 'Account'},
 {value: 'billingProfile', label: 'Billing Profile'},
 {value: 'proxies', label: 'Proxies'},
  {value: 'maxPrice', label: 'Max Price'},
  {value: 'url', label: 'URL'},
]

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
          if(currentField === 'account') setAccount([])
          if(currentField === 'billingProfile') setBilling([])
          if(currentField === 'proxies') setProxy([])
          if(currentField === 'maxPrice') setMaxPrice('')
          if(currentField === 'url') setURL('')
      }
  })
  setActiveFields(arr)
  }

  async function update(start) {

  let taskGroups = context.data.database.taskGroups;
  
      Object.entries(taskGroups[taskGroupId].tasks).map(
        async ([key, value], index) => {

          let updatedValue = {
            ...value,
            account: activeFields.includes('account') ? account.value : value.account,
            billingProfile: activeFields.includes('billingProfile') ? billing.value : value.billingProfile,
            proxies: activeFields.includes('proxies') ? proxy.value : value.proxies,
            url: activeFields.includes('url') ? url : value.url,
            maxPrice: activeFields.includes('maxPrice') ? maxPrice : value.maxPrice,
          };

          if(JSON.stringify(value) !== JSON.stringify(updatedValue)){
            if (updatedValue.pythonPID !== false) {
              kill(updatedValue.pythonPID)
              updatedValue.notifications = []
              updatedValue.pythonPID = false
            };
          }
          if (start) {
            if (updatedValue.pythonPID !== false) {
              kill(updatedValue.pythonPID)
            };
            const pythonPID = await amazon(
              key,
              updatedValue,
              context,
              taskGroupId
            );
            updatedValue.pythonPID = pythonPID;
          }
          taskGroups[taskGroupId].tasks[key] = updatedValue;
        }
      )

        
    const updatedDatabase = {
      ...context.data.database,
      taskGroups: taskGroups,
    };
    context.updateData({ database: updatedDatabase });
    exit();
  }
  

    function exit(){
      setOpen(false)
      setMaxPrice('');
      setURL('');
      setAccount([])
      setProxy([])
      setBilling([])
      setActiveFields([])
    }

    return (
      <>
      <ConfirmationDialog isOpen={editTasksDialog} setOpen={setEditTasksDialog} submit={() => update(false)} mainText2={'This will stop any tasks that are affected'} submitText={'Update Tasks'} mainText={'Confirm you want to update these tasks'}/>
      <Modal
      open={isOpen}
      onClose={() => exit()}
      aria-labelledby="Update Tasks"
      aria-describedby="Update Tasks"
    >
        <div style={styles.content}>

        <div style={styles.title}>
          <h1>Update Tasks</h1>
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

      {activeFields.includes('url') && 
        <div style={styles.inputContainer}>
          <p>Item url:</p>
          <Input value={url} disableUnderline={true} onChange={(event) => setURL(event.target.value)} id="url" style={styles.textInput} placeholder="Enter item URL"/>
        </div>}

        {activeFields.includes('maxPrice') && 
        <div  style={styles.inputContainer}>
          <p>Max overall price:</p>
          <Input value={maxPrice} disableUnderline={true} onChange={(event) => setMaxPrice(event.target.value)} id="maxPrice" style={styles.textInput} placeholder="Enter max price"/>
        </div>}
          
        <div style={styles.submitButtons}>
        <Button variant="contained" size="large" style={styles.addButton}  disableElevation onClick={() => setEditTasksDialog(true)}>
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
    </>
    );
  }
  
  export default BulkUpdateTasks;
  