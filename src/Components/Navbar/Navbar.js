import React from "react";
import { useNavigate  } from 'react-router-dom'; 
import styles from './styles'

import gear from '../../assets/gear.png'
import bell from '../../assets/bell.png'
import analytics from '../../assets/analytics.png'
import home from '../../assets/home.png'

function Navbar({at}) {

  const navigate = useNavigate();

    return (
      <div style={styles.containerMain}>

        <button style={at !== 'Home'? styles.button: styles.selectedButton} onClick={() => navigate('/')}>
        <img style={styles.image} src={home}/>
        </button>
        <button style={at !== 'Notifications'? styles.button: styles.selectedButton} onClick={() => navigate('/Notifications')}>
        <img style={styles.image} src={bell}/>
        </button>
        <button  style={at !=='Settings'? styles.button: styles.selectedButton} onClick={() => navigate('/Settings')}>
          <img style={styles.image} src={gear}/>
        </button>
        <button style={at !=='Analytics'? styles.button: styles.selectedButton} onClick={() => navigate('/Analytics')}>
          <img src={analytics} style={styles.image}/>
        </button>

      </div>
    );
  }
  
  export default Navbar;
  