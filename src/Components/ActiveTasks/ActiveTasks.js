import React from "react";
import styles from './styles'


function Navbar() {

    return (
      <div style={styles.containerMain}>
        <div style={styles.containerMain2}>

            <div style={styles.actions}>
                <p>Tasks: 0</p>
                <button style={styles.button}>Add Task</button>
                <button style={styles.button}>Start All</button>
                <button style={styles.button}>Stop All</button>
                <button style={styles.button}>Update All</button>
                <button style={styles.button}>Delete All</button>
            </div>

            <div style={styles.tableHeaders}>
                <p>Account</p>
                <p>Proxy Group</p>
                <p>Max Amount</p>
                <p>Max Price</p>
                <p>Status</p>
                <p>Actions</p>
            </div>

        </div>
      </div>
    );
  }
  
  export default Navbar;
  