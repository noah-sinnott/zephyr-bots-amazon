import colors from "../../colors/colors"

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        position: 'absolute',
        top: '25%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: colors.primary,
        border: `1px solid ${colors.highlight}`,
        borderRadius: '10px',
        padding: '20px',
        color: colors.text,
      },
      cancelButton: {
        borderColor: colors.red,
        color: colors.red,
      },
      addButton: {
        backgroundColor: colors.highlight,
        color: colors.text,
      },
      submitButtons: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        marginTop: '15px'
      }
  }
  
  export default styles