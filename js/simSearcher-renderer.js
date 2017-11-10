// use to send message back/forth to main.js
const ipc = require('electron').ipcRenderer

const mapWizardBtn = document.getElementById('mapWizardBtn')
mapWizardBtn.addEventListener('click', function () {
    ipc.send('create-map-window')
})

const clusterWizardBtn = document.getElementById('clusterWizardBtn')
clusterWizardBtn.addEventListener('click', function () {
    ipc.send('create-cluster-window')
})

const queryWizardBtn = document.getElementById('queryWizardBtn')
queryWizardBtn.addEventListener('click', function () {
    ipc.send('create-query-window')
})