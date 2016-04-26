var express = require('express')
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
//
var direction = new Array();
var firm = [];
var user = true;
var snake = [[0, 0],[1, 0],[2, 0]];

server.listen(process.env.PORT || 5000);

app.use(express.static('public'));


io.on('connection', function (socket) {
  socket.broadcast.emit('request', user);
  socket.on('recieveQ', function(data) {
    for(var i = 0; i < entries.length; i++){
      direction[i] = entries[i];
    }
    console.log("Recived Queue");
  });

  socket.on('recieveH', function(hold) {
    firm[0] = hold[0];
    firm[1] = hold[1];
    console.log("Recieved Hold");
  });

  socket.on('reciveB', function(data) {
    for(var i = 0; i < data.length; i++){
      for(var j = 0; j < 2; j++) {
        snake[i][j] = data[i][j];
      }
    }
    console.log(snake);
    socket.broadcast.emit('current', snake);
  });

  if(direction.length > 0) {
    socket.emit('tail', direction);
  } else {
    socket.emit('hold', firm);
    console.log("Updated Hold");
  }




  socket.on('keyEvent', function (data) {
    //console.log(data);
    var directionX = data.dirX;
    var directionY = data.dirY;

    direction.unshift([directionX, directionY]);
    // console.log("dX:"+directionX);
    // console.log("dY:"+directionY);
    //console.log("serverD:"+direction);
    socket.broadcast.emit('queue', direction);

  });

});
