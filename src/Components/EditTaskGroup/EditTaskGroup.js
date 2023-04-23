import React, {useContext, useEffect, useState} from "react";
import styles from './styles'

import {Context} from '../../App'

import FormLabel from '@mui/material/FormLabel';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button'

import {kill} from '../../ScriptRunner'

  function EditTaskGroup({setOpen, isOpen, taskGroup, setTaskGroup}) {

    const context = useContext(Context)
    
    const [name, setName] = useState('')

    useEffect(() => {
      if(taskGroup == -1) return
      setName(context.data.database.taskGroups[taskGroup].Name)
    }, [taskGroup])

    function saveChanges(){
      let newTaskGroup = {Name: name, tasks: [...context.data.database.taskGroups[taskGroup].tasks]}
      let taskGroups = [...context.data.database.taskGroups]
      taskGroups[taskGroup] = newTaskGroup
      context.updateData({ database: { ...context.data.database, taskGroups: taskGroups } })
      exit()
    }

    function deleteTaskGroup() {
      const taskGroups = [...context.data.database.taskGroups];
      const deletedTaskGroup = taskGroups.splice(taskGroup, 1)[0];     
      deletedTaskGroup.tasks.forEach((task) => {
        if (task.pythonPID !== false) {
          kill(task.pythonPID);
        }
      });
      setTaskGroup(-1)
      context.updateData({ database: { ...context.data.database, taskGroups: taskGroups } });
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
  