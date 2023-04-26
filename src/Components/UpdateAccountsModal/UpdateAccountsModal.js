import React, {useContext, useState} from "react";
import styles from './styles'

import {Context} from '../../App'

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button'

  function UpdateAccountsModal({setOpen, isOpen, accountId}) {

    const context = useContext(Context)

    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    async function update(){
      
    let accounts = context.data.database.accounts

    if(accountId){
      if(name != '') accounts[accountId].Name = name
      if(username != '') accounts[accountId].Username = username
      if(password != '') accounts[accountId].Password = password
    } else {
      await Object.entries(accounts).map(([key, value]) => {
        if(username != '') value.Username = username
        if(password != '') value.Password = password
      })
    }
      const updatedDatabase = { ...context.data.database, accounts: accounts };
      context.updateData({database: updatedDatabase });
      exit()
    }

    function exit(){
      setOpen(false)
      setName('')
      setUsername('');
      setPassword('');
    }

    return (
      <>
      {isOpen &&
      <div style={styles.background}>
        <div style={styles.mainContainer}>
        <div style={styles.form}>

        {accountId && 
          <TextField value={name} onChange={(event) => setName(event.target.value)} id="name" label="Name" variant="outlined" />
        }
          <TextField value={username} onChange={(event) => setUsername(event.target.value)} id="username" label="Username" variant="outlined" />

          <TextField  value={password} onChange={(event) => setPassword(event.target.value)} id="password" label="Password"variant="outlined" />

        <div style={styles.submitButtons}>
        <Button variant="contained" size="large" onClick={() => update()}>
          Update All
        </Button>
        <Button variant="outlined"  style={{ color: 'red', borderColor: 'red' }} size="large" onClick={() => exit()}>
          Cancel
        </Button>         
        </div>
        </div>
        </div>
      </div> 
      }
      </>
    );
  }
  
  export default UpdateAccountsModal;
  