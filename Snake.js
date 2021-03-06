var snake = [[0, 0],[1, 0],[2, 0]];
var boxes = [];
var dimention = 50;
var timed = 0;
var direction = [[1, 0],[0, 1]];
var w = 10;
var h = 10;
var directionX; // changes index
var directionY; // changes index
var nx = 0;
var ny = 0;
var hold = [1, 0];
var a = new Snake(nx, ny, w, h);

function setup() {
    var x = 0;
    var y = 0;
    createCanvas(600, 600);

    for (var i = 0; i < dimention * dimention; i++) {
        boxes[i] = new Snake(x, y, w, h);
        //console.log(x);
        x += w;

        if ((i + 1) % (dimention) == 0 && i != 0) {
            //console.log("i: "+i+" x: "+x+" y: "+y);
            y += h;
            x = 0;
        }
    }
}

function keyPressed() {

    if (keyCode === UP_ARROW) {
        directionX = 0;
        directionY = -1;
        console.log("UP");
        //moves.unshift([snake[0][0]+directionX,snake[0][1]+directionY]); //upload to server queue
        direction.unshift([directionX, directionY]); //save direction it went and upload
    } else if (keyCode === DOWN_ARROW) {
        directionX = 0;
        directionY = 1;
        console.log("DOWN");
        //moves.unshift([snake[0][0]+directionX,snake[0][1]+directionY]); //upload to server queue
        direction.unshift([directionX, directionY]); //save direction it went and upload
    } else if (keyCode === RIGHT_ARROW) {
        directionX = 1;
        directionY = 0;
        console.log("RIGHT");
        //moves.unshift([snake[0][0]+directionX,snake[0][1]+directionY]); //upload to server queue
        direction.unshift([directionX, directionY]); //save direction it went and upload
    } else if (keyCode === LEFT_ARROW) {
        directionX = -1;
        directionY = 0;
        console.log("LEFT");
        //moves.unshift([snake[0][0]+directionX,snake[0][1]+directionY]); //upload to server queue
        direction.unshift([directionX, directionY]); //save direction it went and upload
    }

}

function draw() {

    time();

    background(255);
    // for (var i = 0; i < 500; i += w) {
    //     line(i, 0, i, 500);
    //     line(0, i, 500, i);
    // }

    for (var i = 0; i < snake.length; i++) {
        var tx = snake[i][0];
        var ty = snake[i][1];

        if (tx == 50) {
            tx = 0;
            snake[i][0] = 0;
        }
        if (tx == -1) {
            tx = 49;
            snake[i][0] = 49;
        }
        if (ty == 50) {
            ty = 0;
            snake[i][1] = 0;
        }
        if (ty == -1) {
            ty = 49;
            snake[i][1] = 49;
        }
        // console.log(ty);
        // console.log(tx);
        boxes[tx + ty * dimention].display();
    }

    // for(var i = 0; i < boxes.length; i++) {
    //  	boxes[i].display();
    // }

    a.display();
    timed++;

}

function time() { //import moves and direction arrays
    direct = direction.length - 1;

    if (timed == 5) {
        while (direction.length > 0 && direction[direct][0] == -hold[0] && direction[direct][1] == -hold[1]) {
            shorten(direction);
            direct = direction.length - 1;
            console.log("work");
        }
        //console.log("move");
        if (direction.length > 0) {
            snake.unshift([snake[0][0] + direction[direct][0], snake[0][1] + direction[direct][1]]);
            if (snake[0][0] != nx || snake[0][1] != ny) {
                shorten(snake);
            } else {
                apple();
            }
            if (direction.length > 0) {

                hold = direction.pop();
                console.log(hold);
            }
        } else {
            snake.unshift([snake[0][0] + hold[0], snake[0][1] + hold[1]]);
            if (snake[0][0] != nx || snake[0][1] != ny) {
                shorten(snake);
            } else {
                apple();
            }
        }
        timed = 0;
    }
}

//================= Snake body class =====================

function Snake(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;

    this.display = function() {
        fill(255, 0, 0);
        rect(x, y, w, h);
    }
}

//=============== Apple =================

function apple() {
    nx = int(random(0, 50));
    ny = int(random(0, 50));

    a = new Snake(nx * w, ny * h, w, h);
}
