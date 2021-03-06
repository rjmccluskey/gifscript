var socket = io()

$(document).ready(function(){
  addEventListeners()

  socket.on('chat message', appendMessage)
  socket.on('notification', appendNotification)
})

function addEventListeners() {
  $('#chat_form').on('submit', promptForGIF)
  $('body').on('submit','#search_giphy_form', getGiphyGIFs)
  $('body').on('click','.giphy_result', emitMessage)
}

function appendMessage(msg) {
  // appends message to chat window
  $('#messages').append(msg)
  scrollChatWindow()
}

function appendNotification(msg) {
  $('#messages').append($('<li>').text(msg))
  scrollChatWindow()
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
  var message = '<li><p>' + $('#chat_input').val() + '</p><img src="' + url + '" class="gif"></li>'
  console.log(url)
  console.log(message)

  socket.emit('chat message', message)
  resetChatInput()
}

function scrollChatWindow() {
  var height = 0;
  $('#messages li').each(function(i, value){
      height += parseInt($(this).height());
  });

  height += '';

  $('#chat_window').animate({scrollTop: height});
}