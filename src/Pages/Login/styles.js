import colors from "../../colors/colors"

const styles = {
    container: {
      alignItems: 'center',
      justifyContent: 'center',
      display: 'flex',
      width: "100%",
      height: "100%",
    },
    content: {
      flexDirection: 'column',
      width: '50%',
      padding: '20px',
      color: colors.text,
      backgroundColor: colors.primary
    },
    inputContainer:{
      width: '100%',
    },
    submitButtons: {
      paddingTop: '15px',
      justifyContent:'center',
      width: "100%",
      display: 'flex'
    },
    errorText: {
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