import { onBtnDifficultyClick, onBtnStartClick, onBtnLeaveClick, onCellClick, onBtnFlagClick } from './userActions.js'
import { reveal, addFlag } from './frontActions.js'

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
            if (minesweeper.isFinished() || cell.classList.contains('revealed')) {
                return
            }

            if (minesweeper.isFlagMode()) {
                addFlag(cell)

                return
            }

            if (cell.classList.contains('flagged')) {
                return
            }

            const coords = onCellClick(e)
            const isNotBomb = minesweeper.try(coords)
            reveal(minesweeper, coords, isNotBomb)
        }))

        document.querySelector(".flag__btn").addEventListener('click', (e) => onBtnFlagClick(e.target, minesweeper))
        document.querySelector(".leave").addEventListener('click', () => onBtnLeaveClick(minesweeper))
    }
})
