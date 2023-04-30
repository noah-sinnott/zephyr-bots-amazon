import React, {useContext, useState, useEffect} from "react";
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

 useEffect(()=>{
  if(!taskId) return
  console.log(context.data.database.taskGroups[taskGroupId].tasks[taskId].endpoint)
  setEndpoint(context.data.database.taskGroups[taskGroupId].tasks[taskId].endpoint)
  setProxy(context.data.database.taskGroups[taskGroupId].tasks[taskId].proxy)
  setQuantity(context.data.database.taskGroups[taskGroupId].tasks[taskId].quantity)
  setRefreshRate(context.data.database.taskGroups[taskGroupId].tasks[taskId].refreshRate)
  setMaxPrice(context.data.database.taskGroups[taskGroupId].tasks[taskId].maxPrice)
  setURL(context.data.database.taskGroups[taskGroupId].tasks[taskId].url)
},[taskId])

    async function update(start){
      
      let taskGroups = context.data.database.taskGroups

      if(taskGroups[taskGroupId].tasks[taskId].pythonPID !== false){
          kill(taskGroups[taskGroupId].tasks[taskId].pythonPID)
      }

      taskGroups[taskGroupId].tasks[taskId].url = url
      taskGroups[taskGroupId].tasks[taskId].endpoint = endpoint
      taskGroups[taskGroupId].tasks[taskId].proxy = proxy
      taskGroups[taskGroupId].tasks[taskId].quantity = quantity
      taskGroups[taskGroupId].tasks[taskId].refreshRate = refreshRate
      taskGroups[taskGroupId].tasks[taskId].maxPrice = maxPrice
      
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
              onChange={(e) => setEndpoint(e)}
              styles={styles.dropDown}
              value={endpoint}
            />
        </div>
          
          <div style={styles.inputContainer}>
          <p>Proxy</p>
          <Select
              name="Proxy"
              options={proxys}
              onChange={(e) => setProxy(e)}
              styles={styles.dropDown}
              value={proxy}
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
  