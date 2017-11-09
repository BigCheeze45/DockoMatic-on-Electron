const selectLigandBtn = document.getElementById('selectLigandBtn')
selectLigandBtn.onclick = function () {
    const useLigandList = document.getElementById('ligandUseList').checked
    if (useLigandList) {
        // dialog title, file filters, type of dialog promt (file selection in this case)
        // input field to populate with selected file
        showDialog('Select ligand list file', [{
            name: 'All files',
            extensions: ['*']
        }], ['openFile'], 'ligandDisplayArea')
    } else {
        showDialog('Select ligand file', [{
            name: 'Protein Data Bank',
            extensions: ['pdb']
        }], ['openFile'], 'ligandDisplayArea')
    }
}

const selectSecondaryLigandBtn = document.getElementById('selectSecondaryLigandBtn')
selectSecondaryLigandBtn.onclick = function () {
    const useSecondaryLigandList = document.getElementById('secondaryLigadUseList').checked
    if (useSecondaryLigandList) {
        showDialog('Select secondary ligand list file', [{
            name: 'All files',
            extensions: ['*']
        }], ['openFile'], 'secondaryLigandDisplayArea')
    } else {
        showDialog('Select secondary ligand file', [{
            name: 'Protein Data Bank',
            extensions: ['pdb']
        }], ['openFile'], 'secondaryLigandDisplayArea')
    }
}

const selectReceptorBtn = document.getElementById('selectReceptorBtn')
selectReceptorBtn.onclick = function () {
    const receptorUseList = document.getElementById('receptorUseList').checked
    if (receptorUseList) {
        showDialog('Select receptor list file', [{
            name: 'All files',
            extensions: ['*']
        }], ['openFile'], 'receptorDisplayArea')
    } else {
        showDialog('Select receptor file', [{
            name: 'Protein Data Bank',
            extensions: ['pdb']
        }], ['openFile'], 'receptorDisplayArea')
    }
}

const selectGPFBtn = document.getElementById('selectGPFBtn')
selectGPFBtn.onclick = function () {
    const useList = document.getElementById('gpfUseList').checked
    if (useList) {
        showDialog('Select Grid Parameter File list', [{
            name: 'All files',
            extensions: ['*']
        }], ['openFile'], 'gpfDisplayArea')
    } else {
        showDialog('Select Grid Parameter File', [{
            name: 'Grid Parameter File',
            extensions: ['gpf']
        }], ['openFile'], 'gpfDisplayArea')
    }
}

const selectOutputDirBtn = document.getElementById('selectOutputDirBtn')
selectOutputDirBtn.onclick = function () {
    showDialog('Select Grid Parameter File list', [{
        name: 'All files',
        extensions: ['*']
    }], ['openDirectory', 'createDirectory'], 'outputDirDisplay')
    // if on macOS 'createDirectory' allows directory creation from within the dialog
}

/**
 * Show native file/directory selection
 * @param {*String} dialogTitle Display title of the prompt
 * @param {*String[]} dialogFilters Electron FileFilters
 * @param {*String[]} dialogProperties Electron showOpenDialog properties object
 * @param {*String} displayArea Input fieldd to populate with the selected file/directory name
 */
function showDialog(dialogTitle, dialogFilters, dialogProperties, displayArea) {
    const {
        dialog
    } = require('electron').remote
    dialog.showOpenDialog({
        title: dialogTitle,
        filters: dialogFilters,
        properties: dialogProperties
    }, function (files) {
        document.getElementById(displayArea).value = `${files}`
    })

    // destroy dialog prompt to be safe
    dialog = null
}