var b = [];
var e;

function setup() {
  createCanvas(800, 800);
  rectMode(CENTER);
  for(var i = 0; i < 15; i++){
    b.push(new Bug(random(0,width),random(0,height),random(0.5,1.5)));
  }
  e = new Eater(400,400);
}

function draw() {
  background(255,0,0);
  for(var i = 0; i < b.length; i++) {
    b[i].bdisplay();
    if(b[i].h() === "false"){
      if(b[i].g() === "false"){
        b[i].direction();
      } else {
        b[i].propel();
      }
    }
  }
  e.edisplay();
  if(b.length <= 10) {
    b.push(new Bug(random(0,width),random(0,height),random(0.5,1.5)));
  }
}

//===============================================================
//                Bug Class
//===============================================================

function Bug(vx,vy,bsize) {
  var head,hheight,tail,wing2x,wing2y,wing3x,wing3y,wing4x,wing4y,ang1,ang2,ang3,ang4,down,going,rot,turn,d,fx,fy,ready,held;

  this.vx = vx;
  this.vy = vy;
  this.bsize = bsize;
  head = 50/4*bsize;
  hheight = -100/4*bsize;
  tail = 50/4*bsize;
  wing2x = hheight/3;
  wing2y = 0;
  wing3x = hheight/4+wing2x;
  wing3y = 0;
  wing4x = hheight/5+wing3x;
  wing4y = 0;
  ang1 = 45;
  ang2 = 12;
  ang3 = 12;
  ang4 = 12;
  down = false;
  going = false;
  ready = false;
  held = false;
  rot = radians(random(0,360));

  this.g = function() {
    return going.toString();
  }

  this.xpos = function() {
    return vx.toString();
  }

  this.ypos = function() {
    return vy.toString();
  }

  this.h = function() {
    return held.toString();
  }

  this.bdisplay = function() {
    push();
      translate(vx,vy);
      rotate(rot);
      this.tbody();
      push();
        this.lWing();
      pop();
      push();
        this.rWing();
      pop();
    pop();
  }

  this.tbody = function() {
    fill(255);
    beginShape();
    vertex(head,hheight);
    vertex(-head,hheight);
    vertex(0,tail);
    endShape(CLOSE);
  }

  this.rWing = function() {
    translate(head,hheight);
    rotate(radians(ang1+180));
    rect(0,0,hheight/2,hheight/2);
    rotate(radians(ang2));
    rect(wing2x,wing2y,hheight/3,hheight/3);
    rotate(radians(ang3));
    rect(wing3x,wing3y,hheight/4,hheight/4);
    rotate(radians(ang4));
    rect(wing4x,wing4y,hheight/5,hheight/5);

  }

  this.lWing = function() {
    translate(-head,hheight);
    rotate(radians(-ang1));
    rect(0,0,hheight/2,hheight/2);
    rotate(radians(-ang2));
    rect(wing2x,wing2y,hheight/3,hheight/3);
    rotate(radians(-ang3));
    rect(wing3x,wing3y,hheight/4,hheight/4);
    rotate(radians(-ang4));
    rect(wing4x,wing4y,hheight/5,hheight/5);
  }

  this.moveUP = function() {
    if(!down){
    if(ang1 > 0){
      ang1 -= 1;
    } else if (ang2 > -12) {
      ang2 -= 1;
    } else if (ang3 > -12) {
      ang3 -= 1;
    } else if (ang4 > -12) {
      ang4 -= 1;
    } else {
      if(ready){
        down = true;
        fx = 100;
        fy = 100;
      }
    }
  }
  }

  this.moveDOWN = function() {
    if(ang4 < 12){
      ang4 += 5;
    } else if (ang3 < 12) {
      ang3 += 5;
      vx += d.x - d.x/fx;
      vy += d.y - d.y/fy;
      fx--;
      fy--;
    } else if (ang2 < 12) {
      ang2 += 5;
      vx += d.x - d.x/fx;
      vy += d.y - d.y/fy;
      fx--;
      fy--;
    } else if (ang1 < 45) {
      ang1 += 5;
      vx += d.x - d.x/fx;
      vy += d.y - d.y/fy;
      fx--;
      fy--;
    } else {
      if(fx != 0) {
        vx += d.x - d.x/fx;
        vy += d.y - d.y/fy;
        fx--;
        fy--;
      } else {
        going = false;
        down = false;
      }
    }
  }

  this.propel = function() {
      if(!down){
        this.moveUP();
        this.isTurning();
      } else {
        this.moveDOWN();
      }
  }

  this.direction = function() {
    if(vx > width || vx < 0) {
      d = createVector(width-vx,0);
      d.normalize();
      turn = d.heading()+HALF_PI;
      going = true;
    } else if(vy > height || vy < 0) {
      d = createVector(0,height-vy);
      d.normalize();
      turn = d.heading()+HALF_PI;
      going = true;
    } else if(random() < 0.2){
      if(this.sense() < 250) {
        d = createVector(e.xpos()-vx,e.ypos()-vy);
        d.normalize();
        d.mult(-1);
        turn = d.heading()+HALF_PI;
        going = true;
      } else {
        d = createVector(random(-10,10),random(-10,10));
        d.normalize();
        turn = d.heading()+HALF_PI;
        going = true;
      }
    }
  }

  this.isTurning = function() {
    if(degrees(turn-rot) > 2 || degrees(turn-rot) < -2) {
      ready = false;
      if(degrees(turn-rot) > 0){
        rot = radians(degrees(rot)+2);
      } else {
        rot = radians(degrees(rot)-2);
      }
    } else {
      rot = turn;
      ready = true;
    }
  }

  this.sense = function() {
    var curr = createVector(vx,vy);
    var en = createVector(e.xpos(),e.ypos());
    return curr.dist(en);
  }

  this.caught = function() {
    held = true;
  }
}

//=================================================================
//                  Eater Class
//=================================================================

function Eater(x,y) {

this.x = x;
this.y = y;

this.xpos = function() {
  return x.toString();
}

this.ypos = function() {
  return y.toString();
}

this.edisplay = function() {
  fill(0,0,200);
  ellipse(x,y,80,80);
  if(random() < 0.75){
    this.stalk(this.track());
  }

}

this.track = function() {
  var curr = createVector(x,y);
  var stan = createVector(b[0].xpos(),b[0].ypos());
  var near = curr.dist(stan);
  var target = 0;

  for(var i = 0; i < b.length; i++){
    var look = createVector(b[i].xpos(),b[i].ypos());
    if(curr.dist(look) < near) {
      near = curr.dist(look);
      target = i;
    }
  }
  return target;
}

this.stalk = function(t) {
  var mov = createVector(b[t].xpos()-x,b[t].ypos()-y);
  mov.normalize();
  x += mov.x;
  y += mov.y;
  if(x+60 > b[t].xpos() && x-60 < b[t].xpos() && y+60 > b[t].ypos() && y-60 < b[t].ypos()) {
    b[t].caught();
  }
  if(x+10 > b[t].xpos() && x-10 < b[t].xpos() && y+10 > b[t].ypos() && y-10 < b[t].ypos()) {
    b.splice(t,1);
  }
}
}
