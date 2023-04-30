import React, {useContext, useState} from "react";
import styles from './styles'

import {Context} from '../../App'

import { Input, Modal, Button  } from "@mui/material";
import Select from "react-select";

import { amazon, kill } from "../../helpers/ScriptRunner";

  function UpdateAllTasksModal({setOpen, isOpen, taskGroupId, taskId}) {

    const context = useContext(Context)

    const [endpoint, setEndpoint] = useState('');
    const [proxy, setProxy] = useState('');
    const [quantity, setQuantity] = useState('');
    const [refreshRate, setRefreshRate] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [url, setURL] = useState('');

    
   const endpoints = [{ value: 'Item Page', label: 'Item Page' },
   { value: 'Login Page', label: 'Login Page' },
   { value: 'Shipping Page', label: 'Shipping Page' },
   { value: 'Checkout Page', label: 'Checkout Page' },
   { value: 'Success Page', label: 'Success Page' },
 ]

 const proxys = [{ value: 'None', label: 'None' }]

    async function update(start){
      
      let taskGroups = context.data.database.taskGroups

      if(taskId){
        if(taskGroups[taskGroupId].tasks[taskId].pythonPID !== false){
          kill(taskGroups[taskGroupId].tasks[taskId].pythonPID)
        }
        if(url != '') taskGroups[taskGroupId].tasks[taskId].url = url
        if(endpoint != '') taskGroups[taskGroupId].tasks[taskId].endpoint = endpoint
        if(proxy != '') taskGroups[taskGroupId].tasks[taskId].proxy = proxy
        if(quantity != '') taskGroups[taskGroupId].tasks[taskId].quantity = quantity
        if(refreshRate != '') taskGroups[taskGroupId].tasks[taskId].refreshRate = refreshRate
        if(maxPrice != '') taskGroups[taskGroupId].tasks[taskId].maxPrice = maxPrice
      } else {
        Object.entries(context.data.database.taskGroups[taskGroupId].tasks).map(([key, value]) => {
        if(value.pythonPID !== false){
          kill(value.pythonPID)
        }
      });
     await Object.entries(taskGroups[taskGroupId].tasks).map(([key, value]) => {
        if(url != '') value.url = url
        if(endpoint != '') value.endpoint = endpoint
        if(proxy != '') value.proxy = proxy
        if(quantity != '') value.quantity = quantity
        if(refreshRate != '') value.refreshRate = refreshRate
        if(maxPrice != '') value.maxPrice = maxPrice
      })
      }
      

      if(start){

        if(taskId){
          const pythonPID = await amazon(taskId, taskGroups[taskGroupId].tasks[taskId], context, taskGroupId);
          taskGroups[taskGroupId].tasks[taskId].pythonPID = pythonPID;
        } else {
          for (const [key, value] of Object.entries(taskGroups[taskGroupId].tasks)) {
          const pythonPID = await amazon(key, value, context, taskGroupId);
          taskGroups[taskGroupId].tasks[key].pythonPID = pythonPID;
           }  
        }
      }             
      
      const updatedDatabase = { ...context.data.database, taskGroups: taskGroups };
      context.updateData({database: updatedDatabase });
      exit()
    }

    function exit(){
      setOpen(false)
      setEndpoint('');
      setProxy('');
      setQuantity('');
      setRefreshRate('');
      setMaxPrice('');
      setURL('');
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
            <p>End At</p>
            <Select
              name="Ends At"
              options={endpoints}
              onChange={(e) => setEndpoint(e.value)}
              styles={styles.dropDown}
              defaultValue={{ label: "Item Page", value: 'Item Page' }}
            />
        </div>
          
          <div style={styles.inputContainer}>
          <p>Proxy</p>
          <Select
              name="Proxy"
              options={proxys}
              onChange={(e) => setProxy(e.value)}
              styles={styles.dropDown}
              defaultValue={{ label: "None", value: 'None'}}
            />
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
  
  export default UpdateAllTasksModal;
  