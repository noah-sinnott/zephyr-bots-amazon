import React, {useContext, useEffect, useState} from "react";
import styles from './styles'

import {Context} from '../../App'

import { Input, Modal, Button } from "@mui/material";

  function EditProxyGroup({setOpen, isOpen, proxyGroupId, setProxyGroupId}) {

    const context = useContext(Context)
    
    const [name, setName] = useState('')

    useEffect(() => {
      if(!proxyGroupId) return
      setName(context.data.database.proxyGroups[proxyGroupId].name)
    }, [proxyGroupId])

    function saveChanges(){

      let proxyGroups = context.data.database.proxyGroups
      proxyGroups[proxyGroupId].name = name

      const updatedDatabase = { ...context.data.database, proxyGroups: proxyGroups };
      context.updateData({database: updatedDatabase });

      exit()
    }

    function deleteProxyGroup() { 
      setProxyGroupId(false) 

      let proxyGroups = context.data.database.proxyGroups
      delete proxyGroups[proxyGroupId]

      const updatedDatabase = { ...context.data.database, proxyGroups: proxyGroups };
      context.updateData({database: updatedDatabase });
      exit();
    }

    function exit(){
      setOpen(false)
    }

    return (
      <Modal
        open={isOpen}
        onClose={() => exit()}
        aria-labelledby="Edit Proxy Group"
        aria-describedby="Edit Proxy Group"
      >
        <div style={styles.content}>

        <div style={styles.title}>
          <h1>Edit Proxy Group</h1>
        </div>

        <div style={styles.inputContainer}>
        <p>Proxy Group Name:</p>
        <Input value={name} disableUnderline={true} onChange={(event) => setName(event.target.value)} id="name" sx={styles.textInput} placeholder="Enter Task Group Name"/>
        </div>

        <div style={styles.submitButtons}>

        <Button variant="contained" size="large" style={styles.addButton}  disableElevation onClick={() => saveChanges()}>
          Save Proxy Group
        </Button>

        <Button variant="contained" size="large" style={styles.addButton}  disableElevation onClick={() => deleteProxyGroup()}>
          Delete Proxy Group
        </Button> 

        <Button variant="outlined" style={styles.cancelButton} size="medium"  disableElevation onClick={() => exit()}>
          Cancel
        </Button>
                 
        </div>
        </div>
        </Modal>
    );
  }
  
  export default EditProxyGroup;
  