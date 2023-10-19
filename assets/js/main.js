import { onBtnDifficultyClick, onBtnStartClick, onCellClick } from './userActions.js'
import { reveal } from './frontActions.js'

let infos = {
    difficulty: 0,
    dimension: 0,
}

let minesweeper = null

document.querySelectorAll(".level__btn").forEach(item => (item.addEventListener('click', (e) => {
    // afficher btn start
    infos = onBtnDifficultyClick(e)
})))

document.querySelector(".level__btn-start").addEventListener('click', () => {
    minesweeper = onBtnStartClick(infos)

    const cells = document.querySelectorAll('td')
    cells.forEach(cell => cell.addEventListener('click', (e) => {
        const coords = onCellClick(e)
        const isNotBomb = minesweeper.try(coords)
        reveal(minesweeper, coords, isNotBomb)
    }))
})
