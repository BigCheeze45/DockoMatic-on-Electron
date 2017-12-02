const electron = require('electron')
// Module to control application life.
const app = electron.app
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow

const path = require('path')
const url = require('url')
const ipc = require('electron').ipcMain
const Menu = electron.Menu
const MenuItem = electron.MenuItem

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow
let mapWizardWindow
let clusterWizardWindow
let queryWizardWindow
let timWindow

function createMainWindow() {
	// Create the browser window.
	mainWindow = new BrowserWindow({
		width: 800,
		height: 600,
		fullscreen: true
	})

	// and load the index.html of the app.
	mainWindow.loadURL(url.format({
		pathname: path.join(__dirname, 'input.html'),
		protocol: 'file:',
		slashes: true
	}))

	mainWindow.maximize()

	// Open the DevTools.
	// mainWindow.webContents.openDevTools()

	// Emitted when the window is closed.
	mainWindow.on('closed', function () {
		// Dereference the window object, usually you would store windows
		// in an array if your app supports multi windows, this is the time
		// when you should delete the corresponding element.
		app.quit()
	})
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createMainWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
	// On OS X it is common for applications and their menu bar
	// to stay active until the user quits explicitly with Cmd + Q
	if (process.platform !== 'darwin') {
		app.quit()
	}
})

app.on('activate', function () {
	// On OS X it's common to re-create a window in the app when the
	// dock icon is clicked and there are no other windows open.
	if (mainWindow === null) {
		createMainWindow()
	}
})

// Right-click context menu for Step 2 of T.I.M wizard
const menu = new Menu()
menu.append(new MenuItem({
	label: 'Open in browser'
}))

app.on('browser-window-created', function (event, win) {
	win.webContents.on('context-menu', function (e, params) {
		menu.popup(win, params.x, params.y)
	})
})
// ipc.on('show-context-menu', function (event) {
// 	const win = BrowserWindow.fromWebContents(event.sender)
// 	menu.popup(win)
// })

//// NEW JOB BTN ////
ipc.on('create-new-job', function (event, arg) {
	mainWindow.loadURL('output.html')
	mainWindow.webContents.on('did-finish-load', function () {
		mainWindow.webContents.send('send-job-to-input', arg);
	})
	console.log("object sent")
})
//// NEW JOB BTN ////

///////// WINDOW MANAGEMENT /////////
//// CREATING WINDOWS ////
ipc.on('create-map-window', function (event, arg) {
	createMapWizardWindow()
})

ipc.on('create-cluster-window', function (event, arg) {
	createClusterWizardWindow()
})

ipc.on('create-query-window', function (event, arg) {
	createQueryWizardWindow()
})

ipc.on('create-TIM-window', function (event, arg) {
	createTIMWindow()
})
//// CREATING WINDOWS ////

//// DESTROYING WINDOWS ////
ipc.on('close-map-window', function (event, arg) {
	mapWizardWindow.close()
	mapWizardWindow = null
})

ipc.on('close-cluster-window', function (event, arg) {
	clusterWizardWindow.close()
	clusterWizardWindow = null
})

ipc.on('close-query-window', function (event, arg) {
	queryWizardWindow.close()
	queryWizardWindow = null
})

ipc.on('close-tim-window', function (event, arg) {
	// incase the pop-window was already closed by click 'x'
	if (timWindow != null) {
		timWindow.close()
		timWindow = null
	}
})
//// DESTROYING WINDOWS ////

/**
 * Create the Molecular Database Mapping window
 * that comes up when the 'Map' button is press
 * in the SimSearcher section
 */
function createMapWizardWindow() {
	// Create the browser window.
	mapWizardWindow = new BrowserWindow({
		width: 800,
		height: 600
	})
	mapWizardWindow.loadURL(url.format({
		pathname: path.join(__dirname, 'simSearcher/map.html'),
		protocol: 'file:',
		slashes: true
	}))
}

/**
 * Create the Clustering wizard window
 * that comes up when the 'Cluster' button is press
 * in the SimSearcher section
 */
function createClusterWizardWindow() {
	// Create the browser window.
	clusterWizardWindow = new BrowserWindow({
		width: 800,
		height: 600
	})
	clusterWizardWindow.loadURL(url.format({
		pathname: path.join(__dirname, 'simSearcher/cluster.html'),
		protocol: 'file:',
		slashes: true
	}))
}

/**
 * Create the Query wizard window
 * that comes up when the 'Query' button is press
 * in the SimSearcher section
 */
function createQueryWizardWindow() {
	// Create the browser window.
	queryWizardWindow = new BrowserWindow({
		width: 800,
		height: 600
	})
	queryWizardWindow.loadURL(url.format({
		pathname: path.join(__dirname, 'simSearcher/query.html'),
		protocol: 'file:',
		slashes: true
	}))
}

function createTIMWindow() {
	timWindow = new BrowserWindow({
		width: 800,
		height: 600
	})
	timWindow.loadURL(url.format({
		pathname: path.join(__dirname, 'timWizard/stepOne-EnterSequence.html'),
		protocol: 'file:',
		slashes: true
	}))
}
///////// WINDOW MANAGEMENT /////////