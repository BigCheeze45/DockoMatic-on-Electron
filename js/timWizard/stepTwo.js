const ipc = require('electron').ipcRenderer

const browseForTemplateBtn = document.getElementById('browseForTemplateBtn')
browseForTemplateBtn.onclick = function () {
    showDialog('Select template file', [{
        name: 'All files',
        extensions: ['*']
    }], ['openFile'], null)
}

function showDialog(dialogTitle, dialogFilters, dialogProperties, displayArea) {
    const {
        dialog
    } = require('electron').remote
    dialog.showOpenDialog({
        title: dialogTitle,
        filters: dialogFilters,
        properties: dialogProperties
    }, function (files) {
        if (files) {
            if (displayArea != null) {
                document.getElementById(displayArea).value = `${files}`
            }
        }
    })

    // destroy dialog prompt to be safe
    dialog = null
}