import colors from "../../colors/colors";

const styles = {
    containerMain: {
      width: '20%',
      display: 'flex',
      alignItems: 'center',
    },
    tasksHolder: {
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
    task:{ 
        width: '80%',
        height: '10%',
        backgroundColor: colors.highlight,
        border: 'none',
        marginTop: 20,
        color: colors.text,
        borderRadius: '5px'
    },
    image: {
      width: '100%',
      height: '100%'
    }
  };
  
  export default styles;
  