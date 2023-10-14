import { onBtnDifficultyClick } from './userActions.js';
import Minesweeper from './minesweeper.js';

let infos = {
    difficulty: 0,
    dimension: 0,
}

document.querySelectorAll(".level__btn").forEach(item => (item.addEventListener('click', (e) => {
    // afficher btn start
    infos = onBtnDifficultyClick(e)
})))

document.querySelector(".level__btn-start").addEventListener('click', () => {
    const { difficulty, dimension } = infos
    if (difficulty !== 0 || dimension !== 0) {
        document.querySelector(".level").style.display = "none"
        new Minesweeper(infos.dimension, infos.dimension, infos.difficulty)
    }
})
