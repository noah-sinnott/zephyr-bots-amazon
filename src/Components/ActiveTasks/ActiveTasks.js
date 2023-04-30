import React, {useContext, useEffect, useState} from "react";
import styles from './styles'
import { Context } from "../../App";

import AddTaskModal from "../AddTaskModal/AddTaskModal";
import EditTaskGroup from "../EditTaskGroup/EditTaskGroup";
import UpdateTasksModal from '../UpdateTasksModal/UpdateTasksModal'
import {kill, amazon} from '../../helpers/ScriptRunner'


import colors from "../../colors/colors";
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded';
import { Button, IconButton } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import StopRoundedIcon from '@mui/icons-material/StopRounded';

function ActiveTasks({taskGroupId, setTaskGroupId}) {

  const [addTaskModal, setAddTaskModal] = useState(false)
  const [editTaskGroupModal, setEditTaskGroupModal] = useState(false)
  const [updateTasksModal, setUpdateTasksModal] = useState(false)
  const [taskId, setTaskId] = useState(false)

  const context = useContext(Context)

  function addTask(){
    setAddTaskModal(true)
  }

  function updateAll(){
    setTaskId(false)
    setUpdateTasksModal(true)
  }

  function deleteAll(){
    Object.entries(context.data.database.taskGroups[taskGroupId].tasks).map(([key, value]) => {
      if(value.pythonPID !== false){
        kill(value.pythonPID)
      }
    })
    let taskgroups = context.data.database.taskGroups
    taskgroups[taskGroupId].tasks = {}
    const updatedDatabase = { ...context.data.database, taskGroups: taskgroups };
    context.updateData({database: updatedDatabase });
  }  

  function startAll(){
    Object.entries(context.data.database.taskGroups[taskGroupId].tasks).map(([key, value]) => {
      stopTask(key, value)
    })
  }  
  
  function stopAll(){
    Object.entries(context.data.database.taskGroups[taskGroupId].tasks).map(([key, value]) => {
      stopTask(key, value)
    })
  }
  
  function deleteTask(key, task){
    if(task.pythonPID !== false){
      kill(task.pythonPID)
    }

    let taskgroups = context.data.database.taskGroups
    delete taskgroups[taskGroupId].tasks[key]

    const updatedDatabase = { ...context.data.database, taskGroups: taskgroups };
    context.updateData({database: updatedDatabase });
  }

  async function startTask(id, task) {
    if (task.pythonPID !== false) return;
    const pythonPID = await amazon(id, task, context, taskGroupId);

    let taskgroups = context.data.database.taskGroups
    taskgroups[taskGroupId].tasks[id].pythonPID = pythonPID

    const updatedDatabase = { ...context.data.database, taskGroups: taskgroups };
    context.updateData({database: updatedDatabase });
  }
  
  function stopTask(id, task){
    if(task.pythonPID !== false){
      kill(task.pythonPID)
    }
      let taskgroups = context.data.database.taskGroups
      taskgroups[taskGroupId].tasks[id].pythonPID = false
      const updatedDatabase = { ...context.data.database, taskGroups: taskgroups };
      context.updateData({database: updatedDatabase });
    }
  
    function MouseOver(event) {
      event.target.parentElement.style.background = colors.highlightMini;
    }
  
    function MouseOut(event){
      event.target.parentElement.style.background="";
    }

    return (
      <div style={styles.containerMain}>

        <AddTaskModal setOpen={setAddTaskModal} isOpen={addTaskModal} taskGroupId={taskGroupId}/>

        <UpdateTasksModal setOpen={setUpdateTasksModal} isOpen={updateTasksModal} taskGroupId={taskGroupId} taskId={taskId}/>

        <EditTaskGroup setOpen={setEditTaskGroupModal} isOpen={editTaskGroupModal} taskGroupId={taskGroupId} setTaskGroupId={setTaskGroupId}/>

        <div style={styles.containerMain2}>
            {taskGroupId != false ? <>
            <div style={styles.actions}>
                <Button variant="contained" size="medium" style={styles.button}  disableElevation onClick={() => setEditTaskGroupModal(!editTaskGroupModal)}>
                        Edit Task Group
                </Button>
                <p>Tasks: {Object.keys(context.data.database.taskGroups[taskGroupId].tasks).length}</p>
                <Button variant="contained" size="medium" style={styles.button}  disableElevation onClick={() => addTask()}>
                        Add Task
                </Button>
                <Button variant="contained" size="medium" style={styles.button}  disableElevation onClick={() => startAll()}>
                        Start All
                </Button>
                <Button variant="contained" size="medium" style={styles.button}  disableElevation onClick={() => stopAll()}>
                        Stop All
                </Button>
                <Button variant="contained" size="medium" style={styles.button}  disableElevation onClick={() => updateAll()}>
                        Update All
                </Button>
                <Button variant="contained" size="medium" style={styles.button}  disableElevation onClick={() => deleteAll()}>
                        Delete All
                </Button>
            </div>
            <table style={styles.table}>
            <thead>
              <tr style={styles.tableHeaderBackground}>
                <th style={styles.tableHeader}>Profile</th>
                <th style={styles.tableHeader}>Proxy</th>
                <th style={styles.tableHeader}>Status</th>
                <th style={styles.tableHeader}>Actions</th>
              </tr>
            </thead>
            <tbody>
             {Object.entries(context.data.database.taskGroups[taskGroupId].tasks).map(([key, value]) => {
              return (
                <tr onMouseOver={MouseOver} onMouseOut={MouseOut} style={styles.tableRow} key={key}>
                  <td style={styles.tableItem}>{value.email}</td>
                  <td style={styles.tableItem}>{value.proxy.value}</td>
                  <td style={styles.tableItem}>{value.pythonPID !== false ? (value.notifications.length != 0 ? value.notifications[value.notifications.length - 1] : 'starting') : 'idle'}</td>
                  <td style={styles.tableItem}>
                    {value.pythonPID !== false ?
                     <IconButton aria-label="Edit" size="small" style={{color: colors.orange}}  onClick={() => stopTask(key, value)}>
                       <StopRoundedIcon />
                    </IconButton>
                    :
                    <>  
                    <IconButton aria-label="Edit" size="small" style={{color: colors.green}} onClick={() => {startTask(key, value)}}>
                      <PlayArrowRoundedIcon />
                    </IconButton>
                    <IconButton aria-label="Edit" size="small" style={{color: colors.white}} onClick={() => {
                      setUpdateTasksModal(true)
                      setTaskId(key)
                      }}>
                      <EditIcon />
                    </IconButton>
                    </>
                  }
                  <IconButton aria-label="Edit" size="small" style={{color: colors.red}} onClick={() => deleteTask(key, value)}>
                      <DeleteIcon />
                    </IconButton>
                  </td>
                </tr>
              );
             })}          
            </tbody>
          </table>
              </> :
              <div style={{width: '100%', height: '100%', display: 'flex',alignItems: 'center', justifyContent: 'center'}}>  
                <p>Select a Task Group</p>
              </div>
              }
        </div>
      </div>
    );
  }


  export default ActiveTasks;
  