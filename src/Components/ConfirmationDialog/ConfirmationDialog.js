import React from "react";
import styles from './styles'
import { Button, Modal } from "@mui/material";

function ConfirmationDialog({
        setOpen,
        isOpen,
        submit = () => {},
        cancel = () => {},
        submitText = 'Submit',
        cancelText = 'Cancel',
        mainText = '',
        mainText2 = ''
        }) {

    return (
        <Modal
        open={isOpen}
        aria-labelledby="Confirmation Dialog"
        aria-describedby="Confirmation Dialog"
        >
        <div style={styles.container}>
        <h3>{mainText}</h3>
        <p>{mainText2}</p>
        <div style={styles.submitButtons}>
        <Button variant="contained" size="large" style={styles.addButton}  onClick={() => {
            setOpen(false)
            submit()
        }}>
           {submitText}
        </Button>
          <Button variant="outlined" style={styles.cancelButton} size="medium"  onClick={() => {
            setOpen(false)
            cancel()
          }}>
            {cancelText}
          </Button> 
            </div>
            </div>
      </Modal>
    )

  }


  export default ConfirmationDialog;
  