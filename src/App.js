import {
  HashRouter,
  Route,
  Routes,
} from "react-router-dom";
import React from 'react'

import Home from './Pages/Home/Home'
import Settings from './Pages/Settings/Settings'
import Notifications from './Pages/Notifications/Notifications'
import Analytics from './Pages/Analytics/Analytics'
function App() {
  return (
  <div style={{width: '100%', height: '100%'}}>
  <HashRouter>
    <Routes>
      <Route path="/" Component={ Home } />
      <Route path="/Settings" Component={ Settings } />
      <Route path="/Notifications" Component={ Notifications } />
      <Route path="/Analytics" Component={ Analytics } />
    </Routes>
  </HashRouter>    
  </div>

  );
}

export default App;