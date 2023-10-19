export function reveal(minesweeper, { x, y }, isNotBomb) {
    const cell = document.querySelector(`td[data-pos="${y} - ${x}"]`)

    if (!cell || cell.classList.contains('revealed')) {
        return
    }

    const value = minesweeper.getValue(x, y)

    if (isNotBomb) {
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
}
