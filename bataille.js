"use strict";

let gridPlayer1, gridPlayer2, boatsPlayer1, boatsPlayer2;

let canvas, canvasContext, interval;

//#region Init

function initAll() {
    gridPlayer1 = initGrid(gridWidth, gridHeight);
    boatsPlayer1 = [];
    generateBoats(gridPlayer1);
    gridPlayer2 = initGrid(gridWidth, gridHeight);
    boatsPlayer2 = [];
    generateBoats(gridPlayer2);
}

// This function create boats and fill a grid with it.
function generateBoats(grid) {
    // This array represente the number of boat with its size
    let boats = [5, 4, 3, 3, 2, 2]
    for (let i = 0; i < boats.length; i++) {
        placeBoat(boats[i], grid);
    }
}

/**
 * Tries to instantiate a boat in the grid with size (in cells) in parameters.
 * First, make a random position, then make a random direction, and try to place it in the
 * grid.
 * Try means that the function verifies if another boat will cross the boat that it tries
 * to place. And verifies also that the boat will not be too close from another boat (1 cell
 * space).
 * If it fails to do it, it tries another direction. If all directions are tested, it tries
 * another position. Infinite Danger ?.
 * @param {Int16Array} boatSize 
 * @param {[[]]} grid 
 */
function placeBoat(boatSize, grid) {
    let flagBoatIsPlace = false;
    while (!flagBoatIsPlace) {
        // We choose randomly two indexes
        let xIndex = getRandomInt(10);
        let yIndex = getRandomInt(10);
        // We choose a random direction
        let direction = getRandomDirection();
        let counterTryDirection = 0;
        while (counterTryDirection < 4 && !flagBoatIsPlace) {
            switch (direction) {
                case "Up":
                    // We verify that the end position of the boat will not be out of the grid
                    if (grid[xIndex][yIndex - boatSize] !== undefined) {
                        // We check if another boat will cross our new one.
                        // And also if our new boat will not be to close from another one.
                        // I'm using the flag to avoid use a break statement.
                        let flagBoatCantBePlacedInThisDirection = false;
                        for (let i = 0; i < boatSize && !flagBoatCantBePlacedInThisDirection; i++) {
                            let pos = { x: xIndex, y: yIndex - i };
                            if (isThereABoatHere(pos, grid) || isCloseToAnotherBoat(pos, grid)) {
                                flagBoatCantBePlacedInThisDirection = true;
                            }
                        }
                        if (!flagBoatCantBePlacedInThisDirection) {
                            let pos;
                            for (let i = 0; i < boatSize; i++) {
                                pos = { x: xIndex, y: yIndex - i };
                                grid[pos.x][pos.y].thereIsBoat = true;
                            }
                            flagBoatIsPlace = true; // Hourra, finally !
                            console.log("A boat is place, size: " + boatSize +
                                ", at beginPos: " + xIndex + ":" + yIndex +
                                " to endPos " + pos.x + ":" + pos.y);
                        }
                    }
                    break;
                case "Right":
                    if (grid[xIndex + boatSize] !== undefined) {
                        let flagBoatCantBePlacedInThisDirection = false;
                        for (let i = 0; i < boatSize && !flagBoatCantBePlacedInThisDirection; i++) {
                            let pos = { x: xIndex + i, y: yIndex };
                            if (isThereABoatHere(pos, grid) || isCloseToAnotherBoat(pos, grid)) {
                                flagBoatCantBePlacedInThisDirection = true;
                            }
                        }
                        if (!flagBoatCantBePlacedInThisDirection) {
                            let pos;
                            for (let i = 0; i < boatSize; i++) {
                                pos = { x: xIndex + i, y: yIndex };
                                grid[pos.x][pos.y].thereIsBoat = true;
                            }
                            flagBoatIsPlace = true; // Hourra, finally !
                            console.log("A boat is place, size: " + boatSize +
                                ", at beginPos: " + xIndex + ":" + yIndex +
                                " to endPos " + pos.x + ":" + pos.y);
                        }
                    }
                    break;
                case "Down":
                    if (grid[xIndex][yIndex + boatSize] !== undefined) {
                        let flagBoatCantBePlacedInThisDirection = false;
                        for (let i = 0; i < boatSize && !flagBoatCantBePlacedInThisDirection; i++) {
                            let pos = { x: xIndex, y: yIndex + i };
                            if (isThereABoatHere(pos, grid) || isCloseToAnotherBoat(pos, grid)) {
                                flagBoatCantBePlacedInThisDirection = true;
                            }
                        }
                        if (!flagBoatCantBePlacedInThisDirection) {
                            let pos;
                            for (let i = 0; i < boatSize; i++) {
                                pos = { x: xIndex, y: yIndex + i };
                                grid[pos.x][pos.y].thereIsBoat = true;
                            }
                            flagBoatIsPlace = true; // Hourra, finally !
                            console.log("A boat is place, size: " + boatSize +
                                ", at beginPos: " + xIndex + ":" + yIndex +
                                " to endPos " + pos.x + ":" + pos.y);
                        }
                    }
                    break;
                case "Left":
                    if (grid[xIndex - boatSize] !== undefined) {
                        let flagBoatCantBePlacedInThisDirection = false;
                        for (let i = 0; i < boatSize && !flagBoatCantBePlacedInThisDirection; i++) {
                            let pos = { x: xIndex - i, y: yIndex };
                            if (isThereABoatHere(pos, grid) || isCloseToAnotherBoat(pos, grid)) {
                                flagBoatCantBePlacedInThisDirection = true;
                            }
                        }
                        if (!flagBoatCantBePlacedInThisDirection) {
                            let pos;
                            for (let i = 0; i < boatSize; i++) {
                                pos = { x: xIndex - i, y: yIndex };
                                grid[pos.x][pos.y].thereIsBoat = true;
                            }
                            flagBoatIsPlace = true; // Hourra, finally !
                            console.log("A boat is place, size: " + boatSize +
                                ", at beginPos: " + xIndex + ":" + yIndex +
                                " to endPos " + pos.x + ":" + pos.y);
                        }
                    }
                    break;

                default:
                    break;
            }
            // If we get here, try another direction
            direction = nextDirection(direction);
            // To go out from the second while loop
            counterTryDirection++;
        }
    }
}

