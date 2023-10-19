export default class Minesweeper {

    constructor(width, height, nbBomb) {
        this.width = width;
        this.height = height;
        this.nbBomb = nbBomb;
        this.grid = [];
        this.init();
    }

    init() {
        for (let i = 0; i < this.height; i++) {
            this.grid.push([]);
            for (let j = 0; j < this.width; j++) {
                this.grid[i].push(0);
            }
        }
        console.log(this.grid);
    }
}