document.body.onkeydown = function (e) {
    "use strict";
    var keys = {
        37: 'left',
        39: 'right',
        40: 'down',
        38: 'rotate'
    };
    if (typeof keys[e.keyCode] !== 'undefined') {
        keyPress(keys[e.keyCode]);
        render(gameField);
    }
};

function keyPress(key) {
    "use strict";
    switch (key) {
    case 'left':
        gameField = move(gameField, 'left');
        break;
    case 'right':
        gameField = move(gameField, 'right');
        break;
    case 'down':
        gameField = move(gameField);
        break;
    case 'rotate':
        currentFigure.matrix = turn(currentFigure.matrix);
        gameField = move(gameField, 'turn');
        break;
    }
}

window.addEventListener('load', function () { // on page load
    "use strict";
    document.getElementById('game').addEventListener('touchstart', function (e) {
        var tap = e.changedTouches[0];
        //alert(tap.pageX);
        if (tap.pageY < d * 4.5) {
            currentFigure.matrix = turn(currentFigure.matrix);
            gameField = move(gameField, 'turn');
        } else if (tap.pageY > d * 12.5) {
            gameField = move(gameField);
        } else if (tap.pageX < d * 5) {
            gameField = move(gameField, 'left');
        } else {
            gameField = move(gameField, 'right');
        }
        
    }, false);
 
}, false);