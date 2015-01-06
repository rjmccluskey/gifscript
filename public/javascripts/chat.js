var socket = io()

$(document).ready(function(){
  $('#chat_form').on('submit', function(){
    socket.emit('chat message', $('#chat_input').val())
    $('#chat_input').val("")
    return false
  })

  socket.on('chat message', function(msg){
    $('#messages').append($('<li>').text(msg))
  })
})