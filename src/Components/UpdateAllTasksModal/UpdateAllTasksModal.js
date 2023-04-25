import React, {useContext, useState} from "react";
import styles from './styles'

import {Context} from '../../App'

import FormLabel from '@material-ui/core/FormLabel';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button'

import { amazon, kill } from "../../helpers/ScriptRunner";

  function UpdateAllTasksModal({setOpen, isOpen, taskGroupId}) {

    const context = useContext(Context)

    const [endpoint, setEndpoint] = useState('');
    const [endpoinDropdown, setEndpointDropdown] = useState(false);
    const [proxy, setProxy] = useState('');
    const [proxyDropdown, setProxyDropdown] = useState(false);
    const [quantity, setQuantity] = useState('');
    const [refreshRate, setRefreshRate] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [url, setURL] = useState('');

    async function updateAll(start){
      
      Object.entries(context.data.database.taskGroups[taskGroupId].tasks).map(([key, value]) => {
        if(value.pythonPID !== false){
          kill(value.pythonPID)
        }
      });

      let taskGroups = context.data.database.taskGroups

     await Object.entries(taskGroups[taskGroupId].tasks).map(([key, value]) => {
        if(url != '') value.url = url
        if(endpoint != '') value.endpoint = endpoint
        if(proxy != '') value.proxy = proxy
        if(quantity != '') value.quantity = quantity
        if(refreshRate != '') value.refreshRate = refreshRate
        if(maxPrice != '') value.maxPrice = maxPrice
      })

      if(start){
        for (const [key, value] of Object.entries(taskGroups[taskGroupId].tasks)) {
          const pythonPID = await amazon(key, value, context, taskGroupId);
          taskGroups[taskGroupId].tasks[key].pythonPID = pythonPID;
        }             
      }             
      
      const updatedDatabase = { ...context.data.database, taskGroups: taskGroups };
      context.updateData({database: updatedDatabase });
      exit()
    }

    function exit(){
      setOpen(false)
      setEndpoint('');
      setEndpointDropdown(false);
      setProxy('');
      setProxyDropdown(false);
      setQuantity('');
      setRefreshRate('');
      setMaxPrice('');
      setURL('');
    }

    return (
      <>
      {isOpen &&
      <div style={styles.background}>
        <div style={styles.mainContainer}>
        <div style={styles.form}>

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
            <MenuItem value={''}></MenuItem>
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
            <MenuItem value={''}></MenuItem>
            <MenuItem value={'None'}>None</MenuItem>
          </Select>
          </div>

        <div style={styles.submitButtons}>
        <Button variant="contained" size="large" onClick={() => updateAll(false)}>
          Update All
        </Button>
        <Button variant="contained" size="large" onClick={() => updateAll(true)}>
          Update All and start
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
  
  export default UpdateAllTasksModal;
  