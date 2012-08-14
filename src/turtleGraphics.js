(function (window, document) {

var slice = [].slice, dToR = Math.PI / 180, define;

function makeFn(args, fn) {
    return Function(
        args.concat('__canvas,__canvasElement,__turtle,__args,__extras').join(','),
        'return (' + fn + ').apply(this, __extras.concat(__args))'
    );
}

function turtleGraphics(canvas, draw) {
    if (typeof canvas == 'string')
        canvas = document.querySelector(canvas);
    var turtle = {
        x: 0,
        y: 0,
        heading: 0,
        drawing: true
    },  context = canvas.getContext('2d'),
        keys = Object.keys(turtleGraphics.functions),
        values = keys.map(function (key) { return turtleGraphics.functions[key]; }).map(function (fn) {
            var fun = makeFn(keys, fn.fn);
            return function () {
                return fun.apply(this, args(arguments, fn.args));
            };
        }), returnVal;
    function args(args, extras) {
        return values.concat(context, canvas, turtle, [slice.call(args)], [extras]);
    }
    context.beginPath();
    context.moveTo(turtle.x, turtle.y);
    returnVal = makeFn(keys, draw).apply(this, args(arguments, []));
    context.stroke();
    context.closePath();
    return returnVal;
}

turtleGraphics.functions = {};
define = turtleGraphics.define = function (name, fn, args) {
    turtleGraphics.functions[name] = {fn: fn, args: (args || []).concat(fn.args || [])};
};

define('penup', function () {
    __turtle.drawing = false;
});

define('pendown', function () {
    __turtle.drawing = true;
});

define('color', function () {
    return __canvas.strokeStyle;
});

define('setcolor', function (color) {
    __canvas.strokeStyle = color;
});

define('pos', function () {
    return {x: __turtle.x, y: __turtle.y};
});

define('setpos', function (x, y) {
    __turtle.x = x;
    __turtle.y = y;
});

define('heading', function () {
    return __turtle.heading;
});

define('setheading', function (val) {
    __turtle.heading = val;
});

define('clearscreen', function () {
    __turtle.x = 0;
    __turtle.y = 0;
    __turtle.heading = 0;
    __turtle.drawing = true;
    __canvas.save();
    __canvas.setTransform(1, 0, 0, 1, 0, 0);
    __canvas.clearRect(0, 0, __canvasElement.width, __canvasElement.height);
    __canvas.restore();
});

function newCoord(old, dist, heading, add, trig) {
    return Math.round(add(old, dist * trig(heading * dToR)));
}

function mover(add) {
    function fn(add, newCoord, dist) {
        var newX = newCoord(__turtle.x, dist, __turtle.heading, add, Math.sin),
            newY = newCoord(__turtle.y, dist, __turtle.heading, add, Math.cos);
        __turtle.x = newX;
        __turtle.y = newY;
        if (__turtle.drawing)
            __canvas.lineTo(newX, newY);
        else
            __canvas.moveTo(newX, newY);
    }
    fn.args = [add, newCoord];
    return fn;
}

function add(a, b) { return a + b; }
function subtract(a, b) { return a - b; }

define('forward', mover(add));

define('back', mover(subtract));

function rotator(add) {
    function fn(add, deg) {
        return __turtle.heading = add(__turtle.heading, deg) % 360;
    }
    fn.args = [add];
    return fn;
}

define('left', rotator(subtract));

define('right', rotator(add));

window.turtleGraphics = turtleGraphics;

})(this, document);
