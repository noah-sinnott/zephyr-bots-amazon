import React, {useContext, useState} from "react";
import styles from './styles'

import {Context} from '../../App'

import { Input, Modal, Button  } from "@mui/material";

import { amazon } from "../../helpers/ScriptRunner";
import { generateId } from '../../helpers/generateId'
import Select from "react-select";

  function AddTaskModal({setOpen, isOpen, taskGroupId}) {

    const context = useContext(Context)

    const [endpoint, setEndpoint] = useState('Item Page');
    const [proxy, setProxy] = useState('None');
    const [quantity, setQuantity] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [url, setURL] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

   const endpoints = [{ value: 'Item Page', label: 'Item Page' },
    { value: 'Login Page', label: 'Login Page' },
    { value: 'Shipping Page', label: 'Shipping Page' },
    { value: 'Checkout Page', label: 'Checkout Page' },
    { value: 'Success Page', label: 'Success Page' },
  ]

  const proxys = [{ value: 'None', label: 'None' }]

    async function AddTask(start){
    
      let id = generateId()

      let newTask = {
        type: 'amazon',
        email: email,
        password: password,
        url: url,
        proxy: false,
        accountPool :false,
        endpoint: endpoint,
        quantity: quantity,
        maxPrice: maxPrice,
        notifications: [],
        pythonPID: false,
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
      setEndpoint('Item page');
      setProxy('None');
      setQuantity('');
      setMaxPrice('');
      setURL('');
      setEmail('');
      setPassword('');
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
  