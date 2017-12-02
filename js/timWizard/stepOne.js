const ipc = require('electron').ipcRenderer

const sequenceOutDirBtn = document.getElementById('sequenceOutDirBtn')
sequenceOutDirBtn.onclick = function () {
    showDialog('Select output directory', [{
        name: 'All files',
        extensions: ['*']
        // if on macOS 'createDirectory' allows directory creation from within the dialog
    }], ['openDirectory', 'createDirectory'], 'sequenceOutDirDisplayArea')
}

const selectSequenceBtn = document.getElementById('selectSequenceBtn')
selectSequenceBtn.onclick = function () {
    showDialog('Select sequence file', [{
        name: 'Modeller Alignment Readable File',
        extensions: ['ali']
    }, {
        name: 'All files',
        extensions: ['*']
    }], ['openFile'], 'selectSequenceDisplayArea')
}

const cancelBtn = document.getElementById('stepTwoCancelButton')
/*
 * Ideally, this function would be called after a search is  complete
 * and simply populate the table by filling the TextNode with 
 * search results, allowing users to open it in a browser.
 */
cancelBtn.onclick = function () {
    var tableBody = document.getElementById("stepTwoTableBody")

    var newRow = document.createElement("tr")

    var templateCell = document.createElement("td")
    var eValueCell = document.createElement("td")
    var lengthCell = document.createElement("td")
    var scoreCell = document.createElement("td")
    var identitiesCell = document.createElement("td")
    var positivesCell = document.createElement("td")
    var gapsCell = document.createElement("td")

    var templateData = document.createTextNode("template data")
    var eValueData = document.createTextNode("eValue data")
    var lengthData = document.createTextNode("length data")
    var scoreData = document.createTextNode("score data")
    var identitiesData = document.createTextNode("IDs data")
    var positivesData = document.createTextNode("positives data")
    var gapsData = document.createTextNode("gaps data")

    templateCell.appendChild(templateData)
    eValueCell.appendChild(eValueData)
    lengthCell.appendChild(lengthData)
    scoreCell.appendChild(scoreData)
    identitiesCell.appendChild(identitiesData)
    positivesCell.appendChild(positivesData)
    gapsCell.appendChild(gapsData)

    newRow.appendChild(templateCell)
    newRow.appendChild(eValueCell)
    newRow.appendChild(lengthCell)
    newRow.appendChild(scoreCell)
    newRow.appendChild(identitiesCell)
    newRow.appendChild(positivesCell)
    newRow.appendChild(gapsCell)

    tableBody.appendChild(newRow)
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