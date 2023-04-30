import colors from "../../colors/colors";

const styles = {
    containerMain: {
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        marginLeft: 20,
        marginRight: 20
      },
      containerMain2: {
        height: '90%',
        width: '100%',
        backgroundColor: colors.primary,
        color: colors.text,
        display: 'flex',
        flexDirection: 'column',
        alignItems:'center',
        borderRadius: '5px',
        border: `1px solid ${colors.highlight}`
      },
      actions: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        height: '40px',
        width: 'calc(100% - 20px)',
        marginLeft: '10px',
        marginTop: '10px',
        marginRight: '10px',
        justifyContent: 'space-around',
      },
      button: {
        backgroundColor: colors.highlight,
        color: colors.text,
      },
      table: {
        width: 'calc(100% - 20px)',
        marginLeft: '10px',
        marginTop: '10px',
        marginRight: '10px',
        borderCollapse: 'collapse',
        backgroundColor: colors.secondary,
        borderTopLeftRadius: '10px',
        borderTopRightRadius: '10px',
        overflow: 'hidden',
      },
      tableHeader:{
        textAlign: 'start',
        padding: '10px',
        border: 'none'
      },
      tableHeaderBackground:   {
        backgroundColor: colors.highlight,
      }, 
      tableRow: {
        borderBottom: `1px solid ${colors.seperator}`,
      },
      tableItem: {
        padding: '10px'
      }
  };
  
  export default styles;
  