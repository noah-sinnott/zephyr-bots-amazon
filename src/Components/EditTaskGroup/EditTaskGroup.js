import React, {useContext, useEffect, useState} from "react";
import styles from './styles'

import {Context} from '../../App'

import { Input, Modal, Button } from "@mui/material";

import {kill} from '../../helpers/ScriptRunner'

  function EditTaskGroup({setOpen, isOpen, taskGroupId, setTaskGroupId}) {

    const context = useContext(Context)
    
    const [name, setName] = useState('')

    useEffect(() => {
      if(taskGroupId == false) return
      setName(context.data.database.taskGroups[taskGroupId].Name)
    }, [taskGroupId])

    function saveChanges(){

      let taskgroups = context.data.database.taskGroups
      taskgroups[taskGroupId].Name = name

      const updatedDatabase = { ...context.data.database, taskGroups: taskgroups };
      context.updateData({database: updatedDatabase });

      exit()
    }

    function deleteTaskGroup() { 
      setTaskGroupId(false) 
      Object.entries(context.data.database.taskGroups[taskGroupId].tasks).map(([key, value]) => {
        if (value.pythonPID !== false) {
          kill(value.pythonPID);
        }
      });

      let taskgroups = context.data.database.taskGroups
      delete taskgroups[taskGroupId]

      const updatedDatabase = { ...context.data.database, taskGroups: taskgroups };
      context.updateData({database: updatedDatabase });
      exit();
    }

    function exit(){
      setOpen(false)
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
        <p>Task Group Name:</p>
        <Input value={name} disableUnderline={true} onChange={(event) => setName(event.target.value)} id="name" sx={styles.textInput} placeholder="Enter Task Group Name"/>
        </div>

        <div style={styles.submitButtons}>

        <Button variant="contained" size="large" style={styles.addButton}  disableElevation onClick={() => saveChanges()}>
          Save Task Group
        </Button>

        <Button variant="contained" size="large" style={styles.addButton}  disableElevation onClick={() => deleteTaskGroup()}>
          Delete Task Group
        </Button> 

        <Button variant="outlined" style={styles.cancelButton} size="medium"  disableElevation onClick={() => exit()}>
          Cancel
        </Button>
                 
        </div>
        </div>
        </Modal>
    );
  }
  
  export default EditTaskGroup;
  