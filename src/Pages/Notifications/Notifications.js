import React from "react";
import Navbar from '../../Components/Navbar/Navbar'
import styles from './styles'
import Header from "../../Components/Header/Header";

  function Notifications() {
    return (
      <div style={styles.containerMain}>
        <Navbar at={'Notifications'}/>
        <div>
        <Header title={'Notifications'}/>
        </div>
      </div>
    );
  }
  
  export default Notifications;
  