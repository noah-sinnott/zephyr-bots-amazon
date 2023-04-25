import React, {useContext, useEffect} from "react";
import styles from './styles'
import { Context } from "../../App";
import { generateId } from "../../helpers/generateId";

function TaskGroupList({setTaskGroupId}) {

const context = useContext(Context)

function addTaskGroup(){
  let id = generateId()
  let newTaskGroup ={Name: `Task Group ${Object.keys(context.data.database.taskGroups).length + 1}`, tasks: {}}
  let taskGroups = context.data.database.taskGroups
  taskGroups[id] = newTaskGroup
  context.updateData({ database: { ...context.data.database, taskGroups: taskGroups } });
}

    return (
      <div style={styles.containerMain}>
        <div style={styles.tasksHolder}>
            <button style={styles.task}  onClick={() => addTaskGroup()}>
                <p>New task group</p>
            </button>
            {context.data.database.taskGroups && <>
                {Object.entries(context.data.database.taskGroups).map(([key, value]) => (
                  <button style={styles.task} onClick={() => setTaskGroupId(key)} key={key}>
                    <p>{value.Name}</p>
                  </button>
                ))}
              </>
            }
        </div>
      </div>
    );
  }
  
  export default TaskGroupList;
  