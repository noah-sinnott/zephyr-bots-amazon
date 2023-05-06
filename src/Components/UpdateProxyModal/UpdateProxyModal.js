import React, {useContext, useEffect, useState} from "react";
import styles from './styles'

import {Context} from '../../App'
import { Input, Modal, Button } from "@mui/material";


  function UpdateProxyModal({setOpen, isOpen, proxyId, proxyGroupId}) {

    const context = useContext(Context)

    const [ip, setIp] = useState('');
    const [port, setPort] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    useEffect(()=>{
      if(!proxyId) return
      setIp(context.data.database.proxyGroups[proxyGroupId].proxies[proxyId].ip)
      setPort(context.data.database.proxyGroups[proxyGroupId].proxies[proxyId].port)
      if(context.data.database.proxyGroups[proxyGroupId].proxies[proxyId].username !== false) {
        setUsername(context.data.database.proxyGroups[proxyGroupId].proxies[proxyId].username)
      } else {
        setUsername('')
      }
      if(context.data.database.proxyGroups[proxyGroupId].proxies[proxyId].password !== false) {
        setPassword(context.data.database.proxyGroups[proxyGroupId].proxies[proxyId].password)
      } else {
        setPassword('')
      }
    },[isOpen])

    
    function update(){
    if(!ip || !port) return

    let proxyGroups = context.data.database.proxyGroups

    proxyGroups[proxyGroupId].proxies[proxyId].ip = ip
    proxyGroups[proxyGroupId].proxies[proxyId].port = port
    proxyGroups[proxyGroupId].proxies[proxyId].username = username === '' ?  false : username
    proxyGroups[proxyGroupId].proxies[proxyId].password = password === '' ? false : password

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
    }

    return (
      <Modal
        open={isOpen}
        onClose={() => exit()}
        aria-labelledby="Update Proxy"
        aria-describedby="Update Proxy"
      >
      <div style={styles.content}>

        <div style={styles.title}>
          <h1>Update Proxy</h1>
        </div>

 
        <div style={styles.inputContainer}>
        <p>Ip:</p>
        <Input value={ip} disableUnderline={true} onChange={(event) => setIp(event.target.value)} id="ip" sx={styles.textInput} placeholder="Enter Ip"/>
        </div>

        <div style={styles.inputContainer}>
        <p>Port:</p>
        <Input value={port} disableUnderline={true} onChange={(event) => setPort(event.target.value)} id="port" sx={styles.textInput} placeholder="Enter Port"/>
        </div>

        <div style={styles.inputContainer}>
            <p>Username:</p>
          <Input value={username} onChange={(event) => setUsername(event.target.value)} sx={styles.textInput} disableUnderline={true} placeholder="Enter Username" id="username" />
        </div>
     
      <div style={styles.inputContainer}>
      <p>Password:</p>
      <Input value={password} onChange={(event) => setPassword(event.target.value)} id="Password" sx={styles.textInput} disableUnderline={true} placeholder="Enter Password"/>
      </div>

        <div style={styles.submitButtons}>

        <Button variant="contained" size="large" style={styles.updateButton}  disableElevation onClick={() => update()}>
          Update Proxy
        </Button>

        <Button variant="outlined" style={styles.cancelButton} size="medium"  disableElevation onClick={() => exit()}>
          Cancel
        </Button>         

        </div>
        </div>
        </Modal>
    );
  }
  
  export default UpdateProxyModal;
  