module.exports = function(io) {
  var userCount = 0

  io.on('connection', function(socket) {
    console.log('a user connected')
    userCount++
    console.log(userCount + ' user(s) connected')
    io.emit('notification', '** a user connected ** (total users: ' + userCount + ')')

    socket.on('chat message', function(msg){
      io.emit('chat message', msg)
    })

    socket.on('disconnect', function(){
      console.log('a user disconnected')
      userCount--
      console.log(userCount + ' user(s) connected')
      io.emit('notification', '** a user disconnected ** (total users: ' + userCount + ')')
    })
  })
}