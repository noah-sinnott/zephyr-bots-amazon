import React, {useContext} from "react";
import styles from './styles'
import { Context } from "../../App";
import { generateId } from "../../helpers/generateId";

function TaskGroupList({setTaskGroupId}) {

const context = useContext(Context)

function addTaskGroup(){
  let id = generateId()
  let newTaskGroup ={name: `Task Group ${Object.keys(context.data.database.taskGroups).length + 1}`, tasks: {}}
  let taskGroups = context.data.database.taskGroups
  taskGroups[id] = newTaskGroup
  context.updateData({ database: { ...context.data.database, taskGroups: taskGroups } });
}

function handleClick(key) {
  setTaskGroupId(key)
  let userInfo = context.data.database.userInfo
  userInfo.taskGroup = key
  context.updateData({ database: { ...context.data.database, userInfo: userInfo } });
}

    return (
      <div style={styles.containerMain}>
        <div style={styles.tasksHolder}>
            <button style={styles.task}  onClick={() => addTaskGroup()}>
                <p>New Task Group</p>
            </button>
            {context.data.database.taskGroups && <>
                {Object.entries(context.data.database.taskGroups).map(([key, value]) => (
                  <button style={styles.task} onClick={() => handleClick(key)} key={key}>
                    <p>{value.name}</p>
                  </button>
                ))}
              </>
            }
        </div>
      </div>
    );
  }
  
  export default TaskGroupList;
  