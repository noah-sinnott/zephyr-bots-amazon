import colors from "../../colors/colors"

const styles = {

    content: {
      flexDirection: 'column',
      gap: '10px',
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: '70%',
      maxHeight: '80%',
      overflowY: 'auto',
      backgroundColor: colors.primary,
      border: `1px solid ${colors.highlight}`,
      borderRadius: '10px',
      padding: '20px',
      color: colors.text,
      display: 'grid',
      gridTemplateColumns: 'repeat(2, 1fr)',
      gridGap: '20px'
    },
    inputContainer:{
      width: '100%',
      gridColumn: 'span 1'
    },
    title: {
      borderBottom: `1px solid ${colors.seperator}`,
      gridColumn: 'span 2'
    },
    submitButtons: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-around',
      gridColumn: 'span 2',
      paddingTop: '15px',
      borderTop: `1px solid ${colors.seperator}`
    },
    cancelButton: {
      borderColor: colors.red,
      color: colors.red,
    },
    addButton: {
      backgroundColor: colors.highlight,
      color: colors.text,
    },
    textInput: {
      backgroundColor: colors.field,
      '&::placeholder': {
        color: colors.text2,
      },
      color: colors.text2,
      border: `1px solid ${colors.highlight}`,
      borderRadius: '5px',
      padding: '10px',
      width: '100%'
      }
  }
  
  export default styles