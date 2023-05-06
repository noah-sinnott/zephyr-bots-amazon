import colors from "../../colors/colors"
const styles = {
    containerMain: {
        display: 'flex',
        flexDirection: 'row',
        height: '100%'
    },
    TableAreaHolder: {
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        marginLeft: 20,
        marginRight: 20
      },
      TableArea: {
        height: '90%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems:'center',
        backgroundColor: colors.primary,
        color: colors.text,
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
      actionButton: {
        backgroundColor: colors.highlight,
        color: colors.text,
        width: '20px',
        height: '20px',
        marginLeft: '2px',
        marginRight: '2px',
      },
      table: {
        width: '100%',
        borderCollapse: 'collapse',
        backgroundColor: colors.secondary,
        tableLayout: 'fixed'
      },
      tableHeader:{
        textAlign: 'start',
        padding: '10px',
        border: 'none',
      },
      tableContainer: {
        width: 'calc(100% - 20px)',
        overflowY: 'auto',
        margin: '10px',
        borderTopLeftRadius: '10px',
        borderTopRightRadius: '10px',
      },
      tableHeaderBackground:   {
        backgroundColor: colors.highlight,
      }, 
      tableRow: {
        borderBottom: `1px solid ${colors.seperator}`,
      },
      tableItem: {
        padding: '10px',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
      }
  }
  
  export default styles