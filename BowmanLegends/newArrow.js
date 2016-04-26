
//============= INITIALIZE CLASS ===========

var projectile = [];
var landed = [];
var pos1x;
var pos1y;
var pos2x;
var pos2y;

// ============= INITIALIZE IMAGES =============

var bowman;
var bow;
var pointy1;
var pointy2;
var pointy1d;
var pointy2d;
var bBase;
var rBase;

// ============= BOOLEANS ======================

var fly = false;
var turn1 = true;
var set = true;
var knocked = true;
var winner = false;
var p1win = false;
var p2win = false;

// ============== DRAGGING VARIABLES ================

var cursorX;
var cursorY;
var pointX;
var pointY;
var deg;
var mag = 1;
var norm;
var vectorX;
var vectorY;

// ============== PLAYER HEALTH ====================

var p1health = 2; //Player 1 health
var p2health = 2; //Player 2 health



function preload() {
  bowman = loadImage("images/newArrow/stick.png"); //Player model
  bow = loadImage("images/newArrow/bow2.png"); //Bow
  pointy1 = loadImage("images/newArrow/sharp1.png"); //Player 1 arrow
  pointy2 = loadImage("images/newArrow/sharp2.png"); //Player 2 arrow
  bBase = loadImage("images/newArrow/blueG.png");
  rBase = loadImage("images/newArrow/redG.png");
  pointy1d = loadImage("images/newArrow/sharp1d.png");
  pointy2d = loadImage("images/newArrow/sharp2d.png");
}

function setup() {
  createCanvas(700, 600);
  projectile.push(new arrow(1,1,1,1));
}

function draw() {
  background(255);
  stroke(0);
  push();
    translate(width/2,height/2);
    if(set == false){ //Center player positions
      projectile[0].hit();
    }
    projectile[0].displayWorld(); //Display all objects
  pop();
  fill(0);
  if(fly == true){
    projectile[0].moveWorld(); //Move world
    projectile[0].adisplay(); //Display arrow

  }
  if(mouseIsPressed) { //While mouse is pressed, display arrow and draw magnitude line
    strokeWeight(4);
    stroke(255-2*mag,0+2*mag,0+mag/2); //Line changes color with magnitude
    line(pointX,pointY,cursorX,cursorY);
    strokeWeight(1);
    stroke(0);
    projectile.push(new arrow(mag,deg,vectorX,vectorY)); //Initialize new arrow
    projectile[0] = projectile.pop();
    projectile[0].adisplay(); //Draw arrow
  }
}

function mousePressed() {
   if(knocked == true) {
     pointX = mouseX;
     pointY = mouseY;
     cursorX = mouseX; //Needed here otherwise wonky line
     cursorY = mouseY; //Needed here otherwise wonky line
     vectorX = mouseX-width/2;
     vectorY = mouseY-height/2;
     deg = atan2(vectorY,vectorX); // Get radian for rotation
     norm = sqrt(pow((vectorX),2)+pow((vectorY),2)); //Finding length of vector x,y
     vectorX = vectorX/norm; //Normalized vector form in x-direction
     vectorY = vectorY/norm; //Normalized vector form in y-direction
     winner = false; //When mouse is pressed, erase winner text
     p1win = false;
     p2win = false;
  }
}

function mouseDragged() { //Drag for magnitude
  if(knocked == true) {
    cursorX = mouseX;
    cursorY = mouseY;
    mag = constrain(sqrt(pow((cursorX-pointX),2)+pow((cursorY-pointY),2))/3,0,100); //Calculating the lenght of the line formed divided by 3 and constrain result to 100
  }
}

function mouseReleased() { //Releases arrow and locks in arrow values
  if(knocked == true) {
     knocked = false;
     fly = true;
  }
}

// =========== Arrow Class ================

