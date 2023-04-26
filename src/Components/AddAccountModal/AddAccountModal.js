import React, {useContext, useState} from "react";
import styles from './styles'

import {Context} from '../../App'

import FormLabel from '@material-ui/core/FormLabel';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button'
import { generateId } from "../../helpers/generateId";

  function AddAccountModal({setOpen, isOpen}) {

    const context = useContext(Context)

    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    async function addAccount(){
      if(!name) return
      if(!username) return
      if(!password) return

      let id = generateId()
      let newAccount = {
        Name: name,
        Username: username,
        Password: password,
      }
      let database = context.data.database
      database.accounts[id] = newAccount
      context.updateData({database: database });
      exit()
    }

    function exit(){
      setOpen(false)
      setName('')
      setUsername('')
      setPassword('');
    }

    return (
      <>
      {isOpen &&
      <div style={styles.background}>
        <div style={styles.mainContainer}>
        <div style={styles.form}>

              <FormLabel id="NameLabel">Account Name</FormLabel>
              <TextField value={name} onChange={(event) => setName(event.target.value)} id="name" label="Account Name" variant="outlined" />
              <FormLabel id="UsernameLabel">Username</FormLabel>
              <TextField value={username} onChange={(event) => setUsername(event.target.value)} id="username" label="Username" variant="outlined" />
              <FormLabel id="Password">Password</FormLabel>
              <TextField value={password} onChange={(event) => setPassword(event.target.value)} id="Password" label="Password" variant="outlined" />

        <div style={styles.submitButtons}>

        <Button variant="contained" size="large" onClick={() => addAccount()}>
          Add Account
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
  
  export default AddAccountModal;
  