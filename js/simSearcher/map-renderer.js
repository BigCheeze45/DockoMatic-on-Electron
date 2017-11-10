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