import React, {useContext, useState} from "react";
import styles from './styles'
import { Input, Modal, Button } from "@mui/material";

import {Context} from '../../App'

import { generateId } from "../../helpers/generateId";

  function AddAccountModal({setOpen, isOpen}) {

    const context = useContext(Context)

    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    async function addAccount(){
      if(!name || name === "") return
      if(!username || username == "") return
      if(!password|| password == "") return

      let id = generateId()

      let newAccount = {
        name: name,
        username: username,
        password: password,
      }
      
      let database = context.data.database
      database.accounts[id] = newAccount
      context.updateData({database: database });
      exit()
    }

    function exit(){
      setOpen(false)
      setName('')
      setUsername('')
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
          <h1>Add Account</h1>
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
        <Button variant="contained" size="large" style={styles.addButton}  disableElevation onClick={() => addAccount()}>
          Add Account
        </Button>

        <Button variant="outlined" style={styles.cancelButton} size="medium"  disableElevation onClick={() => exit()}>
          Cancel
        </Button>        
        </div>
        </div>
      </Modal> 
    );
  }
  
  export default AddAccountModal;
  