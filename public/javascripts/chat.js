var socket = io()

$(document).ready(function(){
  addEventListeners()

  socket.on('chat message', appendMessage)
})





function emitMessage(event) {
  // emits the message to all users
  if ($('#get_gif_window').length === 0) {
    getGIFSearchForm()

    // socket.emit('chat message', $('#chat_input').val())
    // clearInput()
  }
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

function addEventListeners() {
  $('#chat_form').on('submit', emitMessage)
  $('body').on('submit','#search_giphy_form', getGiphyGIFs)
}


function getGIFSearchForm() {
  $.ajax({
    type: 'GET',
    url: '/gifs/new'
  }).done(function(data){
    $('body').append(data)
  })
}

function getGiphyGIFs(event) {
  event.preventDefault()
  $.ajax({
    type: 'GET',
    url: '/gifs/search?giphysearch=' + $('#search_giphy_input').val(),
  }).done(function(data){
    console.log(data)
    $('#get_gif_window').append(data)
  })
}