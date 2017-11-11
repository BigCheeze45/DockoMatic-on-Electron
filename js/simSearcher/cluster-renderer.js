/**
 * These are indexes for the YES, NO button
 * used in the cancel dialog window, which
 * pops up when the 'Cancel' button is press
 * in the Clustering wizard window
 */
const YES = 0
const NO  = 1
const ipc = require('electron').ipcRenderer

const selectMappedDirectoryBtn = document.getElementById('selectMappedDirectoryBtn')
selectMappedDirectoryBtn.onclick = function () {
    showDialog('Select mapped directory', [{
        name: 'All files',
        extensions: ['*']
        // if on macOS 'createDirectory' allows directory creation from within the dialog
    }], ['openDirectory', 'createDirectory'], 'mappedDirectoryDisplayArea')
}

const selectClusterOutputDirectoryBtn = document.getElementById('selectClusterOutputDirectoryBtn')
selectClusterOutputDirectoryBtn.onclick = function () {
    showDialog('Select clustering output directory', [{
        name: 'All files',
        extensions: ['*']
        // if on macOS 'createDirectory' allows directory creation from within the dialog
    }], ['openDirectory', 'createDirectory'], 'clusterOutputDirectoryDisplayArea')
}

const clusterCancelBtn = document.getElementById('clusterCancelBtn')
clusterCancelBtn.onclick = function () {
    const {
        dialog
    } = require('electron').remote

    dialog.showMessageBox({
        type: "warning",
        title: "Cancel clustering",
        message: "Cancel clustering:",
        detail: " Do you want to cancel this clustering?",
        buttons: ['Yes', 'No']
    }, function (response) {
        if (response == YES) {
            ipc.send('close-cluster-window')
        }
    })

    //destroy dialog
    dialog = null
}

/**
 * Show/hide advacned options inputs when 'View advanced run options' is check
 */
const clusterAdvancedRunOptions = document.getElementById('clusterAdvancedRunOptions')
clusterAdvancedRunOptions.addEventListener('change', function () {
    const show = document.getElementById('clusterAdvancedRunOptions').checked
    if (show) {
        document.getElementById('advancedRunOptions').style.display = 'block'
    } else {
        document.getElementById('advancedRunOptions').style.display = 'none'
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