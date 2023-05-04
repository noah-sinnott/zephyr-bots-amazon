import React, {useContext, useState} from "react";
import styles from './styles'

import {Context} from '../../App'

import { Input, Modal, Button  } from "@mui/material";

import { generateId } from '../../helpers/generateId'

  function AddProxiesModal({setOpen, isOpen, proxyGroupId}) {

    const context = useContext(Context)

    const [proxies, setProxies] = useState('');

    function addProxies() {
      let obj = {};
    
      proxies.split('\n').forEach((unformatted) => {
        let proxy = unformatted.split(':');
        let id = generateId();
        let temp = {
          ip: proxy[0] || false,
          port: proxy[1] || false,
          username: proxy[2] || false,
          password: proxy[3] || false,
        };
        if (temp.ip === false || temp.port === false) {
          return;
        }
        obj[id] = temp;
      });
    
      let proxyGroups = context.data.database.proxyGroups;
    
      proxyGroups[proxyGroupId].proxies = {
        ...proxyGroups[proxyGroupId].proxies,
        ...obj,
      };
    
      const updatedDatabase = {
        ...context.data.database,
        proxyGroups: proxyGroups,
      };
      context.updateData({ database: updatedDatabase });
    
      exit();
    }

    function exit(){
      setOpen(false)
      setProxies('');
    }

    return (
      <Modal
      open={isOpen}
      onClose={() => exit()}
      aria-labelledby="Add Proxies"
      aria-describedby="Add Proxies"
    >
        <div style={styles.content}>

        <div style={styles.title}>
          <h1>Add Proxies</h1>
        </div>

        <div style={styles.inputContainer}>
          <p>Proxies:</p>
          <Input value={proxies} disableUnderline={true} multiline onChange={(event) => setProxies(event.target.value)} id="proxies" style={styles.textInput} placeholder='ip:port:username:password&#10;ip:port:username:password&#10;ip:port:username:password&#10;ip:port:username:password'/>
        </div>

        <div style={styles.submitButtons}>
        <Button variant="contained" size="large" style={styles.addButton}  disableElevation onClick={() => addProxies()}>
          Add Proxies
        </Button>
        <Button variant="outlined" style={styles.cancelButton} size="medium"  disableElevation onClick={() => exit()}>
          Cancel
        </Button>     
        </div>
        </div>
    </Modal>
    );
  }
  
  export default AddProxiesModal;
  