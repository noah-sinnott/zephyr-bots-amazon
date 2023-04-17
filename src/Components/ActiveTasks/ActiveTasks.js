import React, {useContext, useEffect, useState} from "react";
import styles from './styles'
import { Context } from "../../App";
import AddTaskModal from "../AddTaskModal/AddTaskModal";
import {kill, amazon} from '../../ScriptRunner'
import play from '../../assets/play.png'
import bin from '../../assets/bin.png'
import stop from '../../assets/stop.png'
import info from '../../assets/info.png'

function ActiveTasks({taskGroup}) {

  const [addTaskModal, setAddTaskModal] = useState(false)
  const context = useContext(Context)

  function addTask(){
    setAddTaskModal(true)
  }

  function deleteTask(task, index){
    if(task.pythonPID !== false){
      kill(task.pythonPID)
    }
    const currentTaskGroups = context.data.database.taskGroups;
    const tasks = currentTaskGroups[taskGroup].tasks;
    tasks.splice(index, 1);
    const updatedTaskGroup = [...tasks];
    const updatedTaskGroups = [...currentTaskGroups];
    updatedTaskGroups[taskGroup].tasks = updatedTaskGroup;
    const updatedDatabase = { ...context.data.database, taskGroups: updatedTaskGroups };
    context.updateData({database: updatedDatabase });
  }

  async function startTask(task, index) {
    if (task.pythonPID !== false) return;
    const pythonPID = await amazon(task, context, index, taskGroup);
    task.pythonPID = pythonPID;
    const currentTaskGroups = context.data.database.taskGroups;
    const tasks = currentTaskGroups[taskGroup].tasks;
    tasks[index] = task; 
    const updatedTaskGroups = [...currentTaskGroups];
    updatedTaskGroups[taskGroup].tasks = tasks;
    const updatedDatabase = { ...context.data.database, taskGroups: updatedTaskGroups };
    context.updateData({ database: updatedDatabase });
  }
  
  function stopTask(task, index){
    if(task.pythonPID !== false){
      kill(task.pythonPID)
      const currentTaskGroups = context.data.database.taskGroups;
      const tasks = currentTaskGroups[taskGroup].tasks;
      tasks[index].pythonPID = false;
      const updatedTaskGroups = [...currentTaskGroups];
      updatedTaskGroups[taskGroup].tasks = tasks;
      const updatedDatabase = { ...context.data.database, taskGroups: updatedTaskGroups };
      context.updateData({database: updatedDatabase });
    }
  }

    return (
      <div style={styles.containerMain}>
        <AddTaskModal setOpen={setAddTaskModal} isOpen={addTaskModal} taskGroup={taskGroup}/>
        <div style={styles.containerMain2}>
              {taskGroup != -1 && <>
            <div style={styles.actions}>
                <p>Tasks: {context.data.database.taskGroups[taskGroup].tasks.length}</p>
                <button style={styles.button} onClick={() => addTask()}>Add Task</button>
                <button style={styles.button}>Start All</button>
                <button style={styles.button}>Stop All</button>
                <button style={styles.button}>Update All</button>
                <button style={styles.button}>Delete All</button>
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
             {context.data.database.taskGroups[taskGroup].tasks.map((task, index) => {
              return (
                <tr style={styles.tableRow}>
                  <td>{task.email}</td>
                  <td>{task.proxy ? task.proxy : 'false'}</td>
                  <td>{task.pythonPID !== false ? (task.notifications.length != 0 ? task.notifications[task.notifications.length - 1] : 'starting') : 'idle'}</td>
                  <td>
                    {task.pythonPID !== false ?
                     <img src={stop} style={styles.image} onClick={() => stopTask(task, index)}/> 
                    :
                    <img src={play} style={styles.image} onClick={() => startTask(task, index)}/> 
                  }
                     <img src={bin} style={styles.image} onClick={() => deleteTask(task, index)}/> 
                     
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
  