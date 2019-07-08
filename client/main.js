var socket = io();

var id = null;

socket.on('messages', function(data){
  render(data);
})

socket.on('log', function(data){
  if(data){
    document.querySelector(".form-messages").classList.remove("hidden")
    document.querySelector(".form-log").classList.add("hidden")
    id = data;
  }
})

function render(data){
  var html = data.map(function(message, index){
    return (`
        <div class="message">
          ${message.nickname}: ${message.text}
        </div>
      `)
  }).join('');
  document.querySelector(".messages").innerHTML = html;
}

function sendLog(ev){
  var message = {
    nickname: document.getElementById('nickname').value,
  }
  socket.emit('add-log', message)
  return false;
}

function sendMessage(ev){
  var message = {
    text: document.getElementById('text').value,
    idUser: id
  }
  socket.emit('add-message', message)

  return false;
}


// var socket = io.Socket('http://172.16.1.91:6677', {'forceNew':true})
