import React, {useState} from "react";
import styles from './styles'

import path from 'path'
import { spawn } from 'child_process'

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button'

  function AddTaskModal({setOpen, isOpen, taskGroup}) {

    const [accountType, setAccountType] = useState('Single Account');
    const [endpoint, setEndpoint] = useState('Item page');
    const [endpoinDropdown, setEndpointDropdown] = useState(false);
    const [proxy, setProxy] = useState('None');
    const [proxyDropdown, setProxyDropdown] = useState(false);

    const url1 = 'https://www.amazon.co.uk/Cadbury-Dairy-Milk-Chocolate-Bar/dp/B07N7BG9WV/ref=sr_1_6?crid=3E2P0CTAAP8HT&keywords=dairy+milk&qid=1680979389&sprefix=dairymilk%2Caps%2C87&sr=8-6'
    const url2 = 'https://www.amazon.co.uk/SHOWKINGS-GT-730-Graphics-Computer/dp/B09PY6MK7X/ref=sr_1_1_sspa?keywords=gpu&qid=1681142991&sr=8-1-spons&sp_csd=d2lkZ2V0TmFtZT1zcF9hdGY&psc=1'
    
    function startTask(){
        const pyPath = path.join(process.cwd(), 'python', 'amazon.py');
        const pythonProcess = spawn('python', [pyPath, url1, 0.3, 2.7, 'noah.sinnott12@gmail.com', '123456', 'Checkout-page', 'GB', 'Noah Sinnott', '07484783803', 'ln44hn', 'st michaels house', 'church street', 'billinghay']);  

        pythonProcess.stdout.on('data', (data) => {
        console.log(`stdout: ${data}`);
        });

        pythonProcess.stderr.on('data', (data) => {
        console.error(`stderr: ${data}`);
        });

        pythonProcess.on('close', (code) => {
        console.log(`child process exited with code ${code}`);
        });
    }

    function AddTask(start){

      exit()
    }

    function exit(){
      setOpen(false)
      setAccountType('Single Account');
      setEndpoint('Item page');
      setEndpointDropdown(false);
      setProxy('None');
      setProxyDropdown(false);
    }

    return (
      <>
      {isOpen &&
      <div style={styles.background}>
        <div style={styles.mainContainer}>
        <FormControl style={styles.form}>

        <div style={styles.wide}>
          <RadioGroup style={styles.flex} aria-label="Account Info" name="Account Info" value={accountType} onChange={(event) => setAccountType(event.target.value)}>
            <FormControlLabel value="Single Account" control={<Radio />} label="Single Account" />
            <FormControlLabel value="Account pool" control={<Radio />} label="Account pool" />
          </RadioGroup>
        </div>
          
          
          
          {accountType == 'Single Account' ?
          <>
          
                <TextField id="email" label="Email / Number" variant="outlined" />
                <TextField id="Password" label="Password" variant="outlined" />
          </>
        :null}

          <TextField id="url" label="Item url" variant="outlined" />

          <TextField id="url" label="Max overall price including shipping and tax" type='number' variant="outlined" />
          
          <TextField id="RefreshRate" label="Refresh Rate  (Seconds)" type='number' variant="outlined" />

          <TextField id="Quantity" label="Quantity" type='number' variant="outlined" />

        <div style={styles.endpoint}>
            <FormLabel>End At</FormLabel>
          <Select
            labelId="EndpointDropdown"
            id="EndpointDropdown"
            open={endpoinDropdown}
            onClose={() => setEndpointDropdown(false)}
            onOpen={() => setEndpointDropdown(true)}
            value={endpoint}
            onChange={(event) => setEndpoint(event.target.value)}>
            <MenuItem value={'Item page'}>Item Page</MenuItem>
            <MenuItem value={'Login page'}>Login Page</MenuItem>
            <MenuItem value={'Shipping Page'}>Shipping Page</MenuItem>
            <MenuItem value={'Checkout Page'}>Checkout Page</MenuItem>
            <MenuItem value={'Success Page'}>Success Page</MenuItem>
          </Select>
          </div>
          
          <div style={styles.endpoint}>
            <FormLabel>Proxy</FormLabel>
          <Select
            labelId="proxyDropdown"
            id="proxyDropdown"
            open={proxyDropdown}
            onClose={() => setProxyDropdown(false)}
            onOpen={() => setProxyDropdown(true)}
            value={proxy}
            onChange={(event) => setProxy(event.target.value)}>
            <MenuItem value={'None'}>None</MenuItem>
          </Select>
          </div>

        <div style={styles.submitButtons}>
        <Button variant="contained" size="large" onClick={() => AddTask(false)}>
          Add Task
        </Button>
        <Button variant="contained" size="large" onClick={() => AddTask(true)}>
          Add Task and start
        </Button> 
        <Button variant="outlined" color="error" size="large" onClick={() => exit()}>
          Cancel
        </Button>         
        </div>
        </FormControl>
        </div>
      </div> 
      }
      </>
    );
  }
  
  export default AddTaskModal;
  