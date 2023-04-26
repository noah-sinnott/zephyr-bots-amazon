import Navbar from '../../Components/Navbar/Navbar'
import React, {useContext, useState} from "react";
import styles from './styles'
import { Context } from "../../App";


  function Help() {

    const context = useContext(Context)

    return (
      <div style={styles.containerMain}>
        <Navbar/>
          <div style={styles.area}>
            <div style={styles.mainArea}>
              <p>Coming soon</p>
            </div>
        </div>  
      </div>
    );
  }
  
  export default Help;
  