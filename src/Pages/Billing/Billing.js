import Navbar from '../../Components/Navbar/Navbar'
import React, {useContext, useState} from "react";
import styles from './styles'
import { Context } from "../../App";
import colors from '../../colors/colors';
import { Button, IconButton } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
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


    function MouseOver(event) {
      event.target.closest('tr').style.background = colors.highlightMini;
    }
  
    function MouseOut(event){
      const row = event.target.closest('tr');
      row.style.background = "";   
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
                    <Button variant="contained" size="medium" style={styles.button}  disableElevation onClick={() => setAddBillingModal(!addBillingModal)}>
                        Add Billing Profile
                      </Button>
                      <Button variant="contained" size="medium" style={styles.button}  disableElevation onClick={() => {
                                    setUpdateBillingModal(!updateBillingModal)
                                    setUpdateBillingId(false)
                      }}>
                        Update All
                      </Button>
                      <Button variant="contained" size="medium" style={styles.button}  disableElevation onClick={() => deleteAll()}>
                        Delete All
                      </Button>
                </div>
            <table style={styles.table}>
            <thead>
              <tr style={styles.tableHeaderBackground}>
                <th style={styles.tableHeader}>Name</th>
                <th style={styles.tableHeader}>Post Code</th>
                <th style={styles.tableHeader}>Actions</th>
              </tr>
            </thead>
            <tbody>
            {Object.entries(context.data.database.billing).map(([key, value]) => {
              return (
                <tr onMouseOver={MouseOver} onMouseOut={MouseOut}  style={styles.tableRow} key={key}>
                  <td  style={styles.tableItem}>{value.name}</td>
                  <td  style={styles.tableItem}>{value.shippingPostCode}</td>
                  <td  style={styles.tableItem}>
                  <IconButton aria-label="delete" size="small" style={{color: colors.red}}onClick={() => deleteBilling(key)}>
                      <DeleteIcon />
                    </IconButton>
                    <IconButton aria-label="Edit" size="small" style={{color: colors.white}} onClick={() => {
                     setUpdateBillingModal(!updateBillingModal)
                     setUpdateBillingId(key)
                      }}>
                      <EditIcon />
                    </IconButton>
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
  