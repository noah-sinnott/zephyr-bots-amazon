import colors from "../../colors/colors"

const styles = {
    content: {
      flexDirection: 'column',
      gap: '10px',
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: '80%',
      backgroundColor: colors.primary,
      border: `1px solid ${colors.highlight}`,
      borderRadius: '10px',
      padding: '20px',
      color: colors.text,
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 1fr)',
      gridGap: '20px',
    },
    inputContainer:{
      width: '100%',
      gridColumn: 'span 1'
    },
    title: {
      borderBottom: `1px solid ${colors.seperator}`,
      gridColumn: 'span 4',
    },
    submitButtons: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-around',
      gridColumn: 'span 4',
      paddingTop: '15px',
      borderTop: `1px solid ${colors.seperator}`,
    },
    cancelButton: {
      borderColor: colors.red,
      color: colors.red,
    },
    addButton: {
      backgroundColor: colors.highlight,
      color: colors.text,
    },
    textInput: {
      backgroundColor: colors.field,
      color: colors.text2,
      '&::placeholder': {
        color: colors.text2,
      },
      border: `1px solid ${colors.highlight}`,
      borderRadius: '5px',
      padding: '10px',
      width: '100%'
      },
      dropDownContainer: {
        width: '100%',
        gridColumn: 'span 4',
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
          multiValue: (styles) => {
            return {
              ...styles,
              backgroundColor: colors.highlight,
            };
          },
          multiValueLabel: (styles) => ({
            ...styles,
            color: colors.text2,  
          }),
          input: (styles) => ({
            ...styles, 
            color: colors.text2
          })
        }
  }
  
  export default styles