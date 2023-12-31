# KICK-OFF Minesweeper 


## BACK

## Main

***import all functions of userActions and reveal() from frontActions***

- init variables : infos[difficulty, dimension], minesweeper, flagMode
- listener on difficultyBtn, BtnStart and cells
- Here the explanation of the cells click listening and handling of flagMode and reveal cell. 
```js

    const cells = document.querySelectorAll('td')
    cells.forEach(cell => cell.addEventListener('click', (e) => {
        //get coordonates with onCellClick()
        if(flagMode) //handle flag mode activate
        // handle reveal cells 
    }))

```

### export class Minesweeper:

- Attributes
  
    - nbBombByDifficulty //number of bombs defined by difficulty
    - score
    - level   //between 1 and 3, represents the choosen difficulty
    - height  
    - width
    - success     //final score in case of success
    - grid    //js representation of the minesweeper grid 
  
- Methods
  
  - Private
    - OK - #placeBomb()     //get numbers of bombs and place them randomly inside the grid
    - OK - #placeNumbers()   //fill cells by the number of neighboring bombs
    - OK - #countBomb()      //use by placeNumbers to count neighboring bombs
    - OK - #explore()       //get all neighboring cells
  
  - Public
    - OK - init()   //construct the grid, place Bombs and fill cell values.
    - OK - try(x,y) => return bool  //if cell x,y is bomb return false otherwise true
    - OK - getValue(x, y) => value  //get the value of x,y cell
    - OK - getNeighbors({x,y}, strict) => coords  // return coordonnates of adjacents cells (strict don't take diagonals)
    - OK - isFinished() => {bool(success)}  //if score === scorefinal ? win true : false

## Modules

### frontActions:

  - OK - export reveal({minesweeper}, {x,y}, inNotBomb = bool) =>  
      get cell x,y, 
      verify if already reveal or not, 
      get value and display it in cell if not bomb and value 0 => get all the neighboring cells values,
      trigger displayWin and displayFail actions 

```js
function reveal(minesweeper, { x, y }, isNotBomb) {
   //get the cell

    //if already revealed stop 

    if (isNotBomb) {
        //if value == 0 
        //reveal neighboring cells 

        //otherwise display value
    }

    //add bomb
}

```
  - OK - export displayInDOM(id, node, message, classes) // display anything in DOM inside #gameInfos
  - OK - displayEndMessage() // display last end message = win or fail
  - OK - export end()   //clear grid, display level buttons back
  - OK - export placeFlag(x,y)
  - OK - export removeFlag(x,y)
  
### userActions

***import destroyer and minesweeper***

- OK - export onBtnDifficultyClick(event) => level, dimensions //overview of the grid, and return level and dimensions
- OK - export onBtnStartClick({difficulty, dimentions})    //erase level and start buttons, return a new instance of minesweeper
- OK - export onCellClick(event) => x, y    //on click on cell, get his coordonates + change moveCount
- OK - export onBtnFlagClick()    //change flagMode variable, handle flag mode
- OK - export onBtnLeaveClick(minesweeper)    //destroy minesweeper object, end() => clear grid, display level buttons back
- OK - moveCounter() => add 1 to each click of the user and display it
### destroyer

- OK - export default function(minesweeper)  //destroy the given object 
  
## BONUS

use local storage
add timer
end animation => (
  OK - lose animation
  win animation
)
    