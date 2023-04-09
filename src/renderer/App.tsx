import {
  HashRouter,
  Route,
  Routes,
} from "react-router-dom";
import React from 'react'

import Home from './Pages/Home/Home'
import Accounts from './Pages/Accounts/Accounts'
import Notifications from './Pages/Notifications/Notifications'

function App() {
  return (
  <HashRouter>
    <Routes>
      <Route path="/" Component={ Home } />
      <Route path="/Accounts" Component={ Accounts } />
      <Route path="/Notifications" Component={ Notifications } />
    </Routes>
  </HashRouter>
  );
}

export default App;
