import { onBtnDifficultyClick, onBtnStartClick, onBtnLeaveClick, onCellClick } from './userActions.js'
import { reveal } from './frontActions.js'

let infos = {
    difficulty: 0,
    dimension: 0,
}

let minesweeper = null

document.querySelectorAll(".level__btn").forEach(item => (item.addEventListener('click', (e) => {
    infos = onBtnDifficultyClick(e)
})))

document.querySelector(".level__btn-start").addEventListener('click', () => {
    minesweeper = onBtnStartClick(infos)
    if (minesweeper) {
        const cells = document.querySelectorAll('td')
        cells.forEach(cell => cell.addEventListener('click', (e) => {
            const coords = onCellClick(e)
            const isNotBomb = minesweeper.try(coords)
            reveal(minesweeper, coords, isNotBomb)
        }))

        document.querySelector(".leave").addEventListener('click', () => onBtnLeaveClick(minesweeper))
    }
})