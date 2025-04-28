let frame = null;
let currentDirection = null;
let intervalID = null;
let cD = null;

class Snake {
    // TODO: Change the constructor to take snakeFrame as a parameter and find the positions from it
    constructor(length, board) {
        this.length = length;
        this.alive = true;
        this.board = board[0];
        this.positions = new Array(this.length);
        for (let n = 0; n < this.positions.length; n++) {
            this.positions[n] = new Array(2);
        }

        this.classList = Array.from({ length: this.board.length }, () =>
            new Array(this.board.length).fill(null))
        for (let x = 0; x < this.classList.length; x++) {
            for (let y = 0; y < this.classList[x].length; y++) {
                this.classList[x][y] = this.board[x][y].className;
            }
        }
        let count = 0;
        for (let x = 0; x < this.board.length; x++) {
            for (let y = 0; y < x.length; y++) {
                if (this.board[x][y].className == "snakePart") {
                    this.positions[count] = [x, y];
                    count += 1;
                }
            }
        }
    }
    
    move(cD) {
        this.positions.length = this.length;
        let nameHold = null;
        let posHold = null;
        for (let x=1; x < this.positions.length; x++) {
            if (x == this.positions.length - 1) {
                posHold = this.positions[x]
            }
            if (this.positions[0][0] === this.positions[this.positions.length - x][0] &&
                this.positions[0][1] === this.positions[this.positions.length - x][1]) {
                    this.alive = false;
                    break;
            }
            /**if (x == this.positions.length - 1) {
                this.classList[this.positions[this.positions.length - x][0]][this.positions[this.positions.length - x][1]] = nameHold;
            } **/
            this.positions[this.positions.length - x] = this.positions[this.positions.length - (1 + x)];
        }
        switch (cD) {
            case null:
                break;
            case "up":
                this.positions[0][1] = this.positions[0][1] + 1;
                nameHold = this.classList[this.positions[0][0]][this.positions[0][1]];
                break;
            case "down":
                this.positions[0][1] = this.positions[0][1] - 1;
                nameHold = this.classList[this.positions[0][0]][this.positions[0][1]];
                break;
            case "left":
                this.positions[0][0] = this.positions[0][0] - 1;
                nameHold = this.classList[this.positions[0][0]][this.positions[0][1]];
                break;
            case "right":
                this.positions[0][0] = this.positions[0][0] + 1;
                nameHold = this.classList[this.positions[0][0]][this.positions[0][1]];
                break;
        }
        // Placeholder logic for movement; add actual snake movement logic here.
        if (cD != null) {
            for (let x = 0; x < this.board.length; x++) {
                for (let y = 0; y < x.lenth; y++) {
                    if (x == posHold[0] && y == posHold[1]) {
                        this.board[posHold[0]][posHold[1]].className = nameHold;
                    }
                    else {
                        this.board[x][y].className = this.classList[x][y];
                    }
                }
            }
        }
        console.log(`Snake is moving in the ${cD} direction.`);
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
    console.log("Changing direction...")
    const key = event.key;
    let newDirection = cD;
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
    cD = newDirection;
    console.log(`Changed direction to ${cD}.`)
}

function generateBoard(frameDim) {
    let cellList = Array.from({ length: frameDim / 10 }, () =>
        new Array(frameDim / 10).fill(null)
    );
    let classList = cellList;

    for (let x = 0; x < cellList.length; x++) {
        for (let y = 0; y < cellList[x].length; y++) {
            let cell = document.createElement("div");
            cell.style.margin = "0px";
            cell.style.width = "10px";
            cell.style.height = "10px";
            if (x === Math.floor(cellList.length / 2) && y === Math.floor(cellList.length / 2)) {
                cell.className = "snakePart";
            } else if (Math.random() < 0.01) {
                cell.className = "food";
            } else {
                cell.className = "empty";
            }

            cellList[x][y] = cell;
            classList[x][y] = cell.className;
            frame.appendChild(cell);
        }
    }
    return [cellList, classList];
}

function init() {
    let contFrame = document.createElement("div");
    contFrame.id = "main";
    frame = document.createElement("div");
    frame.id = "ground";
    const frameDim = Math.floor(Math.min(window.innerWidth, window.innerHeight) / 10) * 10;
    contFrame.style.width = frameDim.toString() + "px";
    contFrame.style.height = frameDim.toString() + "px";
    frame.style.gridTemplateColumns = `repeat(${frameDim / 10}, 10px)`;
    frame.style.gridTemplateRows = `repeat(${frameDim / 10}, 10px)`;
    contFrame.appendChild(frame);
    document.body.appendChild(contFrame);

    let board = generateBoard(frameDim);
    document.getElementById("starterButton").remove();
    let snake = new Snake(1, board)
    window.addEventListener("keydown", changeDir);
    intervalID = setInterval(() => {
        snake.move(cD)
    }, 425);
}

// Event listeners
