import colors from "../../colors/colors"
const styles = {
    containerMain: {
      backgroundColor: colors.primary,
      width: '55px',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    button: {
      backgroundColor: 'transparent',
      border: 'transparent',
      borderRadius: '20%',
      height: '45px',
      width: '45px',
      margin: 5,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    selectedButton: {
      backgroundColor: colors.highlight,
      border: 'transparent',
      borderRadius: '20%',
      height: '45px',
      width: '45px',
      margin: 5,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    image: {
      width: '35px',
      height: '35px',
    }
  }
  
  export default styles