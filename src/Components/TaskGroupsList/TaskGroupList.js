import React from "react";
import styles from './styles'


function TaskGroupList() {

    return (
      <div style={styles.containerMain}>
        <div style={styles.tasksHolder}>
            <button style={styles.task} >
                <p>New task group</p>
            </button>
        </div>
      </div>
    );
  }
  
  export default TaskGroupList;
  