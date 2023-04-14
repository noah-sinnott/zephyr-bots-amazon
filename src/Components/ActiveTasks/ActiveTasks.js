import React, {useContext, useEffect, useState} from "react";
import styles from './styles'
import { Context } from "../../App";
import AddTaskModal from "../AddTaskModal/AddTaskModal";

function Navbar({taskGroup}) {

  const [addTaskModal, setAddTaskModal] = useState(false)
  const context = useContext(Context)

  function addTask(){
    setAddTaskModal(true)
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
            <table>
            <thead>
              <tr>
                <th>Account</th>
                <th>Proxy</th>
                <th>Max Quantity</th>
                <th>Max Price</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
             {context.data.database.taskGroups[taskGroup].tasks.map((task) => {
              <tr>
                <td>Account</td>
                <td>Account</td>
                <td>Proxy</td>
                <td>Max Quantity</td>
                <td>Max Price</td>
                <td>Status</td>
                <td>Actions</td>
              </tr>
             })}          
            </tbody>
          </table>
              </>}
        </div>
      </div>
    );
  }
  
  export default Navbar;
  