document.querySelectorAll("button").forEach(item => (item.addEventListener('click', onBtnDifficultyClick))   )

// onBtnDifficulty(event) => create and change the grid display
function onBtnDifficultyClick(e) {
    let level = Number(e.target.value)
    let gridCount = 0
    let divGrid = document.querySelector(".grid")
    divGrid.innerHTML = ""
    if([1,2,3].includes(level)) {
        switch(level) {
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

    } else {
        document.querySelector(".grid").innerHTML = "Incorrect difficulty level."
    }
}
