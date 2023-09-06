import {
  HashRouter,
  Route,
  Routes,
} from "react-router-dom";
import React, {useEffect, createContext, useState, useRef} from 'react'
import Home from './Pages/Home/Home'
import Settings from './Pages/Settings/Settings'
import Help from './Pages/Help/Help'
import Proxies from './Pages/Proxies/Proxies'
import Accounts from './Pages/Accounts/Accounts'
import Billing from './Pages/Billing/Billing'
import Login from "./Pages/Login/Login";
import { apiCheckKeyMachineValid } from "./helpers/api";


export const Context = createContext({ 
    data: {database:{}},
    updateData: () => {}
  });

function App() {
  const [data, setData] = useState({});
  const [authenticated, setAuthenticated] = useState(false);
  const [licenceKey, setLicenceKey] = useState(false);
  const [ws, setWs] = useState(null);

  const dataRef = useRef(data);
  const timerRef = useRef(null);
  
  useEffect(() => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
      if (authenticated) {
        if (authenticated?.ends_at) {
          let endsAt = new Date(authenticated.ends_at);
          let currentTime = new Date();
          let timeToWait = endsAt - currentTime;
          if (timeToWait > 0) {
            timerRef.current = setTimeout(() => {
              checkAuthenticationStatus();
            }, timeToWait);
          } else {
            checkAuthenticationStatus();
          }
        }          
        window.electronAPI.authenticated()
      } else {
        window.electronAPI.unAuthenticated()
      }

    return () => {
          if (timerRef.current) {
            clearTimeout(timerRef.current);
          }
        };
  }, [authenticated]);


  useEffect(() => {
    if (ws) {
      ws.close();
    }
    if (licenceKey) {
      const newWs = new WebSocket(`ws://localhost:3005/${licenceKey}`);
      newWs.onmessage = function(event) {
        checkAuthenticationStatus();
      };      
      newWs.onopen = function(event) {
        console.log("opened");
      };      
      setWs(newWs);
    }
  }, [licenceKey]);

  useEffect(() => {
    if (!isEmpty(data)) {
      dataRef.current = data;
      localStorage.setItem('database', JSON.stringify(data));
    }
  }, [data]);

  function isEmpty(obj) {
    return Object.keys(obj).length === 0;
  }
  
  async function checkAuthenticationStatus() {
    if(!licenceKey) return 
    const machine = await window.electronAPI.getMachineId();
    let res = await apiCheckKeyMachineValid(licenceKey, machine)
    if(res.error){
      localStorage.setItem("database", JSON.stringify({}));
      localStorage.setItem("licenceKey", false);
      setAuthenticated(false)
      setLicenceKey(false)
    } else {
      localStorage.setItem("licenceKey", licenceKey)
      setLicenceKey(licenceKey)
      setAuthenticated(res.data)
    }
  }

  const updateData = (newData) => {
    setData({...data, ...newData})
  };

  useEffect(()=> {
    const handleAmazonDataGood = (event, taskId, taskGroupId, eventData) => {
      const currentData = dataRef.current; 
      const cleanStr = eventData.toString().replace(/[\r\n]+/gm, '');
      let notifs = currentData.database.taskGroups[taskGroupId].tasks[taskId].notifications;
      let newNotifs = [...notifs, cleanStr];
      let newDB = currentData.database;
      newDB.taskGroups[taskGroupId].tasks[taskId].notifications = newNotifs;
      updateData({ database: newDB });
    }

    const handleAmazonDataBad = (event, taskId, taskGroupId, eventData) => {
      const currentData = dataRef.current; 
      console.error(`stderr: ${eventData}`);
      let newDB = currentData.database;
      newDB.taskGroups[taskGroupId].tasks[taskId].scriptRunning = false;
      updateData({ database: newDB })
    }

    const handleAmazonDataClose = (event, taskId, taskGroupId, eventData) => {
      const currentData = dataRef.current; 
      console.log(`child process exited with code ${eventData}`);
      let newDB = currentData.database;
      newDB.taskGroups[taskGroupId].tasks[taskId].scriptRunning = false;
      updateData({ database: newDB });
    }

    window?.electronAPI?.amazonDataGood(handleAmazonDataGood);
    window?.electronAPI?.amazonDataBad(handleAmazonDataBad);
    window?.electronAPI?.amazonDataClose(handleAmazonDataClose);
  },[])

  if(!authenticated) return <Login setAuthenticated={setAuthenticated} setLicenceKey={setLicenceKey} updateData={updateData}/>

  return (
    <Context.Provider value={{ data, updateData }}>
      <HashRouter>
        <Routes>
          <Route path="/" Component={ Home } />
          <Route path="/Settings" Component={ Settings } />
          <Route path="/Proxies" Component={ Proxies } />
          <Route path="/Accounts" Component={ Accounts } />
          <Route path="/Help" Component={ Help } />
          <Route path="/Billing" Component={ Billing } />
        </Routes>
      </HashRouter>    
      </Context.Provider>
    );
}

export default App;