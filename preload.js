const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {

  windowMinimize: () => {
    ipcRenderer.send('window-minimize');
  },
  windowMaximize: () => {
    ipcRenderer.send('window-maximize');
  },
  windowClose: () => {
    ipcRenderer.send('window-close');
  },
  
  //-----------------------------------

  kill: (pid) => {
    ipcRenderer.send('kill', pid);
  },

  //-----------------------------------

  amazonStart: (id, params) => {
    ipcRenderer.send('amazon', id, params);
  },
  amazonDataGood: (callback) => {
    ipcRenderer.on('amazonDataGood', (event, pidId, data) => {
      callback(event, pidId, data);
    });
  },
  amazonDataBad: (callback) => {
    ipcRenderer.on('amazonDataBad', (event, pidId, data) => {
      callback(event, pidId, data);
    });
  },
  amazonDataClose: (callback) => {
    ipcRenderer.on('amazonDataClose', (event, pidId, data) => {
      callback(event, pidId, data);
    });
  },
});
