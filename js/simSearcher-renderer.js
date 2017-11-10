// use to send message back/forth to main.js
const ipc = require('electron').ipcRenderer

const mapWizardBtn = document.getElementById('mapWizardBtn')
mapWizardBtn.addEventListener('click', function () {
    ipc.send('create-map-window', 'mapWizard')
})

ipc.on('asynchronous-reply', function (event, arg) {
    const message = `Asynchronous message reply: ${arg}`
    alert(`${message}`)
    // document.getElementById('async-reply').innerHTML = message
})
// // TODO: sim search logic
// const BrowserWindow = require('electron').remote.BrowserWindow
// const path = require('path')

// // mapWizardBtn.addEventListener('click', function (event) {
// //     const modalPath = path.join('file://', __dirname, '../simSearcher/map.html')
// //     let win = new BrowserWindow({
// //         width: 400,
// //         height: 320
// //     })
// //     win.on('close', function () {
// //         win = null
// //     })
// //     win.loadURL(modalPath)
// //     win.show()
// // })
// const addSwarmOptions = document.getElementById('queryAddSwarmOptions').checked
// if (addSwarmOptions) {
//     alert("box checkd")
//     // document.getElementById('swarmOptionsLabel').style.display = 'block'
//     // document.getElementById('querySwarmOptions').style.display = 'block'
// }