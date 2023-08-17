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
      overflowY: 'auto',
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
    dropDown: {
      control: (provided) => ({
          ...provided,
          backgroundColor: colors.field,  
          border: `1px solid ${colors.highlight}`, 
          color: colors.text2, 
          borderColor: colors.highlight,
          borderRadius: '5px',
          padding: '8px'
      }), 
      menu: (provided) => ({
          ...provided,
          backgroundColor: colors.field ,
          border: `1px solid ${colors.highlight}`,
          color: colors.text2, 
      }), 
      menuList: (provided) => ({
          ...provided,
          backgroundColor: colors.field, 
          border: `1px solid ${colors.highlight}`,
          color: colors.text2,  
      }), 
      option: (styles, { data, isDisabled, isFocused, isSelected }) => {
          return {
            ...styles,
            backgroundColor: isFocused ? colors.highlight : null,
            color: colors.text2,
          };
        }, 
      singleValue: provided => ({
          ...provided,
          color: colors.text2
        })
      }
  }

export default styles