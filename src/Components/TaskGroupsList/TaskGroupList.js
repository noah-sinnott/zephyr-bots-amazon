import React, {useContext, useEffect} from "react";
import styles from './styles'
import { Context } from "../../App";

function TaskGroupList({setTaskGroup}) {

const context = useContext(Context)

function addTaskGroup(){
  let newTaskGroup ={name: `Task Group ${context.data.database.taskGroups.length}`, tasks: []}
  const newTaskGroups = [...context.data.database.taskGroups, newTaskGroup];
  context.updateData({ database: { ...context.data.database, taskGroups: newTaskGroups } });
}

function removeTaskGroup(index) {
  const newTaskGroups = [
    ...context.data.database.taskGroups.slice(0, index),
    ...context.data.database.taskGroups.slice(index + 1),
  ];
  context.updateData({ database: { ...context.data.database, taskGroups: newTaskGroups } });
}

    return (
      <div style={styles.containerMain}>
        <div style={styles.tasksHolder}>
            <button style={styles.task}  onClick={() => addTaskGroup()}>
                <p>New task group</p>
            </button>
            {context.data.database.taskGroups && <>
                {context.data.database.taskGroups.map((taskGroup, index) => (
                  <button style={styles.task} onClick={() => setTaskGroup(index)}>
                    <p>{taskGroup.name}</p>
                  </button>
                ))}
              </>
            }
        </div>
      </div>
    );
  }
  
  export default TaskGroupList;
  