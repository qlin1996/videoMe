module.exports = io => {
  io.on('connection', socket => {
    console.log(`A socket connection to the server has been made: ${socket.id}`)

    // 2. listens for join-room (roomId and userId) from client
    socket.on('join-room', (roomId, userId) => {
      // 3. let old users know that a new user has joined by sending client the new userId.
      socket.join(roomId)
      socket.to(roomId).broadcast.emit('user-connected', userId)
    })

    socket.on('disconnect', () => {
      console.log(`Connection ${socket.id} has left the building`)
    })
  })
}
