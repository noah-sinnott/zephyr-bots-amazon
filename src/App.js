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


export const Context = createContext({ 
    data: {database:{}},
    updateData: () => {}
  });

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

function App() {
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState({});
  const dataRef = useRef(data);

  useEffect(() => {
    const storedDatabase = localStorage.getItem("database");
    if (!storedDatabase || storedDatabase === "{}") {
      const initialDatabase = {database: {userInfo: defaultUserInfo, taskGroups: {}, settings: defaultSettings, accounts: {}, billing: {}, proxyGroups: {}}};
      localStorage.setItem("database", JSON.stringify(initialDatabase));
      setData(initialDatabase);
      setLoading(false)
    } else {
      let parsedDatabase = JSON.parse(storedDatabase);
      Object.entries(parsedDatabase?.database?.taskGroups).forEach(([key, value]) => {
        Object.entries(value?.tasks).forEach(([key, value]) => {
          value.notifications = []
          value.scriptRunning = false
        })
      })
      updateData(parsedDatabase);
      setLoading(false)
    }
  }, []);

  function isEmpty(obj) {
    return Object.keys(obj).length === 0;
  }
  
  useEffect(() => {
    if(!isEmpty(data)) {
      dataRef.current = data;
      localStorage.setItem("database", JSON.stringify(data));
    }
  }, [data]);

  const updateData = (newData) => {
    setData({...data, ...newData})
  };

  useEffect(() => { 
    const handleAmazonDataGood = (event, taskId, taskGroupId, eventData) => {
      const currentData = dataRef.current; 
      const cleanStr = eventData.toString().replace(/[\r\n]+/gm, '');
      console.log(currentData.database.taskGroups, taskGroupId)
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
  }, []);

  if(loading) return null

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