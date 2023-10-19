import Minesweeper from './minesweeper.js'

export function onBtnDifficultyClick(e) {
    let level = parseInt(e.target.value)
    let gridCount = 0
    const divGrid = document.querySelector(".grid")
    divGrid.innerHTML = ""
    switch (level) {
        case 1:
            gridCount = 10
            break
        case 2:
            gridCount = 15
            break
        case 3:
            gridCount = 20
            break
        default:
            throw new Error('The difficulty level is incorrect.')
    }

    for (let i = 0; i < gridCount; i++) {
        let row = divGrid.insertRow(i)
        for (let j = 0; j < gridCount; j++) {
            let cell = row.insertCell(j)
            let pos = document.createAttribute("data-pos")
            pos.value = `${i} - ${j}`;
            cell.setAttributeNode(pos)
        }
    }

    return {
        difficulty: level,
        dimension: gridCount
    }
}

export function onBtnStartClick(infos) {
    const { difficulty, dimension } = infos
    if (difficulty !== 0 || dimension !== 0) {
        document.querySelector(".level").style.display = "none"
        return new Minesweeper(infos.dimension, infos.dimension, infos.difficulty)
    }
}

export function onCellClick(e) {
    const [y, x] = e.target.dataset.pos.replaceAll(" ", "").split("-")

    // au cas ou l'utilisateur change les coordonnées de la cellule
    return {
        x: parseInt(x, 10),
        y: parseInt(y, 10)
    }
}
