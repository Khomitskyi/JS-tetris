function Tetris(id) {
    "use strict";
    
    var game = document.getElementById(id),
        ctx = game.getContext('2d'),
        properties = {"cols": 10, "rows": 16},
        figures,
        gameField,
        d = 10,
        currentFigure = {},
        gameStatus = 'OFF',
        points = 0,
        
        initField = function () {
            var i, j,
                row,
                field;
            field = new Array(16);
            row = new Array(10);
            for (i = 0; i < properties.rows; i += 1) {
                for (j = 0; j < properties.cols; j += 1) {
                    row[j] = 0;
                }
                field[i] = row.slice();
            }
            return field;
        },
        
        initFigures = function () {
            var figures = new Array(7);
            figures[0] = [[1],
                          [1],
                          [1],
                          [1]];
            figures[1] = [[0, 1],
                          [0, 1],
                          [1, 1]];
            figures[2] = [[1, 0],
                          [1, 0],
                          [1, 1]];
            figures[3] = [[1, 1 ],
                          [1, 1 ]];
            figures[4] = [[0, 1, 1],
                          [1, 1, 0]];
            figures[5] = [[1, 1, 0],
                          [0, 1, 1]];
            figures[6] = [[1, 1, 1],
                          [0, 1, 0]];
            return figures;
        },
        
        turn = function (figure) {
            
            function transpose(a) {
                return Object.keys(a[0]).map(function (c) {
                    return a.map(function (r) {
                        return r[c];
                    });
                });
            }

            function inverse(a) {
                var i, n = a.length;
                for (i = 0; i < n; i += 1) {
                    a[i].reverse();
                }
                return a;
            }

            return (inverse(transpose(figure)));
        },
        
        render = function (board) {
            var i, j;
            for (i = 0; i < properties.rows; i += 1) {
                for (j = 0; j < properties.cols; j += 1) {
                    if (board[i][j] === 1) {
                        ctx.fillRect(j * d, i * d, d, d);
                    } else {
                        ctx.clearRect(j * d, i * d, d, d);
                    }
                }
            }
            ctx.strokeRect(0, 0, game.width, game.height);
        },
        
        clearRow = function (field) {
            var i, j, n, k;
            function product(x, y) {return x * y; }
            n = field.length;
            k = 0;   //num rows to clear
            for (i = 0; i < n; i += 1) {
                if (field[i].reduce(product, 1) === 1) {
                    k += 1;
                    field.splice(i, 1);
                    field.unshift([0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
                }
            }
            points += k * k;
            return field;
        },
        
        newFigure = function () {
            
            var id = Math.floor(Math.random() * figures.length);
            currentFigure.matrix = figures[id];
            currentFigure.position = {"x": 4, "y": 0};
            gameField = clearRow(gameField);
            
            //render(place(gameField));
            
        },
        
        count = function (A) {
            return {"n": A.length, "m": A[0].length};
        },
        
        copyMatrix = function (A) {
            var i, j, S, B, row;
            S = count(A);
            B = [];
            for (i = 0; i < S.n; i += 1) {
                row = [];
                for (j = 0; j < S.m; j += 1) {
                    row[j] = A[i][j];
                }
                B[i] = row.slice();
            }
            return B;
        },
        
        clear = function (field, position) {
            var i, j, S, oldFigure;
            if (position.x === currentFigure.position.x && position.y === currentFigure.position.y) {
                oldFigure = turn(turn(turn(copyMatrix(currentFigure.matrix))));
            } else {
                oldFigure = copyMatrix(currentFigure.matrix);
            }
            S = count(oldFigure);
            for (i = 0; i < S.n; i += 1) {
                for (j = 0; j < S.m; j += 1) {
                    if (oldFigure[i][j] === 1) {
                        field[position.y + i][position.x + j] = 0;
                    }
                }
            }
            return field;
        },
        
        validateMove = function (field, oldPostion) {
            //field borders
            var S = count(currentFigure.matrix);

            if (currentFigure.position.y + S.n > 16) {  //bottom
                newFigure();
                return false;
            }
            if (currentFigure.position.x < 0) {        //left
                currentFigure.position = oldPostion;
                return false;
            }
            if (currentFigure.position.x + S.m > 10) {        //rigth
               
                if (currentFigure.position.x === oldPostion.x &&
                        currentFigure.position.y === oldPostion.y) {
                    currentFigure.position.x = 10 - S.m;
                    //place(field);
                    
                    return true;
                }
                currentFigure.position = oldPostion;
                
                return false;
            }
            return true;
        },
        
        validateStep = function (field, I, J, oldPosition) {
            //collision check
            if (field[currentFigure.position.y + I][currentFigure.position.x + J] === 1) {
                if (currentFigure.position.y === oldPosition.y) {
                    if (currentFigure.position.x === oldPosition.x) {
                        currentFigure.matrix = turn(turn(turn(copyMatrix(currentFigure.matrix))));
                    }
                    currentFigure.position = oldPosition;
                    return false;
                } else {
                    newFigure();
                    return false;
                }
            }
            return true;
            
        },
        
        gamover = function (field, I) {
            var i, j, S;
            S = count(currentFigure.matrix);

            for (i = (S.n - I - 1); i < S.n; i += 1) {
                for (j = 0; j < S.m; j += 1) {
                    if (currentFigure.matrix[i][j] === 1) {
                        field[currentFigure.position.y + i - 1][currentFigure.position.x + j] = 1;
                    }
                }
            }
            render(field);
            gameStatus = "OFF";
            alert("Game over. \n points: " + points);
            points = 0;
            field = initField();
            return field;
            
        },
        
        place = function (field, oldPosition) {
            var i, j, S,
                copyField;
            S = count(currentFigure.matrix);
            oldPosition = oldPosition || currentFigure.position;
            copyField = copyMatrix(field);
            copyField = clear(copyField, oldPosition);
            if (validateMove(copyField, oldPosition)) {
                for (i = 0; i < S.n; i += 1) {
                    for (j = 0; j < S.m; j += 1) {
                        if (currentFigure.matrix[i][j] === 1) {
                            if (validateStep(copyField, i, j, oldPosition)) {
                                copyField[currentFigure.position.y + i][currentFigure.position.x + j] = 1;
                            } else {
                                if (oldPosition.y === 0 && currentFigure.position.y === 0) { field = gamover(field, i); }
                                return field;
                            }
                        }
                    }
                }
                return copyField;
            } else {return field; }
        };
        
        
        
    this.newGame = function () {
        var dw = window.innerWidth,
            dh = window.innerHeight;
        points = 0;
        figures = initFigures();
        d = Math.min(dw / 10 - 2, dh / 16 - 1);
        game.height = 16 * d;
        game.width = 10 * d;
        gameField = initField();
        newFigure();
        gameField = place(gameField);
        render(gameField);
        gameStatus = "ON";
        return gameField;
    };
    
    this.move = function (direction) {
        var position = {"x": currentFigure.position.x, "y": currentFigure.position.y};
        
        switch (direction) {
        case 'left':
            currentFigure.position.x -= 1;
            //futureBoard = place(futureBoard, copyPosition);
            break;
        case 'right':
            currentFigure.position.x += 1;
            //futureBoard = place(futureBoard, copyPosition);
            break;
        case 'rotate':
            currentFigure.matrix = turn(currentFigure.matrix);
            break;
        default:
            currentFigure.position.y += 1;
            //futureBoard = place(futureBoard, copyPosition);
            break;
        }
        
        gameField = place(gameField, position);
        render(gameField);
        
        
    };
    
}

var a = new Tetris("game");
a.newGame();


