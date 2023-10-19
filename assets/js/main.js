import { onBtnDifficultyClick } from './userActions.js';
import Minesweeper from './minesweeper.js';

let level = null

document.querySelectorAll("button").forEach(item => (item.addEventListener('click', onBtnDifficultyClick)))

new Minesweeper(10, 10, 10);