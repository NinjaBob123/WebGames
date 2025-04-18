let frame = null;
let snakeFrame = null;
let currentDirection = null;
let intervalID = null;

class Snake {
    // TODO: Change the constructor to take snakeFrame as a parameter and find the positions from it
    constructor(length, positions) {
        this.length = length;
        this.positions = positions
        this.alive = true;
        let tempTiles = frame.children;
        let n = Math.sqrt(tempTiles.length);
        this.tiles = new Array(n);
        for (let i = 0; i < n; i++){
            this.tiles[i] = new Array(n);
        }
        for (let x = 0; x < n; x++) {
            for (let y = 0; y < n; y++) {
                this.tiles[x][y] = tempTiles[x * n + y];
            }
        }
    }
    
    move(cD) {
        switch (cD) {
            case "up":
                this.positions[0][1] + 1
                this.positions[0][1] = this.positions[0][1] + 1;
                break;
            case "down":
                this.positions[0][1] = this.positions[0][1] - 1;
                break;
            case "left":
                this.positions[0][0] = this.positions[0][0] - 1;
                break;
            case "right":
                this.positions[0][0] = this.positions[0][0] + 1;
                break;
        }
        for (let x=1; x < this.positions.length; x++) {
            if (this.positions[0][0] === this.positions[this.positions.length - x][0] &&
                this.positions[0][1] === this.positions[this.positions.length - x][1]) {
                    this.alive = false;
                    break;
                }
            this.positions[this.positions.length - x] = this.positions[this.positions.length - (1 + x)]
        }
        // Placeholder logic for movement; add actual snake movement logic here.
        console.log(`Snake is moving in the ${cD} direction.`);
    }

    draw(ground) {
        
    }
}

window.addEventListener("resize", resizeBoard);

function resizeBoard() {
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    const frameDim = Math.floor(Math.min(windowWidth, windowHeight) / 10) * 10;
    frame.style.width = frameDim.toString() + "px";
    frame.style.height = frameDim.toString() + "px";
}

function changeDir(event) {
    const key = event.key;
    let newDirection = currentDirection;
    switch (key) {
        case "ArrowUp":
            if (currentDirection !== "down") newDirection = "up";
            break;
        case "ArrowDown":
            if (currentDirection !== "up") newDirection = "down";
            break;
        case "ArrowLeft":
            if (currentDirection !== "right") newDirection = "left";
            break;
        case "ArrowRight":
            if (currentDirection !== "left") newDirection = "right";
            break;
    }
    currentDirection = newDirection;
}

function generateBoard(frameDim) {
    let cellList = Array.from({ length: frameDim / 10 }, () =>
        new Array(frameDim / 10).fill(null)
    );

    for (let x = 0; x < cellList.length; x++) {
        for (let y = 0; y < cellList[x].length; y++) {
            let cell = document.createElement("div");
            cell.style.margin = "0px";
            cell.style.width = "10px";
            cell.style.height = "10px";
            // TODO: Change board generation so that the food is behind the snake on the z axis, and the snake is on its own layer
            if (x === Math.floor(cellList.length / 2) && y === Math.floor(cellList.length / 2)) {
                cell.className = "empty";
            } else if (Math.random() < 0.01) {
                cell.className = "food";
            } else {
                cell.className = "empty";
            }

            cellList[x][y] = cell;
            frame.appendChild(cell);
        }
    }
    return cellList;
}

function init() {
    let contFrame = document.createElement("div");
    contFrame.id = "main";
    frame = document.createElement("div");
    frame.id = "ground";
    snakeFrame = document.createElement("div");
    snakeFrame.id = "snakeFrame";
    const frameDim = Math.floor(Math.min(window.innerWidth, window.innerHeight) / 10) * 10;
    contFrame.style.width = frameDim.toString() + "px";
    contFrame.style.height = frameDim.toString() + "px";
    frame.style.gridTemplateColumns = `repeat(${frameDim / 10}, 10px)`;
    frame.style.gridTemplateRows = `repeat(${frameDim / 10}, 10px)`;
    contFrame.appendChild(frame);
    contFrame.appendChild(snakeFrame);
    document.body.appendChild(contFrame);

    let board = generateBoard(frameDim);
    document.getElementById("starterButton").remove();

    intervalID = setInterval(() => {
        board = move(currentDirection, board);
    }, 425);
}

// Event listeners
window.addEventListener("keydown", changeDir);
