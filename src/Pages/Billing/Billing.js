import Navbar from '../../Components/Navbar/Navbar'
import React, {useContext, useState} from "react";
import styles from './styles'
import { Context } from "../../App";
import bin from '../../assets/bin.png'
import Info from '../../assets/info.png'

import AddBillingModal from '../../Components/AddBillingModal/AddBillingModal';
import UpdateBillingModal from '../../Components/UpdateBillingModal/UpdateBillingModal.js'

  function Billing() {

    const context = useContext(Context)
    const [addBillingModal, setAddBillingModal] = useState(false)
    const [updateBillingModal, setUpdateBillingModal] = useState(false)
    const [updateBillingId, setUpdateBillingId] = useState(false)

    function deleteAll () {
      const updatedDatabase = { ...context.data.database, billing: {} };
      context.updateData({database: updatedDatabase });
    }

    function deleteBilling(id){
      let billing = context.data.database.billing
      delete billing[id]
      const updatedDatabase = { ...context.data.database, billing: billing };
      context.updateData({database: updatedDatabase });
    }

    return (
      <div style={styles.containerMain}>
        <AddBillingModal isOpen={addBillingModal} setOpen={setAddBillingModal}/>
        <UpdateBillingModal isOpen={updateBillingModal} setOpen={setUpdateBillingModal} accountId={updateBillingId}/>
        <Navbar/>
          <div style={styles.TableAreaHolder}>
            <div style={styles.TableArea}>
                <div style={styles.actions}>
                    <p>Billing Profiles: {Object.keys(context.data.database.billing).length}</p>
                    <button style={styles.button} onClick={() => setAddBillingModal(!addBillingModal)}>Add Billing Profile</button>
                    <button style={styles.button} onClick={() => {
                      setUpdateBillingModal(!updateBillingModal)
                      setUpdateBillingId(false)
                      }}>Update All</button>
                    <button style={styles.button} onClick={() => deleteAll()}>Delete All</button>
                </div>
            <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.tableHeader}>Name</th>
                <th style={styles.tableHeader}>Post Code</th>
                <th style={styles.tableHeader}>Actions</th>
              </tr>
            </thead>
            <tbody>
            {Object.entries(context.data.database.billing).map(([key, value]) => {
              return (
                <tr style={styles.tableRow} key={key}>
                  <td>{value.name}</td>
                  <td>{value.shippingPostCode}</td>
                  <td>
                     <img src={bin} style={styles.image} onClick={() => deleteBilling(key)}/> 
                     <img src={Info} style={styles.image} onClick={() => {
                      setUpdateBillingModal(!updateBillingModal)
                      setUpdateBillingId(key)
                      }}/> 
                  </td>
                </tr>
              );
             })}          
            </tbody>
          </table>
          </div>
        </div>  
      </div>
    );
  }
  
  export default Billing;
  