export function reveal(minesweeper, { x, y }, isNotBomb) {
    const cell = document.querySelector(`td[data-pos="${y} - ${x}"]`)

    if (!cell || cell.classList.contains('revealed')) {
        return
    }

    const value = minesweeper.getValue(x, y)

    if (isNotBomb) {
        cell.innerHTML = value
        cell.classList.add('revealed')

        if (value === '0') {
            minesweeper.getNeighbors(x, y).forEach(neighborsCoords => {
                reveal(minesweeper, neighborsCoords, isNotBomb)
            })
        }

        return
    }

    cell.innerHTML = '💣'
    cell.classList.add('bomb')
}
