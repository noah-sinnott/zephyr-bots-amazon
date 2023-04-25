import React, {useState} from "react";
import Navbar from '../../Components/Navbar/Navbar'
import styles from './styles'
import TaskGroupList from '../../Components/TaskGroupsList/TaskGroupList'
import ActiveTasks from '../../Components/ActiveTasks/ActiveTasks'

  function Home() {

    const [selectedTaskGroup, setSelectedTaskGroup] = useState(false)

    return (
      <div style={styles.containerMain}>
        <Navbar/>
        <TaskGroupList setTaskGroupId={setSelectedTaskGroup} />
        <ActiveTasks taskGroupId={selectedTaskGroup} setTaskGroupId={setSelectedTaskGroup}/>
      </div>
    );
  }
  
  export default Home;
  