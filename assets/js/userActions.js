import Minesweeper from './minesweeper.js'
import destroyer from './destroyer.js'
import { end, displayErrorMessage } from './frontActions.js'

export function onBtnDifficultyClick(e) {
    let level = parseInt(e.target.value)
    let gridCount = 0
    const divGrid = document.querySelector(".grid")
    divGrid.innerHTML = ""
    switch (level) {
        case 1:
            gridCount = 10
            break
        case 2:
            gridCount = 15
            break
        case 3:
            gridCount = 20
            break
        default:
            displayErrorMessage('The difficulty level is incorrect.')
    }

    for (let i = 0; i < gridCount; i++) {
        let row = divGrid.insertRow(i)
        for (let j = 0; j < gridCount; j++) {
            let cell = row.insertCell(j)
            let pos = document.createAttribute("data-pos")
            pos.value = `${i} - ${j}`;
            cell.setAttributeNode(pos)
        }
    }

    return {
        difficulty: level,
        dimension: gridCount
    }
}

export function onBtnStartClick({ difficulty, dimension }) {
    let errorMessage = document.querySelector('.errorMessage')

    //display error message if no difficulty level
    if (difficulty === 0 || dimension === 0 || document.querySelector(".grid").children.length === 0) {
        if (!errorMessage) {
            displayErrorMessage('You must choose a level.')
        }
        return
    }
    document.querySelector(".errorMessage")?.remove()
    document.querySelector(".level").style.display = "none"

    // create leave btn
    const leaveBtn = document.createElement("button")
    leaveBtn.textContent = 'Leave';
    leaveBtn.classList.add('leave');
    document.querySelector(".container").insertBefore(leaveBtn, document.querySelector(".grid"))

    return new Minesweeper(dimension, dimension, difficulty)

}

export function onBtnLeaveClick(minesweeper) {
    end()
    destroyer(minesweeper)
}

export function onCellClick(e) {
    const [y, x] = e.target.dataset.pos.replaceAll(" ", "").split("-")

    // au cas ou l'utilisateur change les coordonnées de la cellule
    return {
        x: parseInt(x, 10),
        y: parseInt(y, 10)
    }
}
