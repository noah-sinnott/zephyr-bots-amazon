import React from "react";
import Navbar from '../../Components/Navbar/Navbar'
import styles from './styles'
import Header from "../../Components/Header/Header";
 
function Settings() {
    return (
      <div style={styles.containerMain}>
        <Navbar at={'Settings'}/>
        <div>
        <Header title={'Settings'}/>
        </div>
      </div>
    );
  }
  
  export default Settings;
  