// Return a number between 0 and "max" exclusif
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

// Return a direction
function getRandomDirection() {
    let rand = getRandomInt(4);
    switch (rand) {
        case 0:
            return "Up"
        case 1:
            return "Right"
        case 2:
            return "Down"
        case 3:
            return "Left"
        default:
            return "Up";
    }
}
// Return the nexDirection. "Up" -> "Right" -> "Down" -> "Left" -> "Up"
function nextDirection(dir) {
    if (dir === "Up") return "Right";
    else if (dir === "Right") return "Down";
    else if (dir === "Down") return "Left";
    else return "Up";
}

// This function search if a boat is already positionned at given position.
function isThereABoatHere(pos, grid) {
    return (grid[pos.x][pos.y].thereIsBoat === true);
}

// Look at all cell around to see if it's close to a boat
// -- TODO Verfifier que cette fonction est opérationnelle et sûre --
function isCloseToAnotherBoat(pos, grid) {
    // Check left
    if (grid[pos.x - 1] !== undefined) { // To avoid - Error: out of array
        if (grid[pos.x - 1][pos.y] !== undefined) { // To avoid - Error: out of array
            if (grid[pos.x - 1][pos.y].thereIsBoat === true) return true;
        }
    }
    // Check left up
    if (grid[pos.x - 1] !== undefined) {
        if (grid[pos.x - 1][pos.y - 1] !== undefined) {
            if (grid[pos.x - 1][pos.y - 1].thereIsBoat === true) return true;
        }
    }
    // Check left down
    if (grid[pos.x - 1] !== undefined) {
        if (grid[pos.x - 1][pos.y + 1] !== undefined) {
            if (grid[pos.x - 1][pos.y + 1].thereIsBoat === true) return true;
        }
    }
    // Check up
    if (grid[pos.x][pos.y - 1] !== undefined) {
        if (grid[pos.x][pos.y - 1].thereIsBoat === true) return true;
    }
    // Check down
    if (grid[pos.x][pos.y + 1] !== undefined) {
        if (grid[pos.x][pos.y + 1].thereIsBoat === true) return true;
    }
    // Check right
    if (grid[pos.x + 1] !== undefined) {
        if (grid[pos.x + 1][pos.y] !== undefined) {
            if (grid[pos.x + 1][pos.y].thereIsBoat === true) return true;
        }
    }
    // Check right up
    if (grid[pos.x + 1] !== undefined) {
        if (grid[pos.x + 1][pos.y - 1] !== undefined) {
            if (grid[pos.x + 1][pos.y - 1].thereIsBoat === true) return true;
        }
    }
    // Check right down
    if (grid[pos.x + 1] !== undefined) {
        if (grid[pos.x + 1][pos.y + 1] !== undefined) {
            if (grid[pos.x + 1][pos.y + 1].thereIsBoat === true) return true;
        }
    }
    return false;
}
//#endregion
//#region grid

