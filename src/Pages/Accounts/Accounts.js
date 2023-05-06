import Navbar from '../../Components/Navbar/Navbar'
import React, {useContext, useState} from "react";
import styles from './styles'
import { Context } from "../../App";
import colors from '../../colors/colors';
import AddAccountModal from '../../Components/AddAccountModal/AddAccountModal';
import UpdateAccountsModal from '../../Components/UpdateAccountModal/UpdateAccountModal.js'
import { Button, IconButton } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import BulkEditAccounts from '../../Components/BulkEditAccounts/BulkEditAccounts'
import ConfirmationDialog from '../../Components/ConfirmationDialog/ConfirmationDialog';
import { kill } from '../../helpers/ScriptRunner';
  function Accounts() {

    const context = useContext(Context)
    const [addAccountModal, setAddAccountModal] = useState(false)
    const [updateAccount, setUpdateAccount] = useState(false)
    const [updateAccounts, setUpdateAccounts] = useState(false)
    const [accountId, setAccountId] = useState(false)
    const [deleteAccountsDialog, setDeleteAccountsDialog] = useState(false)
    const [deleteAccountDialog, setDeleteAccountDialog] = useState(false)

    function deleteAll () {
      let taskGroups = context.data.database.taskgroups
      Object.entries(taskGroups).forEach(([key, taskGroup]) => {
        Object.entries(taskGroup.tasks).forEach(([key, task]) => {
            if(task.pythonPID !== false){
              kill(task.pythonPID)
          }
        })
        taskGroup.tasks = {}
      })
      const updatedDatabase = { ...context.data.database, accounts: {}, taskGroups: taskGroups };
      context.updateData({database: updatedDatabase });
    }

    function deleteAccount(id){
      let taskGroups = context.data.database.taskgroups
      Object.entries(taskGroups).forEach(([key, taskGroup]) => {
        Object.entries(taskGroup.tasks).forEach(([key, task]) => {
          if(task.accounts === id){
            if(task.pythonPID !== false){
              kill(task.pythonPID)
          }
          delete taskGroup.tasks[key]
          }
        })
      })
      let accounts = context.data.database.accounts
      delete accounts[id]
      const updatedDatabase = { ...context.data.database, accounts: accounts, taskGroups: taskGroups };
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
        <ConfirmationDialog isOpen={deleteAccountsDialog} setOpen={setDeleteAccountsDialog} submit={() => deleteAll()} mainText2={'This will delete all the tasks with these accounts'} submitText={'Delete All'} mainText={'Confirm You want to delete all accounts'}/>
        <ConfirmationDialog isOpen={deleteAccountDialog} setOpen={setDeleteAccountDialog} submit={() => deleteAccount(accountId)} mainText2={'This will delete all the tasks with this account'} submitText={'Delete Account'} mainText={'Confirm you want to delete this account'}/>
        <AddAccountModal isOpen={addAccountModal} setOpen={setAddAccountModal}/>
        <UpdateAccountsModal isOpen={updateAccount} setOpen={setUpdateAccount} accountId={accountId}/>
        <BulkEditAccounts isOpen={updateAccounts} setOpen={setUpdateAccounts}/>
        <Navbar/>
          <div style={styles.TableAreaHolder}>
            <div style={styles.TableArea}>
                <div style={styles.actions}>
                    <p>Accounts: {Object.keys(context.data.database.accounts).length}</p>
                    <Button variant="contained" size="medium" style={styles.button}  disableElevation onClick={() => setAddAccountModal(!addAccountModal)}>
                        Add Account
                      </Button>
                      <Button variant="contained" size="medium" style={styles.button}  disableElevation onClick={() => {
                      setUpdateAccounts(!updateAccount)
                      }}>
                        Update All
                      </Button>
                      <Button variant="contained" size="medium" style={styles.button}  disableElevation onClick={() => setDeleteAccountsDialog(true)}>
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
                  <IconButton aria-label="delete" size="small" style={{color: colors.red}}onClick={() => {
                    setDeleteAccountDialog(true)
                    setAccountId(key)
                    }}>
                      <DeleteIcon />
                    </IconButton>
                    <IconButton aria-label="Edit" size="small" style={{color: colors.white}} onClick={() => {
                      setUpdateAccount(!updateAccount)
                      setAccountId(key)
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
  