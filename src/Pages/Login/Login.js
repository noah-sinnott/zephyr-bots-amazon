import React, {useEffect, useState} from "react";
import styles from './styles'
import { Input, Button, formControlClasses } from "@mui/material";
import { apiSignIn } from "../../helpers/api";

  function Login({setAuthenticated, setLicenceKey, updateData}) {

    const [key, setKey] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
      let storageKey = localStorage.getItem("licenceKey")
      signIn(storageKey)
    }, [])

    const defaultSettings = { 
      typingSpeed: [0.1, 0.3],
      waitSpeed: [1, 1.5],
      refreshRate: [10, 15],
      visible: false,
    }
  
    const defaultUserInfo = { 
      taskGroup: false,
      proxyGroup: false
    }

    async function signIn(licenceKey){
      if(!licenceKey || licenceKey == "false") return 

      const machine = await window.electronAPI.getMachineId();
      
        let res = await apiSignIn(licenceKey, machine)
        if(!res.data){
           localStorage.setItem("database", JSON.stringify({}));
           localStorage.setItem("licenceKey", false)
           setLicenceKey(false)
           setError(res.error)
           setAuthenticated(false)
        } else {
           localStorage.setItem("licenceKey", licenceKey)    
            const storedDatabase = localStorage.getItem("database");
            if (!storedDatabase || storedDatabase === "{}") {
              const initialDatabase = {database: {userInfo: defaultUserInfo, taskGroups: {}, settings: defaultSettings, accounts: {}, billing: {}, proxyGroups: {}}};
              localStorage.setItem("database", JSON.stringify(initialDatabase));
              updateData(initialDatabase);
            } else {
              let parsedDatabase = JSON.parse(storedDatabase);
              Object.entries(parsedDatabase?.database?.taskGroups).forEach(([key, value]) => {
                Object.entries(value?.tasks).forEach(([key, value]) => {
                  value.notifications = []
                  value.scriptRunning = false
                })
              })
              updateData(parsedDatabase);     
            }   
           setLicenceKey(licenceKey)
           setAuthenticated(res.data)
        }
    }


    return (
      <div style={styles.container}>
      <div style={styles.content}>

     <div style={styles.inputContainer}>
        <p>Licence Key:</p>
        <Input value={key} onChange={(event) => setKey(event.target.value)} sx={styles.textInput} disableUnderline={true} placeholder="Enter Licence Key" id="key" />
     </div>

      <p style={styles.errorText}>{error}</p>
        <div style={styles.submitButtons}>
        <Button variant="contained" size="large" style={styles.addButton}  disableElevation onClick={() => signIn(key)}>
          Sign In
        </Button>       
        </div>

      </div>
      </div>
    );
  }
  
  export default Login;
  