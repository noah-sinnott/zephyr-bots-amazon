import React, {useContext, useEffect, useState} from "react";
import styles from './styles'

import {Context} from '../../App'

import { Input, Modal, Button } from "@mui/material";

import {kill} from '../../helpers/ScriptRunner'
import ConfirmationDialog from "../ConfirmationDialog/ConfirmationDialog";

  function EditTaskGroup({setOpen, isOpen, taskGroupId, setTaskGroupId}) {

    const context = useContext(Context)
    
    const [name, setName] = useState('')
    const [deleteTaskGroupDialog, setDeleteTaskGroupDialog] = useState(false)

    useEffect(() => {
      if(taskGroupId === false) return
      setName(context.data.database.taskGroups[taskGroupId].name)
    }, [taskGroupId])

    function saveChanges(){

      let taskgroups = context.data.database.taskGroups
      taskgroups[taskGroupId].name = name

      const updatedDatabase = { ...context.data.database, taskGroups: taskgroups };
      context.updateData({database: updatedDatabase });

      exit()
    }

    function deleteTaskGroup() { 
      
      Object.entries(context.data.database.taskGroups[taskGroupId].tasks).forEach(([key, value]) => {
        if (value.pythonPID !== false) {
          kill(value.pythonPID);
        }
      });
      setTaskGroupId(false) 
      let userInfo = context.data.database.userInfo
      userInfo.taskGroup = false
      let taskgroups = context.data.database.taskGroups
      delete taskgroups[taskGroupId]

      const updatedDatabase = { ...context.data.database, taskGroups: taskgroups, userInfo: userInfo };
      context.updateData({database: updatedDatabase });
      exit();
    }

    function exit(){
      setOpen(false)
    }

    return (<>
      <ConfirmationDialog isOpen={deleteTaskGroupDialog} setOpen={setDeleteTaskGroupDialog} submit={() => deleteTaskGroup()} mainText2={'This will delete all the tasks within this group'} submitText={'Delete Task group'} mainText={'Confirm you want to delete this task group'}/>
      <Modal
        open={isOpen}
        onClose={() => exit()}
        aria-labelledby="Edit Task Group"
        aria-describedby="Edit Task Group"
      >
        <div style={styles.content}>

        <div style={styles.title}>
          <h1>Edit Task Group</h1>
        </div>

        <div style={styles.inputContainer}>
        <p>Task Group Name:</p>
        <Input value={name} disableUnderline={true} onChange={(event) => setName(event.target.value)} id="name" sx={styles.textInput} placeholder="Enter Task Group Name"/>
        </div>

        <div style={styles.submitButtons}>

        <Button variant="contained" size="large" style={styles.addButton}  disableElevation onClick={() => saveChanges()}>
          Save Task Group
        </Button>

        <Button variant="contained" size="large" style={styles.addButton}  disableElevation onClick={() => setDeleteTaskGroupDialog(true)}>
          Delete Task Group
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
  
  export default EditTaskGroup;
  