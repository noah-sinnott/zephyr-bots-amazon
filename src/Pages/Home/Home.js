import React, {useEffect, useState, useContext} from "react";
import Navbar from '../../Components/Navbar/Navbar'
import styles from './styles'
import TaskGroupList from '../../Components/TaskGroupsList/TaskGroupList'
import TaskGroup from '../../Components/TaskGroup/TaskGroup'
import { Context } from "../../App";

  function Home() {

    const [selectedTaskGroup, setSelectedTaskGroup] = useState(false)
    const context = useContext(Context)
    
    useEffect(() => {
    if(Object.hasOwn(context.data.database.taskGroups, context.data.database.userInfo.taskGroup))setSelectedTaskGroup(context.data.database.userInfo.taskGroup)
    }, [])

    return (
      <div style={styles.containerMain}>
        <Navbar/>
        <TaskGroupList setTaskGroupId={setSelectedTaskGroup} />
        <TaskGroup taskGroupId={selectedTaskGroup} setTaskGroupId={setSelectedTaskGroup}/>
      </div>
    );
  }
  
  export default Home;
  