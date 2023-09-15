import { onBtnDifficultyClick } from './userActions.js';

document.querySelectorAll("button").forEach(item => (item.addEventListener('click', onBtnDifficultyClick)))
