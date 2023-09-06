const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const { spawn } = require('child_process');
const { machineId } = require('node-machine-id');

let win = null

const isDev = process.env.NODE_ENV === 'development' ? true : false

const backendURL = "http://localhost:3005"

function createWindow () {
  win = new BrowserWindow({
    width: 1080,
    height: 600,
    frame: false,
    maximizable: true,
    isMaximized: true,
    show: false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js'),
      devTools: isDev ? true : false
    }
  })

  win.setMinimumSize(1080, 600);

  if (isDev) {
    win.loadURL('http://localhost:3000')
  } else {
    win.loadURL(`file://${__dirname}/build_react/index.html`);
  }  
  
  win.show()

  ipcMain.on('authenticated', () => {
    win.maximize()
  });

  ipcMain.on('unAuthenticated', () => {
    win.setSize(1080, 600)
  });

  ipcMain.on('window-minimize', () => {
    win.minimize();
  });

  ipcMain.on('window-maximize', () => {
    if (win.isMaximized()) {
      win.unmaximize();
    } else {
      win.maximize();
    }
  });

  ipcMain.on('window-close', () => {
    win.close();
  });
}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

ipcMain.handle("getMachineId", async () => {
  const machine = await machineId();
  return machine;
});

let pythonProcesses = new Map();

ipcMain.on('kill', (event, taskId) => {
  if (!pythonProcesses.has(taskId)) {
    console.log(`Python process with ${taskId} not running`);
    return;
  }
  const pythonProcess = pythonProcesses.get(taskId);
  pythonProcess.stdin.write('End\n');
  pythonProcess.stdin.end();
  pythonProcesses.delete(taskId); 
})

ipcMain.on('amazon', (event, taskId, taskGroupId, params) => {

  let pythonProcess = {}

  if (isDev) {
    const pyPath = path.join(process.cwd(), 'python', "amazon.py");
    pythonProcess = spawn('python', ["-u", pyPath, params, backendURL]);
  } else {
    const exePath = path.join(process.resourcesPath, 'app.asar.unpacked', 'build_python', "amazon.exe");
    pythonProcess = spawn(exePath, params, backendURL);
  }

  pythonProcess.stdout.on('data', (data) => {
    const stringData = data.toString();
    win.webContents.send(`amazonDataGood`, taskId, taskGroupId, stringData)
  });

  pythonProcess.stderr.on('data', (data) => {
    const stringData = data.toString();
    win.webContents.send(`amazonDataBad`, taskId, taskGroupId, stringData)
  });

  pythonProcess.on('close', (code) => {
    pythonProcess.stdin.write('End\n');
    pythonProcess.stdin.end();
    pythonProcesses.delete(taskId); 
    win.webContents.send(`amazonDataClose`, taskId, taskGroupId, code)
  });

  pythonProcesses.set(taskId, pythonProcess);
});

