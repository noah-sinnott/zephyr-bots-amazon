import React, {useContext, useState} from "react";
import styles from './styles'

import {Context} from '../../App'
import { Input, Modal, Button } from "@mui/material";


  function UpdateAccountsModal({setOpen, isOpen, accountId}) {

    const context = useContext(Context)

    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    async function update(){
      
    let accounts = context.data.database.accounts

    if(accountId){
      if(name != '') accounts[accountId].Name = name
      if(username != '') accounts[accountId].Username = username
      if(password != '') accounts[accountId].Password = password
    } else {
      await Object.entries(accounts).map(([key, value]) => {
        if(username != '') value.Username = username
        if(password != '') value.Password = password
      })
    }
      const updatedDatabase = { ...context.data.database, accounts: accounts };
      context.updateData({database: updatedDatabase });
      exit()
    }

    function exit(){
      setOpen(false)
      setName('')
      setUsername('');
      setPassword('');
    }

    return (
      <Modal
        open={isOpen}
        onClose={() => exit()}
        aria-labelledby="Add Account"
        aria-describedby="Add Account"
      >
      <div style={styles.content}>

        <div style={styles.title}>
          <h1>Update Account</h1>
        </div>

 
        <div style={styles.inputContainer}>
        <p>Account Name:</p>
        <Input value={name} disableUnderline={true} onChange={(event) => setName(event.target.value)} id="name" sx={styles.textInput} placeholder="Enter Account Name"/>
        </div>

        <div style={styles.inputContainer}>
            <p>Username:</p>
          <Input value={username} onChange={(event) => setUsername(event.target.value)} sx={styles.textInput} disableUnderline={true} placeholder="Enter Username" id="username" />
        </div>
     
      <div style={styles.inputContainer}>
      <p>Password:</p>
      <Input value={password} onChange={(event) => setPassword(event.target.value)} id="Password" sx={styles.textInput} disableUnderline={true} placeholder="Enter Password"/>
      </div>

        <div style={styles.submitButtons}>

        <Button variant="contained" size="large" style={styles.updateButton}  disableElevation onClick={() => update()}>
          Update Account
        </Button>

        <Button variant="outlined" style={styles.cancelButton} size="medium"  disableElevation onClick={() => exit()}>
          Cancel
        </Button>         

        </div>
        </div>
        </Modal>
    );
  }
  
  export default UpdateAccountsModal;
  