const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const { spawn } = require('child_process');

let win = null

const isDev = process.env.NODE_ENV === 'development' ? true : false

function createWindow () {
  win = new BrowserWindow({
    width: 1080,
    height: 600,
    frame: false,
    maximizable: true,
    show: false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js')
    }
  })

  win.maximize()
  win.setMinimumSize(1080, 600);

  if (isDev) {
    win.loadURL('http://localhost:3000')
  } else {
    win.loadURL(`file://${__dirname}/build_react/index.html`);
  }  
  
  win.show()

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

// --------------------- for scripts ------------------------------------
//------------------------------------------------------------------------
//------------------------------------------------------------------------
//------------------------------------------------------------------------

let pythonProcesses = new Map();

ipcMain.on('kill', (event, id) => {
  if (!pythonProcesses.has(id)) {
    console.log(`Python process with pid ${id} not running`);
    return;
  }
  const pythonProcess = pythonProcesses.get(id);
  pythonProcess.stdin.write('End\n');
  pythonProcess.stdin.end();
  pythonProcesses.delete(id); 
})

ipcMain.on('amazon', (event, id, params) => {

  let pythonProcess = {}

  if (isDev) {
    const pyPath = path.join(process.cwd(), 'python', "amazon.py");
    pythonProcess = spawn('python', ["-u", pyPath, ...params]);
  } else {
    const exePath = path.join(process.resourcesPath, 'app.asar.unpacked', 'build_python', "amazon.exe");
    pythonProcess = spawn(exePath, params);
  }

  pythonProcess.stdout.on('data', (data) => {
    const stringData = data.toString();
    console.log(stringData)
    win.webContents.send(`amazonDataGood`, id, stringData)
  });

  pythonProcess.stderr.on('data', (data) => {
    const stringData = data.toString();
    console.log(stringData)
    win.webContents.send(`amazonDataBad`, id, stringData)
  });

  pythonProcess.on('close', (code) => {
    console.log(`child process exited with code ${code}`);
    pythonProcesses.delete(id); 
    win.webContents.send(`amazonDataClose`,id, code)
  });

  pythonProcesses.set(id, pythonProcess);
});

