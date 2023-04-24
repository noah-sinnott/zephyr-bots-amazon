import Navbar from '../../Components/Navbar/Navbar'
import React, {useContext, useEffect, useState} from "react";
import styles from './styles'
import { Context } from "../../App";
import Stop from '../../assets/stop.png'
import AddAccountModal from '../../Components/AddAccountModal/AddAccountModal';

  function Accounts() {

    const context = useContext(Context)
    const [addAccountModal, setAddAccountModal] = useState(false)
    return (
      <div style={styles.containerMain}>
        <AddAccountModal isOpen={addAccountModal} setOpen={setAddAccountModal}/>
        <Navbar at={'Notifications'}/>
          <div style={styles.TableAreaHolder}>
            <div style={styles.TableArea}>
                <div style={styles.actions}>
                    <p>Accounts: {context.data.database.accounts.length}</p>
                    <button style={styles.button} onClick={() => setAddAccountModal(!addAccountModal)}>Add Account</button>
                    <button style={styles.button}>Update All</button>
                    <button style={styles.button}>Delete All</button>
                </div>
            <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.tableHeader}>Name</th>
                <th style={styles.tableHeader}>Username</th>
                <th style={styles.tableHeader}>Password</th>
                <th style={styles.tableHeader}>Actions</th>
              </tr>
            </thead>
            <tbody>
             {context.data.database.accounts.map((account, index) => {
              return (
                <tr style={styles.tableRow} key={index}>
                  <td>{account.Name}</td>
                  <td>{account.username}</td>
                  <td>{account.password}</td>
                  <td>
                     <img src={Stop} style={styles.image}/> 
                     <img src={Stop} style={styles.image}/> 
                  </td>
                </tr>
              );
             })}          
            </tbody>
          </table>
          </div>
        </div>  
      </div>
    );
  }
  
  export default Accounts;
  