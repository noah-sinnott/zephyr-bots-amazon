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
  authenticated: () => {
    ipcRenderer.send('authenticated');
  },
  unAuthenticated: () => {
    ipcRenderer.send('unAuthenticated');
  },

  getMachineId: async () => {
    return await ipcRenderer.invoke('getMachineId');
  },

  //-----------------------------------

  kill: (taskId) => {
    ipcRenderer.send('kill', taskId);
  },

  //-----------------------------------

  amazonStart: (taskId, taskGroupId, params) => {
    ipcRenderer.send('amazon', taskId, taskGroupId, params);
  },
  amazonDataGood: (callback) => {
    ipcRenderer.on('amazonDataGood', (event, taskId, taskGroupId, data) => {
      callback(event, taskId, taskGroupId, data);
    });
  },
  amazonDataBad: (callback) => {
    ipcRenderer.on('amazonDataBad', (event, taskId,taskGroupId, data) => {
      callback(event, taskId, taskGroupId, data);
    });
  },
  amazonDataClose: (callback) => {
    ipcRenderer.on('amazonDataClose', (event, taskId, taskGroupId, data) => {
      callback(event, taskId,taskGroupId, data);
    });
  },
});
