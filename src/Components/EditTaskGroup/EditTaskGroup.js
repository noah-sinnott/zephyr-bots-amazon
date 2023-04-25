import React, {useContext, useEffect, useState} from "react";
import styles from './styles'

import {Context} from '../../App'

import FormLabel from '@mui/material/FormLabel';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button'

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
      <>
      {isOpen &&
      <div style={styles.background}>
        <div style={styles.mainContainer}>
        <div style={styles.form}>

        <FormLabel id="NameLabel">Name</FormLabel>

        <TextField style={styles.wide} value={name} onChange={(event) => setName(event.target.value)} id="name" label="Task Group Name" variant="outlined" />

        <div style={styles.submitButtons}>

        <Button variant="contained" size="large" onClick={() => saveChanges()}>
          Save Task Group
        </Button>

        <Button variant="contained" size="large" onClick={() => deleteTaskGroup()}>
          Delete Task Group
        </Button> 
        <Button variant="outlined"  style={{ color: 'red', borderColor: 'red' }} size="large" onClick={() => exit()}>
          Cancel
        </Button>         
        </div>
        </div>
        </div>
      </div> 
      }
      </>
    );
  }
  
  export default EditTaskGroup;
  