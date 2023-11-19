import destroyer from './destroyer.js'

export const reveal = (minesweeper, { x, y }, isNotBomb) => {
    const cell = document.querySelector(`td[data-pos="${y} - ${x}"]`)

    if (!cell || cell.classList.contains('revealed')) {
        return
    }

    if (isNotBomb) {
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

        minesweeper.incrementScore(1)
        if (minesweeper.isFinished()) {
            displayEndMessage('🏆🏆 CONGRATS, YOU WIN ! 🏆🏆', 'endMessage', 'endMessage__win')
            destroyer(minesweeper)
        }

        return
    }
    cell.innerHTML = '💣'
    cell.classList.add('bomb')
    displayEndMessage('💀💀 OH NOOO, YOU EXPLOSED ! 💀💀', 'endMessage', 'endMessage__fail')
    minesweeper.forceEnding()
    destroyer(minesweeper)
}



export const end = () => {
    const divGrid = document.querySelector(".grid")
    document.querySelector(".level").style.display = "flex"
    document.querySelector(".leave")?.remove()
    document.querySelector(".fail")?.remove()
    document.querySelector(".win")?.remove()
    document.querySelector(".bombNumber")?.remove()
    document.querySelector(".moveCounter")?.remove()
    divGrid.innerHTML = ""
}

export const displayInDOM = (id, node, content, ...classes) => {
    document.getElementById(`${id}`) ? document.getElementById(`${id}`).remove() : false
    let el = document.createElement(`${node}`)
    classes.forEach((className) => el.classList.add(`${className}`));
    el.id = id
    el.textContent = content
    document.getElementById("gameInfos").appendChild(el)
}

const displayEndMessage = (message, ...classes) => {
    let elm = document.createElement('p')
    classes.forEach((className) => elm.classList.add(`${className}`));
    elm.innerHTML = `${message}`
    document.querySelector('.container').appendChild(elm)

    // Set a timeout to remove the element after 3 seconds
    setTimeout(() => {
        document.querySelector('.container').removeChild(elm)
        end()
    }, 3000)
}
