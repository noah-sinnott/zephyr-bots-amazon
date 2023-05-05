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
import BulkUpdateBilling from '../../Components/BulkUpdateBilling/BulkUpdateBilling';
import ConfirmationDialog from '../../Components/ConfirmationDialog/ConfirmationDialog';

  function Billing() {

    const context = useContext(Context)
    const [addBillingModal, setAddBillingModal] = useState(false)
    const [updateBillingModal, setUpdateBillingModal] = useState(false)
    const [updateBillings, setUpdateBillings] = useState(false)
    const [billingId, setBillingId] = useState(false)
    const [deleteBillingsDialog, setDeleteBillingsDialog] = useState(false)
    const [deleteBillingDialog, setDeleteBillingDialog] = useState(false)

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
        <ConfirmationDialog isOpen={deleteBillingsDialog} setOpen={setDeleteBillingsDialog} submit={() => deleteAll()} mainText2={'This will delete all the tasks with these billing profiles'} submitText={'Delete All'} mainText={'Confirm You want to delete all billing profiles'}/>
        <ConfirmationDialog isOpen={deleteBillingDialog} setOpen={setDeleteBillingDialog} submit={() => deleteBilling(billingId)} mainText2={'This will delete all tasks with this billing profile'} submitText={'Delete Billing Profile'} mainText={'Confirm you want to delete this billing profile'}/>
        <AddBillingModal isOpen={addBillingModal} setOpen={setAddBillingModal}/>
        <UpdateBillingModal isOpen={updateBillingModal} setOpen={setUpdateBillingModal} billingId={billingId}/>
        <BulkUpdateBilling isOpen={updateBillings} setOpen={setUpdateBillings}/>
        <Navbar/>
          <div style={styles.TableAreaHolder}>
            <div style={styles.TableArea}>
                <div style={styles.actions}>
                    <p>Billing Profiles: {Object.keys(context.data.database.billing).length}</p>
                    <Button variant="contained" size="medium" style={styles.button}  disableElevation onClick={() => setAddBillingModal(!addBillingModal)}>
                        Add Billing Profile
                      </Button>
                      <Button variant="contained" size="medium" style={styles.button}  disableElevation onClick={() => {
                          setUpdateBillings(!updateBillings)
                      }}>
                        Update All
                      </Button>
                      <Button variant="contained" size="medium" style={styles.button}  disableElevation onClick={() => setDeleteBillingsDialog(true)}>
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
                  <IconButton aria-label="delete" size="small" style={{color: colors.red}}onClick={() => {
                    setDeleteBillingDialog(true)
                    setBillingId(key)
                    }}>
                      <DeleteIcon />
                    </IconButton>
                    <IconButton aria-label="Edit" size="small" style={{color: colors.white}} onClick={() => {
                     setUpdateBillingModal(!updateBillingModal)
                     setBillingId(key)
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
  