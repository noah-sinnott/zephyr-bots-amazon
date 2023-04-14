const styles = {
    background: {
      display: 'block',
      position: 'fixed',
      marginTop: '30px',
      zIndex: 1,
      left: 0,
      top: 0,
      width: '100%',
      height: '100%',
      backgroundColor: 'transparent',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    mainContainer: {
      backgroundColor: 'white',
      width: '60%',
      padding: '30px',
      borderRadius: '20px'
    },
    flex: {
      display: 'flex',
      flexDirection: 'row'
    },
    submitButtons: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-around',
      gridColumn: 'span 2'
    },
    form: {
      display: 'grid',
      gridTemplateColumns: 'repeat(2, 1fr)',
      gridGap: '10px'
    },
    wide: {
      gridColumn: 'span 2'
    },
    endpoint: {
      display: 'flex',
      flexDirection: 'column',
    }
  }
  
  export default styles