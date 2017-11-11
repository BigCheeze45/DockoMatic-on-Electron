const ipc = require('electron').ipcRenderer

ipc.on('send-job-to-input', function (event, arg) {
    console.log("creating new job")
  })