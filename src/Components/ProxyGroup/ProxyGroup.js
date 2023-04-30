import React, {useContext, useState} from "react";
import styles from './styles'
import { Context } from "../../App";

import colors from "../../colors/colors";
import { Button, IconButton } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import EditProxyGroup from '../EditProxyGroup/EditProxyGroup'
import AddProxiesModal from "../AddProxiesModal/AddProxiesModal";
import UpdateProxyModal from "../UpdateProxyModal/UpdateProxyModal";
import BulkEditProxies from "../BulkEditProxies/BulkEditProxies";

function ProxyGroup({proxyGroupId, setProxyGroupId}) {

  const [addProxiesModal, setAddProxiesModal] = useState(false)
  const [editProxyGroupModal, setEditProxyGroupModal] = useState(false)
  const [updateProxiesModal, setUpdateProxiesModal] = useState(false)
  const [updateProxyModal, setUpdateProxyModal] = useState(false)
  const [proxyId, setProxyId] = useState(false)

  const context = useContext(Context)

  function addProxies(){
    setAddProxiesModal(true)
  }

  function updateAll(){
    setUpdateProxiesModal(true)
  }

  function deleteAll(){
    let proxyGroups = context.data.database.proxyGroups
    proxyGroups[proxyGroupId].proxies = {}
    const updatedDatabase = { ...context.data.database, proxyGroups: proxyGroups };
    context.updateData({database: updatedDatabase });
  }  

  function deleteProxy(key){

    let proxyGroups = context.data.database.proxyGroups
    delete proxyGroups[proxyGroupId].proxies[key]

    const updatedDatabase = { ...context.data.database, proxyGroups: proxyGroups };
    context.updateData({database: updatedDatabase });
  }
  
  function MouseOver(event) {
    event.target.closest('tr').style.background = colors.highlightMini;
  }

  function MouseOut(event){
    const row = event.target.closest('tr');
    row.style.background = "";   
   }

    return (
      <div style={styles.containerMain}>

        <div style={styles.containerMain2}>
            {proxyGroupId != false ? <>
            
            <AddProxiesModal setOpen={setAddProxiesModal} isOpen={addProxiesModal} proxyGroupId={proxyGroupId}/>

            <EditProxyGroup setOpen={setEditProxyGroupModal} isOpen={editProxyGroupModal} proxyGroupId={proxyGroupId} setProxyGroupId={setProxyGroupId}/>

            <UpdateProxyModal setOpen={setUpdateProxyModal} isOpen={updateProxyModal} proxyGroupId={proxyGroupId} proxyId={proxyId}/>
            
            <BulkEditProxies setOpen={setUpdateProxiesModal} isOpen={updateProxiesModal} proxyGroupId={proxyGroupId}/>
            <div style={styles.actions}>
                <Button variant="contained" size="medium" style={styles.button}  disableElevation onClick={() => setEditProxyGroupModal(!editProxyGroupModal)}>
                        Edit Proxy Group
                </Button>
                <p>Proxies: {Object.keys(context.data.database.proxyGroups[proxyGroupId].proxies).length}</p>
                <Button variant="contained" size="medium" style={styles.button}  disableElevation onClick={() => addProxies()}>
                        Add Proxies
                </Button>
                <Button variant="contained" size="medium" style={styles.button}  disableElevation onClick={() => updateAll()}>
                        Update All
                </Button>
                <Button variant="contained" size="medium" style={styles.button}  disableElevation onClick={() => deleteAll()}>
                        Delete All
                </Button>
            </div>
            <table style={styles.table}>
            <thead>
              <tr style={styles.tableHeaderBackground}>
                <th style={styles.tableHeader}>IP</th>
                <th style={styles.tableHeader}>Port</th>
                <th style={styles.tableHeader}>Username</th>
                <th style={styles.tableHeader}>Password</th>
                <th style={styles.tableHeader}>Actions</th>
              </tr>
            </thead>
            <tbody>
             {Object.entries(context.data.database.proxyGroups[proxyGroupId].proxies).map(([key, value]) => {
              return (
                <tr onMouseOver={MouseOver} onMouseOut={MouseOut} style={styles.tableRow} key={key}>
                  <td style={styles.tableItem}>{value.ip}</td>
                  <td style={styles.tableItem}>{value.port}</td>
                  <td style={styles.tableItem}>{value.username}</td>
                  <td style={styles.tableItem}>{value.password}</td>
                  <td style={styles.tableItem}>
                    <IconButton aria-label="Edit" size="small" style={{color: colors.white}} onClick={() => {
                      setUpdateProxyModal(true)
                      setProxyId(key)
                      }}>
                      <EditIcon />
                    </IconButton>
                    <IconButton aria-label="Edit" size="small" style={{color: colors.red}} onClick={() => deleteProxy(key)}>
                        <DeleteIcon />
                    </IconButton>
                  </td>
                </tr>
              );
             })}          
            </tbody>
          </table>
              </> :
              <div style={{width: '100%', height: '100%', display: 'flex',alignItems: 'center', justifyContent: 'center'}}>  
                <p>Select or Create a Proxy Group</p>
              </div>
              }
        </div>
      </div>
    );
  }


  export default ProxyGroup;
  