import React from "react";
import { useNavigate, useLocation  } from 'react-router-dom'; 
import styles from './styles'

import gear from '../../assets/gear.png'
import home from '../../assets/home.png'
import Proxy from '../../assets/proxy.png'
import Profile from '../../assets/profile.png'
import Help from '../../assets/help.png'
import Card from '../../assets/card.png'

function Navbar() {

  const navigate = useNavigate();
  const location = useLocation();

    return (
      <div style={styles.containerMain}>
        <button style={location.pathname !== '/'? styles.button: styles.selectedButton} onClick={() => navigate('/')}>
        <img style={styles.image} alt='Home' src={home}/>
        </button>
        <button  style={location.pathname !=='/Accounts'? styles.button: styles.selectedButton} onClick={() => navigate('/Accounts')}>
          <img style={styles.image} alt={'Accounts'} src={Profile}/>
        </button>
        <button  style={location.pathname !=='/Billing'? styles.button: styles.selectedButton} onClick={() => navigate('/Billing')}>
          <img style={styles.image} alt={'Billing'} src={Card}/>
        </button>
        <button  style={location.pathname !=='/Proxies'? styles.button: styles.selectedButton} onClick={() => navigate('/Proxies')}>
          <img style={styles.image} alt={'Proxies'} src={Proxy}/>
        </button>
        <button  style={location.pathname !=='/Help'? styles.button: styles.selectedButton} onClick={() => navigate('/Help')}>
          <img style={styles.image} alt={'Help'} src={Help}/>
        </button>
        <button  style={location.pathname !=='/Settings'? styles.button: styles.selectedButton} onClick={() => navigate('/Settings')}>
          <img style={styles.image} alt={'Settings'} src={gear}/>
        </button>
      </div>
    );
  }
  
  export default Navbar;
  