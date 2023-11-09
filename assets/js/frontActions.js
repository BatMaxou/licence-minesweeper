import destroyer from './destroyer.js'

export function reveal(minesweeper, { x, y }, isNotBomb) {
    const cell = document.querySelector(`td[data-pos="${y} - ${x}"]`)

    if (!cell || cell.classList.contains('revealed')) {
        return
    }

    if (isNotBomb) {
        minesweeper.score += 1
        if (minesweeper.isFinished()) {
            displayWin()
            destroyer(minesweeper)
            return
        }
        const value = minesweeper.getValue(x, y)
        cell.classList.add('revealed')
        if (value === '0') {
            cell.innerHTML = ''
            minesweeper.getNeighbors(x, y).forEach(neighborsCoords => {
                reveal(minesweeper, neighborsCoords, isNotBomb)
            })
        } else {
            cell.innerHTML = value
        }
        return
    }
    cell.innerHTML = '💣'
    cell.classList.add('bomb')
    displayFail()
    destroyer(minesweeper)
}

function displayFail() {
    const failMessage = document.createElement('p')
    failMessage.classList.add('endMessage', 'endMessage__fail')
    failMessage.textContent = '💀💀 OH NOOO, YOU EXPLOSED ! 💀💀'
    document.querySelector('.container').appendChild(failMessage)

    // Set a timeout to remove the element after 10 seconds
    setTimeout(function () {
        document.querySelector('.container').removeChild(failMessage)
        end()
    }, 3000)
}

function displayWin() {
    const winMessage = document.createElement('p')
    winMessage.classList.add('endMessage', 'endMessage__win')
    winMessage.textContent = '🏆🏆 CONGRATS, YOU WIN ! 🏆🏆'
    document.querySelector('.container').appendChild(winMessage)

    // Set a timeout to remove the element after 10 seconds
    setTimeout(function () {
        document.querySelector('.container').removeChild(winMessage)
        end()
    }, 3000)
}

export function end() {
    const divGrid = document.querySelector(".grid")
    document.querySelector(".level").style.display = "flex"
    document.querySelector(".leave")?.remove()
    document.querySelector(".fail")?.remove()
    document.querySelector(".win")?.remove()
    document.querySelector(".bombNumber")?.remove()
    document.querySelector(".moveCounter")?.remove()
    divGrid.innerHTML = ""
}

export function displayBombNumber(number) {
    const bombNumber = document.createElement('p')
    bombNumber.classList.add('bombNumber')
    bombNumber.textContent = 'Bomb number : ' + number
    document.querySelector(".container").insertBefore(bombNumber, document.querySelector(".grid"))
}

export function displayErrorMessage(message) {
    const errorMessage = document.createElement('p')
    errorMessage.classList.add('errorMessage')
    errorMessage.textContent = message
    document.querySelector(".container").insertBefore(errorMessage, document.querySelector(".grid"))
}

export function moveCounter() {
    if (document.querySelector('.moveCounter')) {
        document.querySelector('.moveCounter').textContent = document.querySelector('.moveCounter').textContent.replace(/\d+/, match => parseInt(match) + 1);
        return
    }
    const moveCounter = document.createElement('p')
    moveCounter.classList.add('moveCounter')
    moveCounter.textContent = 'Moves counter : 1'
    document.querySelector(".container").insertBefore(moveCounter, document.querySelector(".grid"))
}