import Navbar from '../../Components/Navbar/Navbar'
import React, {useContext, useEffect, useState} from "react";
import styles from './styles'
import { Context } from "../../App";
import bin from '../../assets/bin.png'
import Info from '../../assets/info.png'

import AddAccountModal from '../../Components/AddAccountModal/AddAccountModal';
import UpdateAccountsModal from '../../Components/UpdateAccountsModal/UpdateAccountsModal.js'

  function Accounts() {

    const context = useContext(Context)
    const [addAccountModal, setAddAccountModal] = useState(false)
    const [updateAccounts, setUpdateAccounts] = useState(false)
    const [updateAccountId, setUpdateAccountId] = useState(false)

    function deleteAll () {
      const updatedDatabase = { ...context.data.database, accounts: {} };
      context.updateData({database: updatedDatabase });
    }

    function deleteAccount(id){
      let accounts = context.data.database.accounts
      delete accounts[id]
      const updatedDatabase = { ...context.data.database, accounts: accounts };
      context.updateData({database: updatedDatabase });
    }

    return (
      <div style={styles.containerMain}>
        <AddAccountModal isOpen={addAccountModal} setOpen={setAddAccountModal}/>
        <UpdateAccountsModal isOpen={updateAccounts} setOpen={setUpdateAccounts} accountId={updateAccountId}/>
        <Navbar/>
          <div style={styles.TableAreaHolder}>
            <div style={styles.TableArea}>
                <div style={styles.actions}>
                    <p>Accounts: {Object.keys(context.data.database.accounts).length}</p>
                    <button style={styles.button} onClick={() => setAddAccountModal(!addAccountModal)}>Add Account</button>
                    <button style={styles.button} onClick={() => {
                      setUpdateAccounts(!updateAccounts)
                      setUpdateAccountId(false)
                      }}>Update All</button>
                    <button style={styles.button} onClick={() => deleteAll()}>Delete All</button>
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
            {Object.entries(context.data.database.accounts).map(([key, value]) => {
              return (
                <tr style={styles.tableRow} key={key}>
                  <td>{value.Name}</td>
                  <td>{value.Username}</td>
                  <td>{value.Password}</td>
                  <td>
                     <img src={bin} style={styles.image} onClick={() => deleteAccount(key)}/> 
                     <img src={Info} style={styles.image} onClick={() => {
                      setUpdateAccounts(!updateAccounts)
                      setUpdateAccountId(key)
                      }}/> 
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
  