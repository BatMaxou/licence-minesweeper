import { colorFrame } from "./frontActions.js"

export default async (minesweeper, { x, y }) => {
    return new Promise(async (resolve) => {
        await handleExplode(minesweeper, { x, y }, true, 3)

        resolve()
    })
}

async function explode(cell) {
    return new Promise((resolve) => {
        setTimeout(() => {
            cell.innerHTML = '💥'
            colorFrame(cell, 'bomb')
                .then(() => {
                    colorFrame(cell, 'exploded', true)
                        .then(() => {
                            resolve(cell)
                        })
                })
        }, 500)
    })
}

async function annihilate(cell, spread) {
    return new Promise((resolve) => {
        setTimeout(async () => {
            cell.innerHTML = ''

            switch (spread) {
                case 2:
                    await colorFrame(cell, 'near')
                        .then(() => {
                            colorFrame(cell, 'annihilate', true)
                        })
                    break;
                case 1:
                    if (cell.classList.contains('near')) {
                        break;
                    }

                    await colorFrame(cell, 'away')
                        .then(() => {
                            colorFrame(cell, 'annihilate', true)
                        })
                    break;
                default:
                    break;
            }

            resolve({ cell, spread: (spread - 1 < 0) ? null : spread - 1 })
        }, 500)
    })
}

async function handleExplode(minesweeper, { x, y }, isFirst = true, spread = null) {
    const cell = document.querySelector(`td[data-pos="${y} - ${x}"]`)

    if (!cell || cell.classList.contains('exploded') || (cell.classList.contains('final') && null === spread)) {
        return
    }

    cell.classList.add('final')

    if (isFirst || !minesweeper.try({ x, y })) {
        if (isFirst) {
            cell.innerHTML = '💣'
            cell.classList.add('bomb')
        }

        await explode(cell)
            .then(async (cell) => {
                await progressAnnihilation(minesweeper, cell, { x, y }, 2)
            })

        return
    }

    if (null === spread) {
        await progressAnnihilation(minesweeper, cell, { x, y }, spread)

        return
    }

    await annihilate(cell, spread)
        .then(async ({ cell, spread }) => {
            await progressAnnihilation(minesweeper, cell, { x, y }, spread)
        })

    return
}

async function progressAnnihilation(minesweeper, cell, { x, y }, spread) {
    if (null !== spread) {
        cell.classList.remove('revealed', 'flagged')
    }
    const neighbors = minesweeper.getNeighbors({ x, y }, true)
    const promiseList = []

    neighbors.forEach(neighborsCoords => {
        promiseList.push(new Promise(async (resolve) => {
            await handleExplode(minesweeper, neighborsCoords, false, spread)
            resolve()
        }))
    })

    await Promise.all(promiseList)
}
