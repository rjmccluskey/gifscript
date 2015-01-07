var socket = io()

$(document).ready(function(){
  addEventListeners()

  socket.on('chat message', appendMessage)
})

function addEventListeners() {
  $('#chat_form').on('submit', promptForGIF)
  $('body').on('submit','#search_giphy_form', getGiphyGIFs)
  $('body').on('click','.giphy_result', emitMessage)
}

function appendMessage(msg) {
  // appends message to chat window
  $('#messages').append(msg)
}



function promptForGIF(event) {
  // emits the message to all users
  if ($('#get_gif_window').length === 0) {
    getGIFSearchForm()
  }
  return false
}

function resetChatInput() {
  // clears the GIF form and text input box
  $('#get_gif_window').remove()
  $('#chat_input').val('')
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
    $('#get_gif_window').append(data)
  })
}

function emitMessage() {
  var url = $(this).attr('src')
  var message = '<li><img src="' + url + '" class="gif"><p>' + $('#chat_input').val() + '</p></li>'
  console.log(url)
  console.log(message)

  socket.emit('chat message', message)
  resetChatInput()
}