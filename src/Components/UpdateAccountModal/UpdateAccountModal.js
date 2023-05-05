import React, {useContext, useEffect, useState} from "react";
import styles from './styles'

import {Context} from '../../App'
import { Input, Modal, Button } from "@mui/material";
import ConfirmationDialog from "../ConfirmationDialog/ConfirmationDialog";
import { kill } from "../../helpers/ScriptRunner";
  function UpdateAccountModal({setOpen, isOpen, accountId}) {

    const context = useContext(Context)

    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [editAccountDialog, setEditAccountDialog] = useState(false)

    useEffect(()=>{
      if(!accountId) return
      setName(context.data.database.accounts[accountId].name)
      setUsername(context.data.database.accounts[accountId].username)
      setPassword(context.data.database.accounts[accountId].password)
    },[isOpen])

    async function update(){
      
      let taskGroups = context.data.database.taskGroups

      Object.entries(taskGroups).forEach(([key, taskGroup]) => {
        Object.entries(taskGroup.tasks).forEach(([key, task]) => {
          if(task.account.value === accountId){
            if(task.pythonPID !== false){
              kill(task.pythonPID)
              task.pythonPID = false
              task.notifications = []
          }
          }
        })
      })
      
    let accounts = context.data.database.accounts

    accounts[accountId].name = name
    accounts[accountId].username = username
    accounts[accountId].password = password

    const updatedDatabase = { ...context.data.database, accounts: accounts, taskGroups, taskGroups };
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
      <>
            <ConfirmationDialog isOpen={editAccountDialog} setOpen={setEditAccountDialog} submit={() => update()} mainText2={'This will stop any running tasks with this account'} submitText={'Update Account'} mainText={'Confirm you want to update this account'}/>

      <Modal
        open={isOpen}
        onClose={() => exit()}
        aria-labelledby="Update Account"
        aria-describedby="Update Account"
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

        <Button variant="contained" size="large" style={styles.updateButton}  disableElevation onClick={() => setEditAccountDialog(true)}>
          Update Account
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
  
  export default UpdateAccountModal;
  