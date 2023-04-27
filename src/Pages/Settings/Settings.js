import Navbar from '../../Components/Navbar/Navbar'
import React, {useContext, useEffect, useState} from "react";
import styles from './styles'
import { Context } from "../../App";
import Slider from '@mui/material/Slider';
import { FormLabel, FormControlLabel, Checkbox, Button } from '@material-ui/core';

  function Settings() {

    const context = useContext(Context)

    const [typingSpeed, setTypingSpeed] = useState([0.1, 0.2]);
    const [waitSpeed, setWaitSpeed] = useState([0.1, 0.2]);
    const [taskCompleteOpen, setTaskCompleteOpen] = useState(false);
    const [taskErrorOpen, setTaskErrorOpen] = useState(false);

    useEffect(() => {
      let settings = context.data.database.settings
      if(settings.typingSpeed) setTypingSpeed(settings.typingSpeed)
      if(settings.waitSpeed) setTypingSpeed(settings.waitSpeed)
      if(settings.taskCompleteOpen) setTypingSpeed(settings.taskCompleteOpen)
      if(settings.taskErrorOpen) setTypingSpeed(settings.taskErrorOpen)
    }, [])

    useEffect(() => {
      let settings = {
        typingSpeed: typingSpeed,
        waitSpeed: waitSpeed,
        taskCompleteOpen: taskCompleteOpen,
        taskErrorOpen: taskErrorOpen
      }
      const updatedDatabase = { ...context.data.database, settings: settings };
      context.updateData({database: updatedDatabase });
    }, [typingSpeed, waitSpeed, taskCompleteOpen, taskErrorOpen])

    return (
      <div style={styles.containerMain}>
        <Navbar/>
          <div style={styles.area}>
            <div style={styles.mainArea}>
              <Button variant="outlined"  style={{ color: 'red', borderColor: 'red' }} size="large">
                LogOut
              </Button>   
                <FormControlLabel control={<Checkbox checked={taskCompleteOpen} onChange={(e) => setTaskCompleteOpen(e.target.checked)}/>} label="Open on task Completion" />
                <FormControlLabel control={<Checkbox checked={taskErrorOpen} onChange={(e) => setTaskErrorOpen(e.target.checked)}/>} label="Open on task Error" />
                <div style={styles.advancedSettings}>Advanced settings</div>
                <div style={styles.sliderContainer}>
                <FormLabel>Wait Speed</FormLabel>
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
                  />  
                </div>
                <div style={styles.sliderContainer}>
                <FormLabel>Typing Speed</FormLabel>
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
                  />  
                </div>

            </div>
        </div>  
      </div>
    );
  }
  
  export default Settings;
  