function arrow(speed, adjust, directionX, directionY) {

// ============ PLAYER VARIABLES ===========

var p1X;
var p1Y;
var p2X;
var p2Y;

// ============= OBJECT VARIABLES ===============

var gravity = -0.1;
var groundx1 = -6000; //line coordinates start
var groundx2 = 6000;
var groundy = 0; //line coordinates end
var degrees;
var correction;
var vectX;
var vectY;

// ============= CONSTRUCTOR =================


    speed = speed/6; //Adjust speed of arrow here
    degrees = adjust; //Angle of launch
    vectX = directionX*speed; //X-vector
    vectY = directionY*speed; //Y-vector
    if(turn1 == false){
      p1X = -1400; //Player 1 x-coor
      pos1x = p1X;
      p1Y = 0; //P1 y-coor
      pos1y = p1Y;
      p2X = 0; //Player 2 x-coor
      pos2x = p2X;
      p2Y = 0; //P2 y-coor
      pos2y = p2Y;
    } else {
      p1X = 0; //Player 1 x-coor
      pos1x = p1X;
      p1Y = 0; //P1 y-coor
      pos1y = p1Y;
      p2X = 1400; //Player 2 x-coor
      pos2x = p2X;
      p2Y = 0; //P2 y-coor
      pos2y = p2Y;
    }



// ============= DISPLAY FLYING ARROW =============

this.adisplay = function() {
  fill(0);
  correction = atan2(vectY,vectX)-degrees;
  push();
    translate(width/2,height/2); //Make Arrow Center of Window

    rotate(degrees); //Initial launch angle
    //println(degrees);
    rotate(correction); //Change angle of arrow as it flies
    rectMode(CORNER);
    if(turn1 == true) {
      image(pointy1,0,-5);
    } else {
      image(pointy2,0,-5);
    }
    if(mouseIsPressed) { //Only show bow when loading arrow
      image(bow,0,-35);
    }
  pop();
}


// ============= DISPLAY WORLD =================

 this.displayWorld = function() {
  line(groundx1,groundy,groundx2,groundy); //Draw Horizon
  rectMode(CENTER);
  fill(255,255,0);
  ellipse(p1X+700,p1Y-400,80,80); //Draw Sun
  image(bBase,p1X-175/2,p1Y);
  image(rBase,p2X-175/2,p2Y);
  if(landed.length >= 1){
    for(var i=0; i < landed.length; i++){
      landed[i].bdisplay();
    }
  }
  image(bowman,p1X-175/2,p1Y-150); //Player One
  image(bowman,p2X-175/2,p2Y-150); //Player Two
  if(winner == true) { //Check if there is a winner
    if(p1win == true) { //Display who won
      textSize(48);
      fill(0, 0, 255);
      text("Player 1 Wins!", -100, -200);
    }
    if(p2win == true) {
      textSize(48);
      fill(255, 0, 0);
      text("Player 2 Wins!", -100, -200);
    }
  }
}

// ============= MOVE ALL OBJECTS ==============

this.moveWorld = function() {
  groundx1 = groundx1 - vectX; //Move Left Horizon X
  groundx2 = groundx2 - vectX; //Move Right Horizon X
  groundy = groundy - vectY; //Move Horizon Position Y
  p1X = p1X - vectX; //Move Player One X
  pos1x = p1X;
  p2X = p2X - vectX; //Move Player Two X
  pos2x = p2X;
  p1Y = p1Y - vectY; //Move Player One Y
  pos1y = p1Y;
  p2Y = p2Y - vectY; //Mover Player Two Y
  pos2y = p2Y;
  vectY = vectY - gravity; //Add Gravity
  if(groundy <= -30) { //Hit Ground Check
    fly = false; //Stop flying
    knocked = true; //Next arrow ready
    set = false; //Reset player position
    if(turn1 == true) {
      landed.push(new buried(-(p2X),-(p2Y),degrees,correction,1));
    } else {
      landed.push(new buried(-(p1X),-(p1Y),degrees,correction,0));
    }
    turn1 = !turn1; //Switch turns
    //landed.add(projectile[0]); //Add arrow object to array list
  }
  if(turn1 == true) {
    if(p2X+30 >= 0 && p2X <= 0 && p2Y+70 >= 0 && p2Y-70 <= 0){ //Hitbox Check
      fly = false; //Stop flying
      knocked = true; //Next arrow ready
      set = false; //Reset player position
      turn1 = !turn1; //Switch turns
      p2health = p2health - 1;
      landed.push(new buried(-(p2X),-(p2Y),degrees,correction,1));
      //println("hit p2");
    }
  }
  if(turn1 == false) {
    if(p1X+30 >= 0 && p1X <= 0 && p1Y+70 >= 0 && p1Y-70 <= 0) { //Hitbox Check
      fly = false; //Stop flying
      knocked = true; //Next arrow ready
      set = false; //Reset player position
      turn1 = !turn1; //Switch turns
      p1health = p1health - 1;
      landed.push(new buried(-(p1X),-(p1Y),degrees,correction,0));
      //println("hit p1");
    }
  }
  if(p1health == 0) { //Win condition
    p1health = 2;
    p2health = 2;
    p2win = true;
    winner = true;
  }
  if(p2health == 0) { //Win condition
    p1health = 2;
    p2health = 2;
    p1win = true;
    winner = true;
  }
}


// ============= ON HIT EVENT ================

this.hit = function() {
   if(p1Y <= -1 || p1Y >= 1) { //Reposition Y camera
    groundy = groundy - p1Y/30;
    p2Y = p2Y - p1Y/30;
    pos2y = p2Y;
    p1Y = p1Y - p1Y/30;
    pos1y = p1Y;
  }

  if(turn1 == false) { //If player 2 turn
    if(p2X <= -2) { //Reposition X camera to player 2
      groundx1 = groundx1 - p2X/30;
      groundx2 = groundx2 - p2X/30;
      p1X = p1X - p2X/30;
      pos1x = p1X;
      p2X = p2X - p2X/30;
      pos2x = p2X;
    } else if(p2X >= 2) { //Prevent from going too far
      groundx1 = groundx1 - p2X/30;
      groundx2 = groundx2 - p2X/30;
      p1X = p1X - p2X/30;
      pos1x = p1X;
      p2X = p2X - p2X/30;
      pos2x = p2X;
    } else {
      set = true;
    }
  }

  if(turn1 == true) { //If player 1 turn
    if(p1X <= -2) { //Reposition X camera to player 1
      groundx1 = groundx1 - p1X/30;
      groundx2 = groundx2 - p1X/30;
      p1X = p1X - p1X/30;
      pos1x = p1X;
      p2X = p2X - p1X/30;
      pos2x = p2X;
    } else if(p1X >= 2) {
      groundx1 = groundx1 - p1X/30;
      groundx2 = groundx2 - p1X/30;
      p1X = p1X - p1X/30;
      pos1x = p1X;
      p2X = p2X - p1X/30;
      pos2x = p2X;
    } else {
      set = true;
    }
  }
}

}

// ========== landed Class =============

function buried(differenceX, differenceY, ang1, ang2, player1) {

  this.bdisplay = function() {



    if(player1 == 1) {
      var positionX = pos2x + differenceX;
      var positionY = pos2y + differenceY;
      var finalX = (positionX*cos(ang1+ang2)+positionY*sin(ang1+ang2));
      var finalY = -(positionX*sin(ang1+ang2))+(positionY*cos(ang1+ang2));
      push();
        rotate(ang1);
        rotate(ang2);
        image(pointy1d, finalX, finalY);
      pop();
    } else {
      var positionX = pos1x + differenceX;
      var positionY = pos1y + differenceY;
      var finalX = (positionX*cos(ang1+ang2))+(positionY*sin(ang1+ang2));
      var finalY = -(positionX*sin(ang1+ang2))+(positionY*cos(ang1+ang2));
      push();
        rotate(ang1);
        rotate(ang2);
        image(pointy2d, finalX, finalY);
      pop();
    }
  }

}
