import React, {useState} from "react";
import Navbar from '../../Components/Navbar/Navbar'
import styles from './styles'
import TaskGroupList from '../../Components/TaskGroupsList/TaskGroupList'
import TaskGroup from '../../Components/TaskGroup/TaskGroup'

  function Home() {

    const [selectedTaskGroup, setSelectedTaskGroup] = useState(false)

    return (
      <div style={styles.containerMain}>
        <Navbar/>
        <TaskGroupList setTaskGroupId={setSelectedTaskGroup} />
        <TaskGroup taskGroupId={selectedTaskGroup} setTaskGroupId={setSelectedTaskGroup}/>
      </div>
    );
  }
  
  export default Home;
  