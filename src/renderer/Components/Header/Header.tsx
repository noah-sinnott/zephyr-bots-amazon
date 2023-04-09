import React from "react";
import { useNavigate  } from 'react-router-dom'; 
import styles from './styles'

  function Header() {

    const navigate = useNavigate();

    return (
      <div style={styles.containerMain}>
        <button  onClick={() => navigate('/')}>
                    <p>Home</p>
        </button>
        <button onClick={() => navigate('/Accounts')}>
                    <p>Accounts</p>
        </button>
        <button onClick={() => navigate('/Notifications')}>
                    <p>Notifications</p>
        </button>
      </div>
    );
  }
  
  export default Header;
  