import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import socket from '../socket'
// peer is a WebTRC API that creates a userId and allows us to connect to other users
import Peer from 'peerjs'

class NewVideo extends React.Component {
  constructor() {
    super()
    this.state = {
      otherUsersConnection: 'waiting'
    }
  }
  async componentDidMount() {
    const myPeer = new Peer()
    myPeer.on('open', myUserId => {
      // 1. send to server (roomId and userId) to let others know youve joined room
      socket.emit('join-room', this.props.match.params.roomId, myUserId)
    })
    // allow access to webcam and audio
    const myStream = await window.navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true
    })
    // once stream is available, set it as the source object for the video tag and start video
    this.myVideo.muted = true
    this.myVideo.srcObject = myStream
    this.myVideo.addEventListener('loadedmetadata', () => {
      this.myVideo.play()
    })
    // 7. when new user tries to call us, answer and send them our stream
    myPeer.on('call', call => {
      call.answer(myStream)
      call.on('stream', newUserStream => {
        this.remoteVideo.muted = true
        this.remoteVideo.srcObject = newUserStream
        this.remoteVideo.addEventListener('loadedmetadata', () => {
          this.remoteVideo.play()
        })
        this.setState({otherUsersConnection: 'connected'})
      })
    })
    // 4. listens for user-connected (userId) from server
    socket.on('user-connected', newUserId => {
      // 5. use peer to call new users so users connect directly with each other now. send new user your stream.
      const call = myPeer.call(newUserId, myStream)
      // 6. when new user sends back their stream, add it to our page
      call.on('stream', newUserStream => {
        this.remoteVideo.srcObject = newUserStream
        this.remoteVideo.addEventListener('loadedmetadata', () => {
          this.remoteVideo.play()
        })
        this.setState({otherUsersConnection: 'connected'})
      })
    })
    // 8. when new user leaves, update state and let server know
    socket.on('user-disconnected', () => {
      this.remoteVideo.remove()
      this.setState({otherUsersConnection: 'left'})
    })
  }
  render() {
    return (
      <div id="video-grid">
        {this.state.otherUsersConnection === 'waiting' && (
          <p>Waiting for other user to connect</p>
        )}
        <video
          ref={video => {
            this.myVideo = video
          }}
        />
        <video
          ref={video => {
            this.remoteVideo = video
          }}
        />
        {this.state.otherUsersConnection === 'left' && (
          <div>
            <p>The other user has hung up</p>
            <Link to="/">
              <button type="button">Return to home</button>
            </Link>
          </div>
        )}
      </div>
    )
  }
}

export default connect(null)(NewVideo)
