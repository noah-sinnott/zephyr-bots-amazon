import Navbar from '../../Components/Navbar/Navbar'
import React, {useContext, useEffect, useState} from "react";
import styles from './styles'
import { Context } from "../../App";
import Slider from '@mui/material/Slider';
import {FormControlLabel, Checkbox, Button } from '@mui/material';

import colors from '../../colors/colors';

  function Settings() {

    const context = useContext(Context)

    const [typingSpeed, setTypingSpeed] = useState([0.1, 0.2]);
    const [waitSpeed, setWaitSpeed] = useState([0.1, 0.2]);
    const [refreshRate, setRefreshRate] = useState([10, 15]);
    const [taskCompleteOpen, setTaskCompleteOpen] = useState(false);
    const [taskErrorOpen, setTaskErrorOpen] = useState(false);

    useEffect(() => {
      let settings = context.data.database.settings
      if(settings.typingSpeed) setTypingSpeed(settings.typingSpeed)
      if(settings.waitSpeed) setWaitSpeed(settings.waitSpeed)
      if(settings.refreshRate) setRefreshRate(settings.refreshRate)
      if(settings.taskCompleteOpen) setTaskCompleteOpen(settings.taskCompleteOpen)
      if(settings.taskErrorOpen) setTaskErrorOpen(settings.taskErrorOpen)
    }, [])

    useEffect(() => {
      let settings = {
        typingSpeed: typingSpeed,
        waitSpeed: waitSpeed,
        taskCompleteOpen: taskCompleteOpen,
        taskErrorOpen: taskErrorOpen,
        refreshRate: refreshRate
      }
      const updatedDatabase = { ...context.data.database, settings: settings };
      context.updateData({database: updatedDatabase });
    }, [typingSpeed, waitSpeed, taskCompleteOpen, taskErrorOpen])

    return (
      <div style={styles.containerMain}>
        <Navbar/>
          <div style={styles.area}>
            <div style={styles.mainArea}>
                <FormControlLabel control={<Checkbox checked={taskCompleteOpen} sx={{color: colors.text, '&.Mui-checked': {color: colors.text}}} onChange={(e) => setTaskCompleteOpen(e.target.checked)}/>} label="Open on task Completion" />
                <FormControlLabel control={<Checkbox checked={taskErrorOpen} sx={{color: colors.text, '&.Mui-checked': {color: colors.text}}} onChange={(e) => setTaskErrorOpen(e.target.checked)}/>} label="Open on task Error" />
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
                    max={1}
                    step={0.1}
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
  