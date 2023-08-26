import React, {useContext, useState} from "react";
import styles from './styles'
import { Context } from "../../App";

import AddTaskModal from "../AddTaskModal/AddTaskModal";
import EditTaskGroup from "../EditTaskGroup/EditTaskGroup";
import UpdateTaskModal from '../UpdateTaskModal/UpdateTaskModal'
import {kill, amazon} from '../../helpers/ScriptRunner'
import BulkUpdateTasks from "../BulkUpdateTasks/BulkUpdateTasks";
import ConfirmationDialog from "../ConfirmationDialog/ConfirmationDialog";
import colors from "../../colors/colors";
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded';
import { Button, IconButton } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import StopRoundedIcon from '@mui/icons-material/StopRounded';

function TaskGroup({taskGroupId, setTaskGroupId}) {

  const [addTaskModal, setAddTaskModal] = useState(false)
  const [editTaskGroupModal, setEditTaskGroupModal] = useState(false)
  const [updateTaskModal, setUpdateTaskModal] = useState(false)
  const [updateTasksModal, setUpdateTasksModal] = useState(false)
  const [taskId, setTaskId] = useState(false)
  const [deleteTaskDialog, setDeleteTaskDialog] = useState(false)
  const [deleteTasksDialog, setDeleteTasksDialog] = useState(false)

  const context = useContext(Context)

  function addTask(){
    setAddTaskModal(true)
  }

  function updateAll(){
    setUpdateTasksModal(true)
  }

  function deleteAll(){
    Object.entries(context.data.database.taskGroups[taskGroupId].tasks).forEach(([key, value]) => {
      if(value.scriptRunning !== false){
        kill(key)
      }
    })
    let taskgroups = context.data.database.taskGroups
    taskgroups[taskGroupId].tasks = {}
    const updatedDatabase = { ...context.data.database, taskGroups: taskgroups };
    context.updateData({database: updatedDatabase });
  }  

  function startAll(){
    Object.entries(context.data.database.taskGroups[taskGroupId].tasks).forEach(([key, value]) => {
      startTask(key, value)
    })
  }  
  
  function stopAll(){
    Object.entries(context.data.database.taskGroups[taskGroupId].tasks).forEach(([key, value]) => {
      stopTask(key, value)
    })
  }
  
  function deleteTask(key){
    if(context.data.database.taskGroups[taskGroupId].tasks[key].scriptRunning !== false){
      kill(key)
  }

    let taskgroups = context.data.database.taskGroups
    delete taskgroups[taskGroupId].tasks[key]

    const updatedDatabase = { ...context.data.database, taskGroups: taskgroups };
    context.updateData({database: updatedDatabase });
  }

  async function startTask(id, task) {
    if (task.scriptRunning !== false) return;
    amazon(id, taskGroupId, task, context.data.database);
    let taskgroups = context.data.database.taskGroups
    taskgroups[taskGroupId].tasks[id].scriptRunning = true
    taskgroups[taskGroupId].tasks[id].notifications = []
    const updatedDatabase = { ...context.data.database, taskGroups: taskgroups };
    context.updateData({database: updatedDatabase });
  }
  
  function stopTask(id, task){
    if(task.scriptRunning !== false){
      kill(id)
    }
      let taskgroups = context.data.database.taskGroups
      taskgroups[taskGroupId].tasks[id].scriptRunning = false
      const updatedDatabase = { ...context.data.database, taskGroups: taskgroups };
      context.updateData({database: updatedDatabase });
    }
    function MouseOver(event) {
      event.target.closest('tr').style.background = colors.highlightMini;
    }
  
    function MouseOut(event){
      const row = event.target.closest('tr');
      row.style.background = "";   
     }


    return (
      <div style={styles.containerMain}>

        <AddTaskModal setOpen={setAddTaskModal} isOpen={addTaskModal} taskGroupId={taskGroupId}/>

        <UpdateTaskModal setOpen={setUpdateTaskModal} isOpen={updateTaskModal} taskGroupId={taskGroupId} taskId={taskId}/>

        <EditTaskGroup setOpen={setEditTaskGroupModal} isOpen={editTaskGroupModal} taskGroupId={taskGroupId} setTaskGroupId={setTaskGroupId}/>

        <BulkUpdateTasks setOpen={setUpdateTasksModal} isOpen={updateTasksModal} taskGroupId={taskGroupId}/>
        
        <ConfirmationDialog isOpen={deleteTasksDialog} setOpen={setDeleteTasksDialog} submit={() => deleteAll()} submitText={'Delete All'} mainText={'Confirm You want to delete all tasks'}/>
        <ConfirmationDialog isOpen={deleteTaskDialog} setOpen={setDeleteTaskDialog} submit={() => deleteTask(taskId)} submitText={'Delete Task'} mainText={'Confirm you want to delete this task'}/>

        <div style={styles.containerMain2}>
            {taskGroupId !== false ? <>
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
                <Button variant="contained" size="medium" style={styles.button}  disableElevation onClick={() => setDeleteTasksDialog(true)}>
                        Delete All
                </Button>
            </div>
            <div style={styles.tableContainer}>
            <table style={styles.table}>
            <colgroup>
                <col style={{ width: 'auto' }} />
                <col style={{ width: 'auto' }} />
                <col style={{ width: 'auto' }} />
                <col style={{ width: 'auto' }} />
                <col style={{ width: '150px' }} />
            </colgroup>
            <thead>
              <tr style={styles.tableHeaderBackground}>
                <th style={styles.tableHeader}>Account</th>
                <th style={styles.tableHeader}>Billing Profile</th>
                <th style={styles.tableHeader}>Proxy</th>
                <th style={styles.tableHeader}>Status</th>
                <th style={styles.tableHeader}>Actions</th>
              </tr>
            </thead>
            <tbody>
             {Object.entries(context.data.database.taskGroups[taskGroupId].tasks).map(([key, value]) => {
              return (
                <tr onMouseOver={MouseOver} onMouseOut={MouseOut} style={styles.tableRow} key={key}>
                  <td style={styles.tableItem}>{context.data.database.accounts[value.account]?.name || ''}</td>
                  <td style={styles.tableItem}>{context.data.database.billing[value.billing]?.name || ''}</td>
                  <td style={styles.tableItem}>{context.data.database.proxyGroups[value.proxy]?.name || ''}</td>
                  <td style={styles.tableItem} title={value.scriptRunning !== false ? (value.notifications.length !== 0 ? value.notifications[value.notifications.length - 1] : 'starting') : 'idle'}>{value.scriptRunning !== false ? (value.notifications.length !== 0 ? value.notifications[value.notifications.length - 1] : 'starting') : 'idle'}</td>
                  <td style={styles.tableItem}>
                    {value.scriptRunning !== false ?
                     <IconButton aria-label="Stop" size="small" style={{color: colors.orange}}  onClick={() => stopTask(key, value)}>
                       <StopRoundedIcon />
                    </IconButton>
                    :
                    <>  
                    <IconButton aria-label="Play" size="small" style={{color: colors.green}} onClick={() => {startTask(key, value)}}>
                      <PlayArrowRoundedIcon />
                    </IconButton>
                    <IconButton aria-label="Edit" size="small" style={{color: colors.white}} onClick={() => {
                      setUpdateTaskModal(true)
                      setTaskId(key)
                      }}>
                      <EditIcon />
                    </IconButton>
                    </>
                  }
                  <IconButton aria-label="Delete" size="small" style={{color: colors.red}} onClick={() => {
                    setTaskId(key)
                    setDeleteTaskDialog(true)
                  }}>
                      <DeleteIcon />
                    </IconButton>
                  </td>
                </tr>
              );
             })}          
            </tbody>
          </table>
          </div>
              </> :
              <div style={{width: '100%', height: '100%', display: 'flex',alignItems: 'center', justifyContent: 'center'}}>  
                <p>Select or Create a Task Group</p>
              </div>
              }
        </div>
      </div>
    );
  }


  export default TaskGroup;
  