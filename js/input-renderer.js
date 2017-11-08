// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
const ipc = require('electron').ipcRenderer

/*
The JS code below is the basic workflow to open a file
selector from a button press. This process can be repeated
for any other button. For now, I'll copy paste for the other
buttons and eventually minimize it into a fuction. ATM, I'm not
sure
*/
// OUT DIR
const selectDirBtn = document.getElementById('selectOutputDirBtn')
// on click send signal to main process to show file selection dialog box
selectDirBtn.addEventListener('click', function (event) {
    ipc.send('open-file-dialog')
})
// main process singals back to the renderer process
// which displays the selected file/directory
ipc.on('selected-directory', function (event, path) {
    document.getElementById('selected-file').innerHTML = `${path}`
})

// LIGAND
const selectLigandBtn = document.getElementById('ligandSelectorBtn')
// on click send signal to main process to show file selection dialog box
selectLigandBtn.addEventListener('click', function (event) {
    ipc.send('open-file-dialog')
})
// SECONDARY ligand
const secondayLigandBtn = document.getElementById('secondaryLigandSelectorBtn')
// on click send signal to main process to show file selection dialog box
secondayLigandBtn.addEventListener('click', function (event) {
    ipc.send('open-file-dialog')
})

// RECPETOR
const receptorBtn = document.getElementById('receptorSelectorBtn')
// on click send signal to main process to show file selection dialog box
receptorBtn.addEventListener('click', function (event) {
    ipc.send('open-file-dialog')
})

// RECPETOR
const gpfBtn = document.getElementById('gpfSelectorBtn')
// on click send signal to main process to show file selection dialog box
gpfBtn.addEventListener('click', function (event) {
    ipc.send('open-file-dialog')
})