/**
 * These are indexes for the YES, NO button
 * used in the cancel dialog window, which
 * pops up when the 'Cancel button is press
 * in the Molecular database mapping window
 */
const YES = 0
const NO = 1
const ipc = require('electron').ipcRenderer

const selectDBDirectoryBtn = document.getElementById('selectDBDirectoryBtn')
selectDBDirectoryBtn.onclick = function () {
    showDialog('Select Database directory', [{
        name: 'All files',
        extensions: ['*']
        // if on macOS 'createDirectory' allows directory creation from within the dialog
    }], ['openDirectory', 'createDirectory'], 'dbDirectoryDisplayArea')
}

const selectMapOutputDirectoryBtn = document.getElementById('selectMapOutputDirectoryBtn')
selectMapOutputDirectoryBtn.onclick = function () {
    showDialog('Select mapping output directory', [{
        name: 'All files',
        extensions: ['*']
        // if on macOS 'createDirectory' allows directory creation from within the dialog
    }], ['openDirectory', 'createDirectory'], 'mapOutputDirectoryDisplayArea')
}

const mapCancelBtn = document.getElementById('mapCancelBtn')
mapCancelBtn.onclick = function () {
    const {
        dialog
    } = require('electron').remote

    dialog.showMessageBox({
        type: "warning",
        title: "Cancel Molecular database mapping",
        message: "Cancel mapping:",
        detail: " Do you want to cancel this Molecular database mapping?",
        buttons: ['Yes', 'No']
    }, function (response) {
        if (response == YES) {
            // TODO: implement feature correclty
            // although the message is send, the main process is not closing the window
            ipc.send('close-map-window')
        }
    })

    //destroy dialog
    dialog = null
}

/**
 * Show/hide Swarm Options input when 'Add Swarm options' is check
 */
const swarmOptions = document.getElementById('mapAddSwarmOptions')
swarmOptions.addEventListener('change', function () {
    const showOptions = document.getElementById('mapAddSwarmOptions').checked
    if (showOptions) {
        document.getElementById('swarOptions').style.visibility = 'visible'
    } else {
        document.getElementById('swarOptions').style.visibility = 'hidden'
    }
})

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
            document.getElementById(displayArea).value = `${files}`
        }
    })

    // destroy dialog prompt to be safe
    dialog = null
}