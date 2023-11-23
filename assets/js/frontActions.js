import loseAnimation from './loseAnimation.js'
import destroyer from './destroyer.js'

export const reveal = (minesweeper, { x, y }, isNotBomb) => {
    const cell = document.querySelector(`td[data-pos="${y} - ${x}"]`)

    if (!cell || cell.classList.contains('revealed')) {
        return
    }

    if (isNotBomb) {
        const value = minesweeper.getValue(x, y)
        if (cell.classList.contains('flagged')) {
            cell.classList.remove('flagged')
        }
        cell.classList.add('revealed')
        if (value === '0') {
            cell.innerHTML = ''
            minesweeper.getNeighbors({ x, y }).forEach(neighborsCoords => {
                reveal(minesweeper, neighborsCoords, isNotBomb)
            })
        } else {
            cell.innerHTML = value
        }

        minesweeper.incrementScore(1)
        if (minesweeper.isFinished()) {
            displayEndMessage('🏆🏆 CONGRATS, YOU WIN ! 🏆🏆', 'endMessage', 'endMessage__win')
            destroyer(minesweeper)
        }

        return
    }
    minesweeper.forceEnding()
    loseAnimation(minesweeper, { x, y })
        .then(() => {
            setTimeout(() => {
                displayEndMessage('💀💀 OH NOOO, YOU EXPLOSED ! 💀💀', 'endMessage', 'endMessage__fail')
                destroyer(minesweeper)
            }, 500)
        })
}

export const addFlag = (target) => {
    target.classList.toggle('flagged')
    target.innerHTML = target.innerHTML === '🚩' ? '' : '🚩'
}

export const end = () => {
    const divGrid = document.querySelector(".grid")
    document.querySelector(".level").style.display = "flex"
    document.querySelector(".flag__btn")?.remove()
    document.querySelector(".leave")?.remove()
    document.querySelector(".fail")?.remove()
    document.querySelector(".win")?.remove()
    document.querySelector(".bombNumber")?.remove()
    document.querySelector(".moveCounter")?.remove()
    divGrid.classList.remove('flag__mode')
    divGrid.innerHTML = ""
}

export const displayInDOM = (id, node, content, ...classes) => {
    document.getElementById(`${id}`) ? document.getElementById(`${id}`).remove() : false
    const el = document.createElement(`${node}`)
    classes.forEach((className) => el.classList.add(`${className}`));
    el.id = id
    el.textContent = content
    document.getElementById("gameInfos").appendChild(el)
}

export async function colorFrame(cell, cellClass, permanent = false) {
    return new Promise((resolve) => {
        cell.classList.add(cellClass)

        if (!permanent) {
            setTimeout(() => {
                cell.classList.remove(cellClass)

                resolve()
            }, 500)
        }

        resolve()
    })
}

const displayEndMessage = (message, ...classes) => {
    const elm = document.createElement('p')
    classes.forEach((className) => elm.classList.add(`${className}`));
    elm.innerHTML = `${message}`
    document.querySelector('.container').appendChild(elm)

    // Set a timeout to remove the element after 3 seconds
    setTimeout(() => {
        document.querySelector('.container').removeChild(elm)
        end()
    }, 3000)
}
