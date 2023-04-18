import {
  HashRouter,
  Route,
  Routes,
} from "react-router-dom";

import React, {useEffect, createContext, useState} from 'react'

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

function App() {

  const [data, setData] = useState({database: {taskGroups: [], settings: {}}});

  useEffect(() => {
    const storedDatabase = localStorage.getItem("database");
    if (!storedDatabase) {
      const initialDatabase = {database: {taskGroups: [], settings: []}};
      localStorage.setItem("database", JSON.stringify(initialDatabase));
    } else {
      const parsedDatabase = JSON.parse(storedDatabase);
      setData(parsedDatabase);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("database", JSON.stringify(data));
  }, [data])


  const updateData = (newData) => {
    setData({...data, ...newData});
  };

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