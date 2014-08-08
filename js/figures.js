

function initFigures() {
    "use strict";
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
}

function transpose(a) {
    "use strict";
    return Object.keys(a[0]).map(function (c) {
        return a.map(function (r) {
            return r[c];
        });
    });
}

function inverse(a) {
    "use strict";
    var i, n = a.length;
    for (i = 0; i < n; i += 1) {
        a[i].reverse();
    }
    return a;
}

function turn(figure) {
	/* To turn a figure 1) transpose matrix
						2) reverse every row*/
    "use strict";
    return (inverse(transpose(figure)));
}


