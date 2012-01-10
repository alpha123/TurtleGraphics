An implementation of the system described [here](http://programmingpraxis.com/2012/01/03/turtle-graphics/), written in JavaScript and using the HTML5 `<canvas>` element for rendering.

It exports exactly one global variable, `turtleGraphics`, a function with the following signature:

    turtleGraphics(Element|String canvas, Function draw)

if `canvas` is a string, it is turned into an element with `canvas = document.querySelector(canvas)`.

11 commands are available, described [here](http://programmingpraxis.com/2012/01/03/turtle-graphics/).

It's pretty easy to use:

    turtleGraphics('#my-canvas', function () {
        // Draw a big "HI"
        
        penup(); forward(100); right(90); forward(100); pendown();  // Position the turtle
        
        right(90); forward(100); back(200); forward(100); left(90);    // Draw the
        forward(50); right(90); forward(100); back(200); forward(100); // "H"
        
        penup(); left(90); forward(100); pendown();  // Move the turtle over
        
        right(90); forward(100); left(90); forward(50); back(100); forward(50); // Draw
        left(90); forward(200); left(90); forward(50); back(100); forward(50);  // The
        left(90); forward(100);                                                 // "I"
    });

You can define new functions:

    turtleGraphics.define('hi', function () {
        right(90); forward(100); back(200); forward(100); left(90);    // Draw the
        forward(50); right(90); forward(100); back(200); forward(100); // "H"
        
        penup(); left(90); forward(100); pendown();  // Move the turtle over
        
        right(90); forward(100); left(90); forward(50); back(100); forward(50); // Draw
        left(90); forward(200); left(90); forward(50); back(100); forward(50);  // The
        left(90); forward(100);  
    });
    
    turtleGraphics('#my-canvas', function () {
        penup(); forward(100); right(90); forward(100); pendown();  // Position the turtle
        hi();
    });

For more, see demo/demo.html.