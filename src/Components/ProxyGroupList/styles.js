import colors from "../../colors/colors";

const styles = {
    containerMain: {
      width: '20%',
      display: 'flex',
      alignItems: 'center',
    },
    proxyHolder: {
      height: '90%',
      width: '100%',
      backgroundColor: colors.primary,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      overflow: 'auto',
      marginLeft: 20,
      borderRadius: '5px',
      border: `1px solid ${colors.highlight}`
    },
    proxy:{ 
      width: '80%',
      paddingTop: '15px',
      paddingBottom: '15px',
      backgroundColor: colors.highlight,
      marginTop: 20,
      color: colors.text,
      borderRadius: '5px',
      border: `1px solid ${colors.highlight}`
    },
    selectedProxy: {
      width: '80%',
      paddingTop: '15px',
      paddingBottom: '15px',
      backgroundColor: colors.highlight,
      marginTop: 20,
      color: colors.text,
      borderRadius: '5px',
      border: `1px solid ${colors.text}`
    }
  };
  
  export default styles;
  