import React, {useContext, useEffect, useState} from "react";
import styles from './styles'

import {Context} from '../../App'
import { Input, Modal, Button } from "@mui/material";
import Select from "react-select";

  function UpdateAccountModal({setOpen, isOpen}) {

    const context = useContext(Context)

    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [activeFields, setActiveFields] = useState([]);

    const fields = [{value: 'name', label: 'Name'}, {value: 'username', label: 'Username'}, {value: 'password', label: 'Password'}]

    function formatFields(inputedFields){
    let arr = []

    inputedFields.forEach((field) => {
        arr.push(field.value)
    })

    activeFields.forEach((currentField) =>{
        if(!arr.includes(currentField)){
            if(currentField == 'username') setUsername('')
            if(currentField == 'password') setPassword('')
            if(currentField == 'name') setName('')
        }
    })

    setActiveFields(arr)
    }

    async function update(){
      
    let accounts = context.data.database.accounts

    Object.entries(accounts).forEach(([key, value], index) => {
        if(activeFields.includes('name')) value.name = name
        if(activeFields.includes('username')) value.username = username;
        if(activeFields.includes('password')) value.password = password;
      });
      
    const updatedDatabase = { ...context.data.database, accounts: accounts };
    context.updateData({database: updatedDatabase });
    exit()
    }

    function exit(){
      setOpen(false)
      setName('')
      setUsername('');
      setPassword('');
      setActiveFields([])
    }

    return (
      <Modal
        open={isOpen}
        onClose={() => exit()}
        aria-labelledby="Update Accounts"
        aria-describedby="Update Accounts"
      >
      <div style={styles.content}>

        <div style={styles.title}>
          <h1>Update Accounts</h1>
        </div>

        <div style={styles.dropDownContainer}>
            <p>Fields</p>
            <Select
              name="Fields"
              options={fields}
              isMulti
              isClearable={true}
              onChange={(e) => formatFields(e)}
              styles={styles.dropDown}
            />
        </div>
 
        {activeFields.includes('name') && 
        <div style={styles.inputContainer}>
        <p>Account Name:</p>
        <Input value={name} disableUnderline={true} onChange={(event) => setName(event.target.value)} id="name" sx={styles.textInput} placeholder="Enter Account Name"/>
        </div>
  }
          {activeFields.includes('username') && 
        <div style={styles.inputContainer}>
            <p>Username:</p>
          <Input value={username} onChange={(event) => setUsername(event.target.value)} sx={styles.textInput} disableUnderline={true} placeholder="Enter Username" id="username" />
        </div>
  }

{activeFields.includes('password') && 
        <div style={styles.inputContainer}>
        <p>Password:</p>
        <Input value={password} onChange={(event) => setPassword(event.target.value)} id="Password" sx={styles.textInput} disableUnderline={true} placeholder="Enter Password"/>
        </div>
  }

        <div style={styles.submitButtons}>

        <Button variant="contained" size="large" style={styles.updateButton}  disableElevation onClick={() => update()}>
          Update Accounts
        </Button>

        <Button variant="outlined" style={styles.cancelButton} size="medium"  disableElevation onClick={() => exit()}>
          Cancel
        </Button>         

        </div>
        </div>
        </Modal>
    );
  }
  
  export default UpdateAccountModal;
  