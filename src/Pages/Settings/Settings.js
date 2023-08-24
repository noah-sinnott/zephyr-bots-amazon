import Navbar from '../../Components/Navbar/Navbar'
import React, {useContext, useEffect, useState} from "react";
import styles from './styles'
import { Context } from "../../App";
import Slider from '@mui/material/Slider';
import Select from 'react-select';
import {FormControlLabel, Checkbox, Button } from '@mui/material';

import colors from '../../colors/colors';

  function Settings() {

    const context = useContext(Context)

    const [typingSpeed, setTypingSpeed] = useState(context.data.database.settings.typingSpeed);
    const [waitSpeed, setWaitSpeed] = useState(context.data.database.settings.waitSpeed);
    const [refreshRate, setRefreshRate] = useState(context.data.database.settings.refreshRate);
    const [visible, setVisible] = useState(context.data.database.settings.visible);

    useEffect(() => {
      let settings = {
        typingSpeed: typingSpeed,
        waitSpeed: waitSpeed,
        visible: visible,
        refreshRate: refreshRate,
      }
      const updatedDatabase = { ...context.data.database, settings: settings };
      context.updateData({database: updatedDatabase });
    }, [typingSpeed, waitSpeed, refreshRate, visible])

    return (
      <div style={styles.containerMain}>
        <Navbar/>
          <div style={styles.area}>
            <div style={styles.mainArea}>
                <FormControlLabel control={<Checkbox checked={visible} sx={{color: colors.text, '&.Mui-checked': {color: colors.text}}} onChange={(e) => setVisible(e.target.checked)}/>} label="Tasks are visible" />
                <div style={styles.sliderContainer}>
                <p>Refresh Rate</p>
                  <Slider
                    getAriaLabel={() => 'Refresh Rate'}
                    value={refreshRate}
                    onChange={(e) => setRefreshRate(e.target.value)}
                    min={0}
                    max={30}
                    step={0.5}
                    marks
                    valueLabelFormat={(value) => value + ' Seconds'}
                    valueLabelDisplay="auto"
                    sx={{
                      color: colors.highlight,
                      '& .MuiSlider-thumb': {
                        backgroundColor: colors.text, 
                      },
                      '& .MuiSlider-mark': {
                        '&.MuiSlider-markActive': {
                          backgroundColor: colors.text,
                        },
                      },
                    }}     
                   />  
                </div>
                <div style={styles.advancedSettings}>Advanced settings</div>

                <div style={styles.sliderContainer}>
                <p>Wait Speed</p>
                  <Slider
                    getAriaLabel={() => 'Wait speed'}
                    value={waitSpeed}
                    onChange={(e) => setWaitSpeed(e.target.value)}
                    min={0}
                    max={2}
                    step={0.1}
                    marks
                    valueLabelFormat={(value) => value + ' Seconds'}
                    valueLabelDisplay="auto"
                    sx={{
                      color: colors.highlight,
                      '& .MuiSlider-thumb': {
                        backgroundColor: colors.text,
                      },
                      '& .MuiSlider-mark': {
                        '&.MuiSlider-markActive': {
                          backgroundColor: colors.text,
                        },
                      },
                    }}     
                   />  
                </div>
                <div style={styles.sliderContainer}>
                <p>Typing Speed</p>
                  <Slider
                    getAriaLabel={() => 'Typing speed'}
                    value={typingSpeed}
                    onChange={(e) => setTypingSpeed(e.target.value)}
                    min={0}
                    max={0.5}
                    step={0.05}
                    marks
                    valueLabelFormat={(value) => value + ' Letters per second'}
                    valueLabelDisplay="auto"
                    sx={{
                      color: colors.highlight,
                      '& .MuiSlider-thumb': {
                        backgroundColor: colors.text,
                      },
                      '& .MuiSlider-mark': {
                        '&.MuiSlider-markActive': {
                          backgroundColor: colors.text,
                        },
                      },
                    }}  
                  />  
                </div>
                <Button variant="contained" size="medium" style={styles.logoutButton}  disableElevation>
                  Log Out
                </Button> 
            </div>
        </div>  
      </div>
    );
  }
  
  export default Settings;
  