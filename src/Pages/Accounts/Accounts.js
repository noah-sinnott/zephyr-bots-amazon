import Navbar from '../../Components/Navbar/Navbar'
import React, {useContext, useState} from "react";
import styles from './styles'
import { Context } from "../../App";
import colors from '../../colors/colors';
import AddAccountModal from '../../Components/AddAccountModal/AddAccountModal';
import UpdateAccountsModal from '../../Components/UpdateAccountsModal/UpdateAccountsModal.js'
import { Button, IconButton } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
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

    function MouseOver(event) {
      event.target.closest('tr').style.background = colors.highlightMini;
    }
  
    function MouseOut(event){
      const row = event.target.closest('tr');
      row.style.background = "";   
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
                    <Button variant="contained" size="medium" style={styles.button}  disableElevation onClick={() => setAddAccountModal(!addAccountModal)}>
                        Add Account
                      </Button>
                      <Button variant="contained" size="medium" style={styles.button}  disableElevation onClick={() => {
                      setUpdateAccounts(!updateAccounts)
                      setUpdateAccountId(false)
                      }}>
                        Update All
                      </Button>
                      <Button variant="contained" size="medium" style={styles.button}  disableElevation onClick={() => deleteAll()}>
                        Delete All
                      </Button>
                </div>
            <table style={styles.table}>
            <thead>
              <tr style={styles.tableHeaderBackground}>
                <th style={styles.tableHeader}>Name</th>
                <th style={styles.tableHeader}>Username</th>
                <th style={styles.tableHeader}>Password</th>
                <th style={styles.tableHeader}>Actions</th>
              </tr>
            </thead>
            <tbody>
            {Object.entries(context.data.database.accounts).map(([key, value]) => {
              return (
                <tr onMouseOver={MouseOver} onMouseOut={MouseOut} style={styles.tableRow} key={key}>
                  <td  style={styles.tableItem}>{value.name}</td>
                  <td  style={styles.tableItem}>{value.username}</td>
                  <td  style={styles.tableItem}>{value.password}</td>
                  <td  style={styles.tableItem}>
                  <IconButton aria-label="delete" size="small" style={{color: colors.red}}onClick={() => deleteAccount(key)}>
                      <DeleteIcon />
                    </IconButton>
                    <IconButton aria-label="Edit" size="small" style={{color: colors.white}} onClick={() => {
                      setUpdateAccounts(!updateAccounts)
                      setUpdateAccountId(key)
                      }}>
                      <EditIcon />
                    </IconButton>
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
  