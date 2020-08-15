module.exports = io => {
  io.on('connection', socket => {
    console.log(`A socket connection to the server has been made: ${socket.id}`)

    // 2. listens for join-room (roomId and userId) from client
    socket.on('join-room', (roomId, newUserId) => {
      // 3. let old users know that a new user has joined by sending client the new userId.
      socket.join(roomId)
      socket.to(roomId).broadcast.emit('user-connected', newUserId)

      // 9. listens for disconnect from client
      socket.on('disconnect', () => {
        socket.to(roomId).broadcast.emit('user-disconnected', newUserId)

        console.log(`Connection ${newUserId.id} has left the building`)
      })
    })
  })
}
