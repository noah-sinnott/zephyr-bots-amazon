import React, {useContext} from "react";
import styles from './styles'
import { Context } from "../../App";
import { generateId } from "../../helpers/generateId";

function ProxyGroupList({setProxyGroupId}) {

const context = useContext(Context)

function addProxyGroup(){
  let id = generateId()
  let newProxyGroup ={name: `Proxy Group ${Object.keys(context.data.database.proxyGroups).length + 1}`, proxies: {}}
  let proxyGroups = context.data.database.proxyGroups
  proxyGroups[id] = newProxyGroup
  context.updateData({ database: { ...context.data.database, proxyGroups: proxyGroups } });
}

function handleClick(key) {
  setProxyGroupId(key)
  let userInfo = context.data.database.userInfo
  userInfo.proxyGroup = key
  context.updateData({ database: { ...context.data.database, userInfo: userInfo } });
}

    return (
      <div style={styles.containerMain}>
        <div style={styles.proxyHolder}>
            <button style={styles.proxy}  onClick={() => addProxyGroup()}>
                <p>New Proxy Group</p>
            </button>
            {context.data.database.proxyGroups && <>
                {Object.entries(context.data.database.proxyGroups).map(([key, value]) => (
                  <button style={styles.proxy} onClick={() => handleClick(key)} key={key}>
                    <p>{value.name}</p>
                  </button>
                ))}
              </>
            }
        </div>
      </div>
    );
  }
  
  export default ProxyGroupList;
  