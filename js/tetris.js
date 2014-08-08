
var game = document.getElementById("game"),
    ctx     = game.getContext('2d'),
    properties = {"cols": 10, "rows": 16},
    gameField,
    figures,
    currentFigure = {},
    interval,
    i;

game.width = 450;
game.height = 720;
ctx.strokeRect(0, 0, game.width, game.height);


function gameInit() {
    "use strict";
    var i, j,
        row,
        board;
    board = new Array(16);
    row = new Array(10);
    for (i = 0; i < properties.rows; i += 1) {
        for (j = 0; j < properties.cols; j += 1) {
            row[j] = 0;
        }
        board[i] = row.slice();
    }
    return board;
    
}

function render(board) {
    "use strict";
    var i, j;
    for (i = 0; i < properties.rows; i += 1) {
        for (j = 0; j < properties.cols; j += 1) {
            if (board[i][j] === 1) {
                ctx.fillRect(j * 45, i * 45, 45, 45);
            } else {
                ctx.clearRect(j * 45, i * 45, 45, 45);
            }
        }
    }
    ctx.strokeRect(0, 0, game.width, game.height);
}

function test(board) {
    "use strict";
    board[15][9] = 1;
    board[0][0] = 1;
    return board;
}


function copyMatrix(A) {
    "use strict";
    var i, j, n, m, B, row;
    n = A.length;
    m = A[0].length;
    B = new Array(n);
    for (i = 0; i < n; i += 1) {
        row = new Array(m);
        for (j = 0; j < m; j += 1) {
            row[j] = A[i][j];
        }
        B[i] = row;
    }
    return B;
}


function place(board, position) {
    "use strict";
    var i, j, n, m, copyBoard, d;
    copyBoard = copyMatrix(board);
    position = position || {"x": currentFigure.position["x"], "y": currentFigure.position["y"]};
    n = currentFigure.matrix.length;
    m = currentFigure.matrix[0].length;
    board = remove(board, position);
    for (i = 0; i < n; i += 1) {
        for (j = 0; j < m; j += 1) {
            d = currentFigure.position["y"] + i;
            if (d === 16) {
                copyBoard = clearRow(copyBoard);
                newFigure();
                copyBoard = place(copyBoard);
                return copyBoard;
            } else if (currentFigure.position["y"] === position["y"] && board[currentFigure.position["y"] + i][currentFigure.position["x"] + j] === 1 &&  currentFigure.matrix[i][j] === 1) {
                if (currentFigure.position["y"] === 0) {
                    clearInterval(interval);
                    alert("gamover");
                    interval = 0;
                    copyBoard = newGame();
                } else {
                    currentFigure.position["x"] = position["x"];
                    currentFigure.position["y"] = position["y"];
                }
                return copyBoard;
            } else if (board[currentFigure.position["y"] + i][currentFigure.position["x"] + j] === 1 &&  currentFigure.matrix[i][j] === 1) {
                
                copyBoard = clearRow(copyBoard);
                newFigure();
                copyBoard = place(copyBoard);
                return copyBoard;
            } else if (currentFigure.position["x"] + j === -1 || currentFigure.position["x"] + j >= 10) {
                currentFigure.position["x"] = position["x"];
                currentFigure.position["y"] = position["y"];
                return copyBoard;
            } else {
                if (currentFigure.matrix[i][j] === 1) {
                    board[currentFigure.position["y"] + i][currentFigure.position["x"] + j] = 1;
                }
            }
        }
    }
    
    return board;
}


function remove(board, position) {
    "use strict";
    var i, j, n, m, oldFigure;
    if (position["x"] === currentFigure.position["x"] && position["y"] === currentFigure.position["y"]) {
        oldFigure = turn(turn(turn(currentFigure.matrix.slice())));
    } else {
        oldFigure = currentFigure.matrix.slice();
    }
    n = oldFigure.length;
    m = oldFigure[0].length;
    for (i = 0; i < n; i += 1) {
        for (j = 0; j < m; j += 1) {
            if (oldFigure[i][j] === 1) {
                board[position["y"] + i][position["x"] + j] = 0;
            }
        }
    }
    return board;
}

function move(board, direction) {
    "use strict";
    var i, j, n, m,
        futureBoard = copyMatrix(board),
        copyPosition = {"x": currentFigure.position["x"], "y": currentFigure.position["y"]};
    
    
    switch (direction) {
    case 'left':
        currentFigure.position["x"] -= 1;
        futureBoard = place(futureBoard, copyPosition);
        break;
    case 'right':
        currentFigure.position["x"] += 1;
        futureBoard = place(futureBoard, copyPosition);
        break;
    case 'turn':
        futureBoard = place(futureBoard, copyPosition);
        break;
    default:
        currentFigure.position["y"] += 1;
        futureBoard = place(futureBoard, copyPosition);
        break;
    }
    
    
    render(futureBoard);
    return futureBoard;
}



function clearRow(board) {
    "use strict";
    var i, j, n, m, ones, rows;
    n = board.length;
    m = board[0].length;
    for (i = 0; i < n; i += 1) {
        ones = 0;
        for (j = 0; j < m; j += 1) {
            if (board[i][j] === 1) {
                ones += 1;
            } else {
                break;
            }
        }
        if (ones === m) {
            rows += 1;
            board.splice(i, 1);
            board.unshift([0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
        }
    }
    return board;
}

function newFigure() {
    "use strict";
    var id = Math.floor(Math.random() * figures.length);
    currentFigure.matrix = figures[id];
    currentFigure.position = {"x": 4, "y": 0};
    currentFigure.landed = false;
    
    
}

function newGame() {
    "use strict";
    figures = initFigures();
    gameField = gameInit();
    newFigure();
    place(gameField);
    render(gameField);
    //interval = setInterval(tick, 250);
    return gameField;
}

function tick() {
    "use strict";
    console.log(1);
    gameField = move(gameField);
    render(gameField);
}


newGame();



