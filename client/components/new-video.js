import React from 'react'
import {connect} from 'react-redux'
import socket from '../socket'
// peer is a WebTRC API that creates a userId and allows us to connect to other users
import Peer from 'peerjs'

class NewVideo extends React.Component {
  constructor() {
    super()
    this.state = {
      peers: {},
      videoGrid: ''
    }
  }

  async componentDidMount() {
    const videoGrid = document.querySelector('#video-grid')
    this.setState(prevState => ({
      peers: prevState.peers,
      videoGrid: videoGrid
    }))

    const myPeer = new Peer()
    myPeer.on('open', myUserId => {
      // 1. send to server (roomId and userId) to let others know youve joined room
      socket.emit('join-room', this.props.match.params.roomId, myUserId)
    })

    // ask for access to webcam and audio
    const myStream = await window.navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true
    })
    // once stream is available, set it as the source object for the video tag and start video
    const myVideo = document.createElement('video')
    myVideo.muted = true
    myVideo.srcObject = myStream
    myVideo.addEventListener('loadedmetadata', () => {
      myVideo.play()
    })
    this.state.videoGrid.append(myVideo)

    // 7. when new user tries to calls us, answer and send them our stream
    myPeer.on('call', call => {
      call.answer(myStream)
      // and add to their page
      const othersVideo = document.createElement('video')
      call.on('stream', newUserStream => {
        othersVideo.srcObject = newUserStream
        othersVideo.addEventListener('loadedmetadata', () => {
          othersVideo.play()
        })
        this.state.videoGrid.append(othersVideo)
      })
    })
    // 4. listens for user-connected (userId) from server
    socket.on('user-connected', newUserId => {
      // 5. use peer to call new users so users connect directly with each other now. send new user your stream.
      const call = myPeer.call(newUserId, myStream)
      // 6. when new user sends back their stream, add it to our page
      const othersVideo = document.createElement('video')
      call.on('stream', newUserStream => {
        othersVideo.srcObject = newUserStream
        othersVideo.addEventListener('loadedmetadata', () => {
          othersVideo.play()
        })
        this.state.videoGrid.append(othersVideo)
      })
      // when new user leaves, remove video
      call.on('close', () => {
        othersVideo.remove()
      })
      // store this call in state to keep track of all calls
      this.setState(prevState => ({
        peers: {...prevState.peers, [newUserId]: call},
        videoGrid: prevState.videoGrid
      }))
    })

    // 8. when new user leaves, update state and let server know
    socket.on('user-disconnected', newUserId => {
      if (this.state.peers[newUserId]) this.state.peers[newUserId].close()
    })
  }

  render() {
    return (
      <div>
        <div id="video-grid" />
      </div>
    )
  }
}

export default connect(null)(NewVideo)
