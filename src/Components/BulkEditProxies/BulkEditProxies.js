import React, {useContext, useState} from "react";
import styles from './styles'

import {Context} from '../../App'
import { Input, Modal, Button } from "@mui/material";
import Select from 'react-select'

  function BulkEditProxies({setOpen, isOpen, proxyGroupId}) {

    const context = useContext(Context)

    const [ip, setIp] = useState('');
    const [port, setPort] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [activeFields, setActiveFields] = useState([]);

    const fields = [{value: 'ip', label: 'IP'}, {value: 'port', label: 'Port'},{value: 'username', label: 'Username'}, {value: 'password', label: 'Password'}]

    function formatFields(inputedFields){
      let arr = []
  
      inputedFields.forEach((field) => {
          arr.push(field.value)
      })
  
      activeFields.forEach((currentField) =>{
          if(!arr.includes(currentField)){
              if(currentField === 'username') setUsername('')
              if(currentField === 'password') setPassword('')
              if(currentField === 'port') setPort('')
              if(currentField === 'ip') setIp('')
          }
      })
  
      setActiveFields(arr)
      }
   
    function update(){
      
      if(activeFields.includes('ip')){
        if(!ip || ip === "") return
      }
      if(activeFields.includes('port')){
        if(!port || port === "") return
      }

      let proxyGroups = context.data.database.proxyGroups

      Object.entries(proxyGroups[proxyGroupId].proxies).forEach(([key, value], index) => {
          if(activeFields.includes('ip')) value.ip = ip
          if(activeFields.includes('port')) value.port = port;
          if(activeFields.includes('username')) value.username = username;
          if(activeFields.includes('password')) value.password = password;
        });

      const updatedDatabase = { ...context.data.database, proxyGroups: proxyGroups };
      context.updateData({database: updatedDatabase });
      exit()
    }

    function exit(){
      setOpen(false)
      setIp('')
      setPort('')
      setUsername('');
      setPassword('');
      setActiveFields([])
    }

    return (
      <Modal
        open={isOpen}
        onClose={() => exit()}
        aria-labelledby="Update Proxies"
        aria-describedby="Update Proxies"
      >
      <div style={styles.content}>

        <div style={styles.title}>
          <h1>Update Proxies</h1>
        </div>

        <div style={styles.dropDownContainer}>
            <p>Fields:</p>
            <Select
              name="Fields"
              options={fields}
              isMulti
              isClearable={true}
              onChange={(e) => formatFields(e)}
              styles={styles.dropDown}
            />
        </div>

        {activeFields.includes('ip') && 
        <div style={styles.inputContainer}>
        <p>IP:</p>
        <Input value={ip} disableUnderline={true} onChange={(event) => setIp(event.target.value)} id="ip" sx={styles.textInput} placeholder="Enter IP"/>
        </div>}

        {activeFields.includes('port') && 
        <div style={styles.inputContainer}>
        <p>Port:</p>
        <Input value={port} disableUnderline={true} onChange={(event) => setPort(event.target.value)} id="port" sx={styles.textInput} placeholder="Enter Port"/>
        </div>}

        {activeFields.includes('username') && 
        <div style={styles.inputContainer}>
            <p>Username:</p>
          <Input value={username} onChange={(event) => setUsername(event.target.value)} sx={styles.textInput} disableUnderline={true} placeholder="Enter Username" id="username" />
        </div>
  }
     
     {activeFields.includes('password') && 
      <div style={styles.inputContainer}>
      <p>Password:</p>
      <Input value={password} onChange={(event) => setPassword(event.target.value)} id="Password" sx={styles.textInput} disableUnderline={true} placeholder="Enter Password"/>
      </div>}

        <div style={styles.submitButtons}>

        <Button variant="contained" size="large" style={styles.updateButton}  disableElevation onClick={() => update()}>
          Update Proxies
        </Button>

        <Button variant="outlined" style={styles.cancelButton} size="medium"  disableElevation onClick={() => exit()}>
          Cancel
        </Button>         

        </div>
        </div>
        </Modal>
    );
  }
  
  export default BulkEditProxies;
  