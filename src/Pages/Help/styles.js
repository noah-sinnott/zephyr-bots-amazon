import colors from "../../colors/colors"

const styles = {
    containerMain: {
        display: 'flex',
        flexDirection: 'row',
        height: '100%'
    },
    area: {
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        marginLeft: 20,
        marginRight: 20
      },
      mainArea: {
        height: '90%',
        width: '100%',
        backgroundColor: colors.primary,
        display: 'flex',
        flexDirection: 'column',
        alignItems:'center',
        color: colors.text,
        borderRadius: '5px',
        border: `1px solid ${colors.highlight}`
      }
  }
  
  export default styles