const {
  app,
  BrowserWindow
} = require('electron')
const path = require('path')
const glob = require('glob')
const url = require('url')
const ipc = require('electron').ipcMain
const dialog = require('electron').dialog

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let appWindow

/**
 Funtion to create the initial application window
*/
function initWindow() {
  appWindow = new BrowserWindow({
    center: true,
    useContentSize: true
  });

  // load UI from index.html
  appWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'input.html'),
    protocol: 'file',
    slashes: true
  }));
  // DEVELOPER CONSOLE
  // appWindow.webContents.openDevTools()
  // Dereference the window object, usually you would store windows
  // in an array if your app supports multi windows, this is the time
  // when you should delete the corresponding element.
  appWindow.on('closed', () => {
    appWindow = null;
  });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', initWindow);

// Quit when all windows are closed.
// On macOS it is common for applications and their menu bar
// to stay active until the user quits explicitly with Cmd + Q
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// On macOS it's common to re-create a window in the app when the
// dock icon is clicked and there are no other windows open.
app.on('activate', () => {
  if (win === null) {
    createWindow()
  }
});

// Require each JS file in the main-process dir
function loadDemos() {
  var files = glob.sync(path.join(__dirname, 'app/**/*.js'))
  files.forEach(function (file) {
    require(file)
  })
  // Note sure if this is needed but will leave uncomment for now
  // autoUpdater.updateMenu()
}