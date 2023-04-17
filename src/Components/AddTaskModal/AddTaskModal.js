import React, {useContext, useState} from "react";
import styles from './styles'

import {Context} from '../../App'

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button'

import { amazon } from "../../ScriptRunner";

  function AddTaskModal({setOpen, isOpen, taskGroup}) {

    const context = useContext(Context)

    const [accountType, setAccountType] = useState('Single Account');
    const [endpoint, setEndpoint] = useState('Item page');
    const [endpoinDropdown, setEndpointDropdown] = useState(false);
    const [proxy, setProxy] = useState('None');
    const [proxyDropdown, setProxyDropdown] = useState(false);
    const [quantity, setQuantity] = useState('');
    const [refreshRate, setRefreshRate] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [url, setURL] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    async function AddTask(start){
      let newTask = {
        type: 'amazon',
        email: email,
        password: password,
        url: url,
        proxy: false,
        accountPool :false,
        endpoint: endpoint,
        quantity: quantity,
        refreshRate: refreshRate,
        maxPrice: maxPrice,
        notifications: [],
        pythonPID: false
      }


      if(start){
        let index = context.data.database.taskGroups[taskGroup].tasks.length
        const pythonPID = await amazon(newTask, context, index, taskGroup);     
        newTask.pythonPID = pythonPID
      } 

        const currentTaskGroups = context.data.database.taskGroups;
        const updatedTaskGroup = [...currentTaskGroups[taskGroup].tasks, newTask];
        const updatedTaskGroups = [...currentTaskGroups];
        updatedTaskGroups[taskGroup].tasks = updatedTaskGroup;
        const updatedDatabase = { ...context.data.database, taskGroups: updatedTaskGroups };
        context.updateData({database: updatedDatabase });
      
      exit()
    }

    function exit(){
      setOpen(false)
      setAccountType('Single Account');
      setEndpoint('Item page');
      setEndpointDropdown(false);
      setProxy('None');
      setProxyDropdown(false);
      setQuantity('');
      setRefreshRate('');
      setMaxPrice('');
      setURL('');
      setEmail('');
      setPassword('');
    }

    return (
      <>
      {isOpen &&
      <div style={styles.background}>
        <div style={styles.mainContainer}>
        <div style={styles.form}>

        <div style={styles.wide}>
          <RadioGroup style={styles.flex} aria-label="Account Info" name="Account Info" value={accountType} onChange={(event) => setAccountType(event.target.value)}>
            <FormControlLabel value="Single Account" control={<Radio />} label="Single Account" />
            <FormControlLabel value="Account pool" control={<Radio />} label="Account pool" />
          </RadioGroup>
        </div>
          
          {accountType == 'Single Account' ?
          <>
              <TextField value={email} onChange={(event) => setEmail(event.target.value)} id="email" label="Email / Number" variant="outlined" />
              <TextField value={password} onChange={(event) => setPassword(event.target.value)} id="Password" label="Password" variant="outlined" />
          </>
        :null}

          <TextField value={url} onChange={(event) => setURL(event.target.value)} id="url" label="Item url" variant="outlined" />

          <TextField  value={maxPrice} onChange={(event) => setMaxPrice(event.target.value)} id="maxPrice" label="Max overall price including shipping and tax" type='number' variant="outlined" />
          
          <TextField value={refreshRate} onChange={(event) => setRefreshRate(event.target.value)} id="RefreshRate" label="Refresh Rate  (Seconds)" type='number' variant="outlined" />

          <TextField  value={quantity} onChange={(event) => setQuantity(event.target.value)} id="Quantity" label="Quantity" type='number' variant="outlined" />

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
        <Button variant="outlined"  style={{ color: 'red', borderColor: 'red' }} size="large" onClick={() => exit()}>
          Cancel
        </Button>         
        </div>
        </div>
        </div>
      </div> 
      }
      </>
    );
  }
  
  export default AddTaskModal;
  