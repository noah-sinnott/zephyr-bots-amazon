import React, {useState} from "react";
import Navbar from '../../Components/Navbar/Navbar'
import AddToWatchlist from '../../Components/AddToWatchlist/AddToWatchlist'
import styles from './styles'
import Header from "../../Components/Header/Header";
  function Home() {

    const [addItemPopup, setAddItemPopup] = useState(false)

    return (
      <div style={styles.containerMain}>
        <Navbar at={'Home'}/>
        <div>
        <Header title={'Tasks'}/>
        <button onClick={() => setAddItemPopup(true)}>
            <p>Add Task</p>
        </button>
        </div>
        {addItemPopup && <AddToWatchlist setPopup={setAddItemPopup}/>}
      </div>
    );
  }
  
  export default Home;
  