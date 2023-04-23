import React, {useState} from "react";
import Navbar from '../../Components/Navbar/Navbar'
import styles from './styles'
import TaskGroupList from '../../Components/TaskGroupsList/TaskGroupList'
import ActiveTasks from '../../Components/ActiveTasks/ActiveTasks'

  function Home() {

    const [selectedTaskGroup, setSelectedTaskGroup] = useState(-1)

    return (
      <div style={styles.containerMain}>
        <Navbar/>
        <TaskGroupList setTaskGroup={setSelectedTaskGroup} />
        <ActiveTasks taskGroup={selectedTaskGroup} setTaskGroup={setSelectedTaskGroup}/>
      </div>
    );
  }
  
  export default Home;
  