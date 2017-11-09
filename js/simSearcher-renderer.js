// TODO: sim search logic
const BrowserWindow = require('electron').remote.BrowserWindow
const path = require('path')

const mapWizardBtn = document.getElementById('mapWizardBtn')

mapWizardBtn.addEventListener('click', function (event) {
    const modalPath = path.join('file://', __dirname, '../simSearcher/map.html')
    let win = new BrowserWindow({ width: 400, height: 320 })
    win.on('close', function () { win = null })
    win.loadURL(modalPath)
    win.show()
})