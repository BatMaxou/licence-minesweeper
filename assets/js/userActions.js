import Minesweeper from './minesweeper.js'
import destroyer from './destroyer.js'
import { end, displayInDOM } from './frontActions.js'

export const onBtnDifficultyClick = (e) => {
    let level = parseInt(e.target.value)
    let gridCount = 0
    const divGrid = document.querySelector(".grid")
    divGrid.innerHTML = ""
    document.querySelector(".errorMessage")?.remove()
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
            displayInDOM('errorMessage', 'p', 'The difficulty level is incorrect.', 'errorMessage')
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

export const onBtnStartClick = ({ difficulty, dimension }) => {

    //display error message if no difficulty level or grid
    if (difficulty === 0 || dimension === 0 || document.querySelector(".grid")?.children.length === 0) {
        if (!document.querySelector('.errorMessage')) {
            displayInDOM('errorMessage', 'p', 'You must choose a level.', 'errorMessage')
        }
        return
    }
    //remove errorMessage, levelBtn
    document.querySelector(".errorMessage")?.remove()
    document.querySelector(".level").style.display = "none"

    //add moveCounter, leaveBtn, bombCount
    displayInDOM('moveCounter', 'p', 'Moves counter : 0', 'moveCounter')
    const bombs = { 1: 10, 2: 30, 3: 75 };
    displayInDOM('bombNumber', 'p', `Bomb x ${bombs[difficulty]}`, 'bombNumber')
    displayInDOM('leaveBtn', 'button', 'Leave', 'leave')

    return new Minesweeper(dimension, dimension, difficulty)
}

export const onBtnLeaveClick = (minesweeper) => {
    end()
    destroyer(minesweeper)
}

export const onCellClick = (e) => {
    const [y, x] = e.target.dataset.pos.replaceAll(" ", "").split("-")
    updateMoveCounter()
    // au cas ou l'utilisateur change les coordonnées de la cellule
    return {
        x: parseInt(x, 10),
        y: parseInt(y, 10)
    }
}

const updateMoveCounter = () => {
    const moveCounterElem = document.querySelector('.moveCounter');
    const moveCounterText = moveCounterElem.textContent;
    const incrementedText = moveCounterText.replace(/(\d+)/, (match, num) => {
        const incrementedValue = parseInt(num) + 1;
        return incrementedValue;
    });

    document.getElementById('moveCounter').textContent = incrementedText;
}
