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
    document.body.addEventListener('touchstart', function (e) {
        alert(e.changedTouches[0].pageX); // alert pageX coordinate of touch point
    }, false);
 
}, false);