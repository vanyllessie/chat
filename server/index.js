var express = require("express");
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

app.use(express.static('client'));

app.get('/login', function(req, res){
  res.status(200).send('Login')
})

var existentUsers = [
  "us1",
  "us2"
]

var activeUsers = [];

var activeUser = null;

var messages = [];

var searchActiveUsersById = function(id){
  var flag = false;
  activeUsers.forEach((user)=>{
    if(user.socketId == id){
      flag = true;
    }
  })
  return flag;
}

var getNameById = function(id){
  var name = "";
  activeUsers.forEach((user)=>{
    if(user.socketId == id){
      name = user.nickname;
    }
  })
  return name;
}

io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('add-log', function(data){
    if (existentUsers.includes(data.nickname)){
      console.log('log with user: ' + data.nickname);
      activeUsers.push({
        nickname : data.nickname,
        socketId: socket.id
      });
      socket.emit('log', socket.id);
      socket.on('add-message', function(data){
        if(searchActiveUsersById(socket.id)){
          messages.push({
            text: data.text,
            nickname: getNameById(socket.id),
          });
          activeUsers.forEach((us)=>{
            io.sockets.sockets[us.socketId].emit('messages', messages);
          })
        }
      })
    }
  })
});

server.listen(6677, function(){
  console.log("Server ON 6677")
})
