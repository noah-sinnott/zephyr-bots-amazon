import React, {useContext, useState, useEffect} from "react";
import Navbar from '../../Components/Navbar/Navbar'
import styles from './styles'
import ProxyGroupList from "../../Components/ProxyGroupList/ProxyGroupList";
import ProxyGroup from "../../Components/ProxyGroup/ProxyGroup"; 
import { Context } from "../../App";

  function Home() {

    const [selectedProxyGroup, setSelectedProxyGroup] = useState(false)
    const context = useContext(Context)

    useEffect(() => {
      if(Object.hasOwn(context.data.database.proxyGroups, context.data.database.userInfo.proxyGroup))setSelectedProxyGroup(context.data.database.userInfo.proxyGroup)
      }, [])

    return (
      <div style={styles.containerMain}>
        <Navbar/>
        <ProxyGroupList setProxyGroupId={setSelectedProxyGroup} />
        <ProxyGroup proxyGroupId={selectedProxyGroup} setProxyGroupId={setSelectedProxyGroup}/>
      </div>
    );
  }
  
  export default Home;
  