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
        height: '10%',
        backgroundColor: colors.highlight,
        border: 'none',
        marginTop: 20,
        color: colors.text,
        borderRadius: '5px'
    }
  };
  
  export default styles;
  