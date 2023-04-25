import React, {useContext, useEffect, useState} from "react";
import styles from './styles'
import { Context } from "../../App";

import AddTaskModal from "../AddTaskModal/AddTaskModal";
import EditTaskGroup from "../EditTaskGroup/EditTaskGroup";
import BulkEditTasksModal from '../UpdateAllTasksModal/UpdateAllTasksModal'
import {kill, amazon} from '../../helpers/ScriptRunner'

import play from '../../assets/play.png'
import bin from '../../assets/bin.png'
import stop from '../../assets/stop.png'
import info from '../../assets/info.png'

function ActiveTasks({taskGroupId, setTaskGroupId}) {

  const [addTaskModal, setAddTaskModal] = useState(false)
  const [editTaskGroupModal, setEditTaskGroupModal] = useState(false)
  const [BulkEditTasks, setBulkEditTasks] = useState(false)

  const context = useContext(Context)

  function addTask(){
    setAddTaskModal(true)
  }

  function updateAll(){
    setBulkEditTasks(true)
  }

  function deleteAll(){
    Object.entries(context.data.database.taskGroups[taskGroupId].tasks).map(([key, value]) => {
      deleteTask(key, value)
    })
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
  

    return (
      <div style={styles.containerMain}>

        <AddTaskModal setOpen={setAddTaskModal} isOpen={addTaskModal} taskGroupId={taskGroupId}/>

        <BulkEditTasksModal setOpen={setBulkEditTasks} isOpen={BulkEditTasks} taskGroupId={taskGroupId}/>

        <EditTaskGroup setOpen={setEditTaskGroupModal} isOpen={editTaskGroupModal} taskGroupId={taskGroupId} setTaskGroupId={setTaskGroupId}/>

        <div style={styles.containerMain2}>
            {taskGroupId != false && <>
            <div style={styles.actions}>
                <button style={styles.button} onClick={() => setEditTaskGroupModal(!editTaskGroupModal)}>Edit Task Group</button>
                <p>Tasks: {Object.keys(context.data.database.taskGroups[taskGroupId].tasks).length}</p>
                <button style={styles.button} onClick={() => addTask()}>Add Task</button>
                <button style={styles.button} onClick={() => startAll()}>Start All</button>
                <button style={styles.button} onClick={() => stopAll()}>Stop All</button>
                <button style={styles.button} onClick={() => updateAll()}>Update All</button>
                <button style={styles.button} onClick={() => deleteAll()}>Delete All</button>
            </div>
            <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.tableHeader}>Profile</th>
                <th style={styles.tableHeader}>Proxy</th>
                <th style={styles.tableHeader}>Status</th>
                <th style={styles.tableHeader}>Actions</th>
              </tr>
            </thead>
            <tbody>
             {Object.entries(context.data.database.taskGroups[taskGroupId].tasks).map(([key, value]) => {
              return (
                <tr style={styles.tableRow} key={key}>
                  <td>{value.email}</td>
                  <td>{value.proxy ? value.proxy : 'false'}</td>
                  <td>{value.pythonPID !== false ? (value.notifications.length != 0 ? value.notifications[value.notifications.length - 1] : 'starting') : 'idle'}</td>
                  <td>
                    {value.pythonPID !== false ?
                     <img src={stop} style={styles.image} onClick={() => stopTask(key, value)}/> 
                    :
                    <img src={play} style={styles.image} onClick={() => startTask(key, value)}/> 
                  }
                     <img src={bin} style={styles.image} onClick={() => deleteTask(key, value)}/> 
                     
                     <img src={info} style={styles.image}/> 
                  </td>
                </tr>
              );
             })}          
            </tbody>
          </table>
              </>}
        </div>
      </div>
    );
  }


  export default ActiveTasks;
  