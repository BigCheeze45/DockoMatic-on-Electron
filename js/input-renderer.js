var jobNumber = 1
// use to send messages back/forth to main channel
const ipc = require('electron').ipcRenderer

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
        // if on macOS 'createDirectory' allows directory creation from within the dialog
    }], ['openDirectory', 'createDirectory'], 'outputDirDisplay')
}

// "New job" button: when pushed, it opens a channel and sends signal
// to main process which then reponse with a signal of its own
// this signal is caught in output-renderer.js to update the status table
const newJobBtn = document.getElementById('newJobBtn')
newJobBtn.onclick = function () {
    alert(`${newJob.jobNumber}`)
    // create new job object
    var newJob = new Object()
    // fill the object details
    newJob.jobNumber = jobNumber
    newJob.ADCycles = document.getElementById('ADCycles').value
    newJob.ligand = document.getElementById('ligandDisplayArea').value
    newJob.secondaryLigand = document.getElementById('secondaryLigandDisplayArea').value
    newJob.receptor = document.getElementById('receptorDisplayArea').value
    newJob.gpf = document.getElementById('gpfDisplayArea').value
    newJob.outDir = document.getElementById('outputDirDisplay').value
    jobNumber = jobNumber + 1

    // write to status table
    document.getElementById('jobNumTD').value = `${jobNumber}`

    // const ligand = document.getElementById('ligandDisplayArea').value
    // const secondaryLigand = document.getElementById('secondaryLigandDisplayArea').value
    // const receptor = document.getElementById('receptorDisplayArea').value
    // const gpf = document.getElementById('gpfDisplayArea').value
    // const outDir = document.getElementById('outputDirDisplay').value
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