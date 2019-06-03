console.log('cliente')
var socket = io();

socket.on('messages', function(data){
  console.log(data)
  render(data);
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

function sendMessage(ev){
  var message = {
    nickname: document.getElementById('nickname').value,
    text: document.getElementById('text').value,
  }
  socket.emit('add-message', message)

  return false;
}


// var socket = io.Socket('http://172.16.1.91:6677', {'forceNew':true})
