import React, {useState} from "react";
import Navbar from '../../Components/Navbar/Navbar'
import AddToWatchlist from '../../Components/AddToWatchlist/AddToWatchlist'
import styles from './styles'
import TaskGroupList from '../../Components/TaskGroupsList/TaskGroupList'
import ActiveTasks from '../../Components/ActiveTasks/ActiveTasks'

  function Home() {

    const [addItemPopup, setAddItemPopup] = useState(false)

    return (
      <div style={styles.containerMain}>
        <Navbar at={'Home'}/>
        <TaskGroupList/>
        <ActiveTasks/>
        {addItemPopup && <AddToWatchlist setPopup={setAddItemPopup}/>}
      </div>
    );
  }
  
  export default Home;
  