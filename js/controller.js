function Conroller(tetris) {
    "use strict";



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
    
    
    
    this.start = function (speed) {
        var interval = setInterval(tetris.move, speed);
    };

}

var c = new Conroller(a);
//c.start(300);