// Number of cell in width
const gridWidth = 10;
// Number of cell in height
const gridHeight = 10;

// Init a grid, put at all index a object "cell" used to store informations
function initGrid(widthCell, heightCell) {
    let grid = [];
    for (let i = 0; i < widthCell; i++) {
        grid.push([]);
        for (let j = 0; j < heightCell; j++) {
            grid[i].push();
            grid[i][j] = {
                // Does the cell was touched ?
                touched: false,
                // If there a boat at this cell ?
                thereIsBoat: false,
                // If this cell is at one square from a boat (use to generate distants boats)
                // closeToBoat: false,
                // Position in pixels used to draw
                originPos: {
                    x: 0,
                    y: 0
                }
            }
        }
    }
    return grid;
}
//#endregion
//#region Draw

// Side of a cell in pixels
const cellSide = 30;

function drawEverything() {
    drawBackground();
    // Draw left grid
    drawGrid({ x: cellSide, y: cellSide }, gridPlayer1)
    // Draww right grid
    drawGrid({
        x: canvas.width - (cellSide * (gridWidth + 1)),
        y: cellSide
    },
        gridPlayer2)
}

function drawBackground() {
    canvasContext.fillStyle = "white";
    canvasContext.fillRect(0, 0, canvas.width, canvas.height);
}

// Draw the grid with origin, cellSide, width and height
function drawGrid(origin, grid) {
    let cellsInWidth = grid.length;
    let cellsInHeight = grid.length;
    for (let i = 0; i < cellsInWidth; i++) {
        // Draw numbers in the first row
        drawIndexGrid(i + 1, origin.x + (cellSide / 2) + (cellSide * i) - 3, origin.y - 5);
        for (let j = 0; j < cellsInHeight; j++) {
            if (i === 0) {
                // Draw numbers in the first column
                drawIndexGrid(translateNumericToLetter(j), origin.x - 10, origin.y + (cellSide * j) + (cellSide / 2) + 3);
            }
            canvasContext.strokeStyle = "black";
            canvasContext.lineWidth = 1;

            // A t'on vraiment besoin de ces infos en plus (originPos.x et .y) ?
            grid[i][j].originPos.x = origin.x + (cellSide * i);
            grid[i][j].originPos.y = origin.y + (cellSide * j);

            canvasContext.strokeRect(grid[i][j].originPos.x, grid[i][j].originPos.y, cellSide, cellSide);

            // Just a test
            if (grid[i][j].thereIsBoat === true && grid[i][j].touched === true) {
                canvasContext.fillStyle = "red";
                canvasContext.fillRect(grid[i][j].originPos.x, grid[i][j].originPos.y, cellSide, cellSide);
            } else if (grid[i][j].thereIsBoat === true) {
                canvasContext.fillStyle = "blue";
                canvasContext.fillRect(grid[i][j].originPos.x, grid[i][j].originPos.y, cellSide, cellSide);
            } else if (grid[i][j].touched === true) {
                canvasContext.fillStyle = "yellow";
                canvasContext.fillRect(grid[i][j].originPos.x, grid[i][j].originPos.y, cellSide, cellSide);
            }
        }
    }
}

function drawIndexGrid(text, x, y) {
    canvasContext.fillStyle = "red";
    canvasContext.font = "10px Arial";
    canvasContext.fillText(text, x, y);
}

function translateNumericToLetter(num) {
    let str = "abcdefghijklmnopqrstuvwxyz";
    return str.charAt(num);
}

function translateLetterToNumeric(char) {
    let str = "abcdefghijklmnopqrstuvwxyz";
    return str.indexOf(char);
}
//#endregion
//#region Event

function onClickButton() {
    // Pas de controle d'input, ATTENTION !!!
    let cell = document.getElementById('input-cell').value;
    let pos = { x: parseInt(cell.charAt(1)) - 1, y: translateLetterToNumeric(cell.charAt(0)) }
    shootOn(gridPlayer2, pos)
}

function shootOn(grid, pos) {
    grid[pos.x][pos.y].touched = true;
}

////#endregion
window.onload = function () {
    canvas = document.getElementById('gameCanvas');
    canvasContext = canvas.getContext("2d");

    // Init all
    initAll();

    // Event Listener
    document.getElementById('submit-cell').addEventListener("click", onClickButton);

    // Function called 1 frames per second to draw all elements
    let framesPerSecond = 30;
    interval = setInterval(function () {
        drawEverything();
    }, 1000 / framesPerSecond);
};