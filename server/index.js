var express = require("express");
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

app.use(express.static('client'));

app.get('/login', function(req, res){
  res.status(200).send('Login')
})

var messages = [{
  id: 1,
  text: "Bienvenido a la plataforma.",
  nickname: "Gi"
}]

io.on('connection', function(socket){
  console.log('a user connected');
  socket.emit('messages', messages);
  socket.on('add-message', function(data){
    messages.push(data);
    io.sockets.emit('messages', messages);
  })
});

server.listen(6677, function(){
  console.log("Server ON 6677")
})
