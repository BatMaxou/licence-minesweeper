export default class Minesweeper {

    nbBombByDifficulty = {
        1: 10,
        2: 30,
        3: 75,
    }

    constructor(width, height, level) {
        this.width = width;
        this.height = height;
        this.level = level;
        this.score = 0;
        this.success = width * height - this.nbBombByDifficulty[level];
        this.grid = [];
        this.init();
    }

    #placeBombs() {
        let bombs = this.nbBombByDifficulty[this.level];

        while (bombs > 0) {
            let x = Math.floor(Math.random() * this.width);
            let y = Math.floor(Math.random() * this.height);

            if (this.grid[y][x] === 0) {
                this.grid[y][x] = 'B';
                bombs--;
            }
        }
    }

    #countBomb(x, y) {
        let count = 0
        this.#explore({ x, y }, (coords) => this.#isBomb(coords, () => count++))

        return count.toString()
    }

    #placeNumbers() {
        this.grid = this.grid.map((row, y) => row.map((el, x) => 'B' === el ? el : this.#countBomb(x, y)))
    }

    #explore({ x, y }, callback) {
        callback({ x: x - 1, y })
        callback({ x: x + 1, y })

        if (this.grid[y + 1]) {
            callback({ x, y: y + 1 })
            callback({ x: x - 1, y: y + 1 })
            callback({ x: x + 1, y: y + 1 })
        }

        if (this.grid[y - 1]) {
            callback({ x, y: y - 1 })
            callback({ x: x - 1, y: y - 1 })
            callback({ x: x + 1, y: y - 1 })
        }
    }

    #isBomb({ x, y }, callback) {
        if (this.grid[y][x] && this.grid[y][x] === 'B') {
            callback()
        }
    }

    #exist({ x, y }, callback) {
        if (this.grid[y][x]) {
            callback({ x, y })
        }
    }

    init() {
        for (let i = 0; i < this.height; i++) {
            this.grid.push([]);
            for (let j = 0; j < this.width; j++) {
                this.grid[i].push(0);
            }
        }
        this.#placeBombs();
        this.#placeNumbers();

        console.log(this.grid);
    }

    try({ x, y }) {
        if (this.grid[y][x] === 'B') {
            return false;
        }
        return true;
    }

    getValue(x, y) {
        return this.grid[y][x]
    }

    getNeighbors(x, y) {
        let neighbors = []
        this.#explore({ x, y }, (neighborsCoords) => this.#exist(neighborsCoords, (neighborsCoords) => neighbors.push(neighborsCoords)))

        return neighbors
    }

}
