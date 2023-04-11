import React from "react";
import Navbar from '../../Components/Navbar/Navbar'
import styles from './styles'
import Header from "../../Components/Header/Header";

  function Analytics() {
    return (
      <div style={styles.containerMain}>
        <Navbar at={'Analytics'}/>
        <div>
        <Header title={'Analytics'}/>
        </div>
      </div>
    );
  }
  
  export default Analytics;
  