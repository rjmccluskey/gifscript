module.exports = function(io) {
  var userCount = 0
  var currentUsers = []

  io.on('connection', function(socket) {
    console.log('a user connected')
    userCount++
    console.log(userCount + ' user(s) connected')

    socket.on('login', function(user) {
      console.log(user + 'connected')
      currentUsers.push(user)
      io.emit('login', user)
    })

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