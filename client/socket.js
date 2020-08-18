import io from 'socket.io-client'

const socket = io(window.location.origin, {transports: ['polling']})

socket.on('connect', () => {
  console.log('Connected!')
})

export default socket
