const ipc = require('electron').ipcRenderer

/**
 * The general workflow when a button is clicked is to get the button,
 * create a channel to send message to main process then send the message
 * 
 * On click send signal to main process to show file selection dialog box
 * The second string is to ID the button that was pushed
*/

// OUTPUT DIRECTORY
const selectOutputDirBtn = document.getElementById('selectOutputDirBtn')
selectOutputDirBtn.addEventListener('click', function (event) {
    ipc.send('open-file-dialog', 'selectOutputDirBtn')
})

// LIGAND
const selectLigandBtn = document.getElementById('selectLigandBtn')
selectLigandBtn.addEventListener('click', function (event) {
    ipc.send('open-file-dialog', 'selectLigandBtn')
})

// SECONDARY LIGAND
const selectSecondaryLigandBtn = document.getElementById('selectSecondaryLigandBtn')
selectSecondaryLigandBtn.addEventListener('click', function (event) {
    ipc.send('open-file-dialog', 'selectSecondaryLigandBtn')
})

// RECPETOR
const selectReceptorBtn = document.getElementById('selectReceptorBtn')
selectReceptorBtn.addEventListener('click', function (event) {
    ipc.send('open-file-dialog', 'selectReceptorBtn')
})

// GRID PARAMETER FILE
const selectGPFBtn = document.getElementById('selectGPFBtn')
selectGPFBtn.addEventListener('click', function (event) {
    ipc.send('open-file-dialog', 'selectGPFBtn')
})

/**
 * The main process will respond 
 */
ipc.on('selected-directory', function (event, path) {
    document.getElementById('outputDirDisplay').value = `${path}`
})