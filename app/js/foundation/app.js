$(document).foundation();
const ipc = require('electron').ipcRenderer;
const selectDirBtn = document.getElementById('selectOutputDirBtn');

selectDirBtn.addEventListener('click', function (event) {
    ipc.send('open-file-dialog')
})

ipc.on('selected-directory', function (event, path) {
    document.getElementById('selected-file').innerHTML = `You selected: ${path}`
})