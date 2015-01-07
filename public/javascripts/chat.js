var socket = io()

$(document).ready(function(){
  addChatListeners()

  socket.on('chat message', appendMessage)
})





function emitMessage() {
  // emits the message to all users
  getGIFSearchForm()

  socket.emit('chat message', $('#chat_input').val())
  clearInput()
  return false
}

function clearInput() {
  // clears the text input box after user sends message
  $('#chat_input').val('')
}

function appendMessage(msg) {
  // appends message to chat window
  $('#messages').append($('<li>').text(msg))
}

function addChatListeners() {
  $('#chat_form').on('submit', emitMessage)
}

function addGIFSearchListeners(){
  $('#search_giphy_form')
}

function getGIFSearchForm() {
  $.ajax({
    type: 'GET',
    url: '/gifs/new'
  }).done(function(data){
    $('body').append(data)
  })
}