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
      color: colors.text,
      borderRadius: '5px',
      border: `1px solid ${colors.highlight}`,
      boxSizing: 'border-box',
      padding: '30px',
    },
    logoutButton: {
      backgroundColor: colors.highlight,
      border: 'none',
      padding: '10px 20px 10px 20px',
      color: colors.text,
      borderRadius: '5px',
      marginTop: '30px',
      width: 'fit-content'
    },
    advancedSettings: {
      width: '100%',
      paddingTop: '30px',
      borderBottom: `1px solid ${colors.seperator}`
    },
    sliderContainer: {
      width: '30%'
    },

  }

export default styles