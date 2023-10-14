export default class Minesweeper {

    bombByDifficulty = {
        1: 10,
        2: 30,
        3: 75,
    }

    constructor(width, height, level) {
        this.width = width;
        this.height = height;
        this.level = level;
        this.grid = [];
        this.init();
    }

    #placeBombs() {
        let bombs = this.bombByDifficulty[this.level];

        while (bombs > 0) {
            let x = Math.floor(Math.random() * this.width);
            let y = Math.floor(Math.random() * this.height);

            if (this.grid[x][y] === 0) {
                this.grid[x][y] = 'B';
                bombs--;
            }
        }
    }

    #countBomb(x, y) {
        let count = 0

        if (this.grid[y][x - 1] && this.grid[y][x - 1] === 'B') {
            count++
        }

        if (this.grid[y][x + 1] && this.grid[y][x + 1] === 'B') {
            count++
        }

        if (this.grid[y + 1]) {
            if (this.grid[y + 1][x] && this.grid[y + 1][x] === 'B') {
                count++
            }

            if (this.grid[y + 1][x + 1] && this.grid[y + 1][x + 1] === 'B') {
                count++
            }

            if (this.grid[y + 1][x - 1] && this.grid[y + 1][x - 1] === 'B') {
                count++
            }
        }

        if (this.grid[y - 1]) {
            if (this.grid[y - 1][x] && this.grid[y - 1][x] === 'B') {
                count++
            }

            if (this.grid[y - 1][x - 1] && this.grid[y - 1][x - 1] === 'B') {
                count++
            }

            if (this.grid[y - 1][x + 1] && this.grid[y - 1][x + 1] === 'B') {
                count++
            }
        }

        return count
    }

    #placeNumbers() {
        this.grid = this.grid.map((row, y) => row.map((el, x) => 'B' === el ? el : this.#countBomb(x, y)))
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
}
