import React, {useState} from "react";
import Navbar from '../../Components/Navbar/Navbar'
import styles from './styles'
import ProxyGroupList from "../../Components/ProxyGroupList/ProxyGroupList";
import ProxyGroup from "../../Components/ProxyGroup/ProxyGroup"; 

  function Home() {

    const [selectedProxyGroup, setSelectedProxyGroup] = useState(false)

    return (
      <div style={styles.containerMain}>
        <Navbar/>
        <ProxyGroupList setProxyGroupId={setSelectedProxyGroup} />
        <ProxyGroup proxyGroupId={selectedProxyGroup} setProxyGroupId={setSelectedProxyGroup}/>
      </div>
    );
  }
  
  export default Home;
  