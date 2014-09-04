function Conroller(tetris) {
    "use strict";

    var c = document.getElementById("game");


    function keyPress(key) {
        //"use strict";
        switch (key) {
        case 'left':
            //alert(key);
            break;
        case 'right':
            //alert(key);
            break;
        case 'down':
            //alert(key);
            break;
        case 'rotate':
            //alert(key);
            break;
        }
        tetris.move(key);
    }
    
    

    document.body.onkeydown = function (e) {
        //"use strict";
        var keys = {
            37: 'left',
            39: 'right',
            40: 'down',
            38: 'rotate'
        };
        if (typeof keys[e.keyCode] !== 'undefined') {
            keyPress(keys[e.keyCode]);
        }
    };
    
    
    c.addEventListener('touchstart', function (e) {
        var x = e.changedTouches[0].clientX - c.offsetLeft,
            y = e.changedTouches[0].clientY - c.offsetTop,
            d = c.clientWidth / 10;
        //alert((e.changedTouches[0].clientX - c.offsetLeft) + "  " + (e.changedTouches[0].clientY - c.offsetTop));
        if (y < 5 * d) { tetris.move('rotate');
            } else if (y > 11 * d) { tetris.move('down');
            } else if (x < 5 * d) { tetris.move('left');
            } else { tetris.move('right'); }
    }, false);
    
    this.start = function (speed) {
        var interval = setInterval(tetris.move, speed);
    };

}

var c = new Conroller(a);
c.start(300);

