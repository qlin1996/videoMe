module.exports = io => {
  io.on('connection', socket => {
    console.log(`A socket connection to the server has been made: ${socket.id}`)

    // listens for join-room from frontend. calls func after.
    socket.on('join-room', (roomId, userId) => {
      console.log('WHAT IS THIS', roomId, userId)
    })

    socket.on('disconnect', () => {
      console.log(`Connection ${socket.id} has left the building`)
    })
  })
}
