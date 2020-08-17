import React from 'react'
import {Link} from 'react-router-dom'
import socket from '../socket'
// peer is a WebTRC API that creates a userId and allows us to connect to other users
import Peer from 'peerjs'
// to create a unique roomId
import {v4} from 'uuid'

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
      this.setState({otherUsersConnection: 'left'})
      myStream.getTracks().forEach(function(track) {
        track.stop()
      })
    })
  }

  render() {
    return (
      <div className="video-container">
        {this.state.otherUsersConnection === 'waiting' && (
          <p>Waiting for the other user to connect.</p>
        )}
        {this.state.otherUsersConnection === 'connected' && (
          <p>You are connected.</p>
        )}
        {this.state.otherUsersConnection === 'left' && (
          <div id="user-disconnected" className="flex">
            <p>The other user has hung up.</p>
            <div id="buttons" className="flex">
              <Link to="/">
                <button type="button">Return to home</button>
              </Link>
              <Link to={`/rooms/${v4()}`}>
                <button type="button">New Video Call</button>
              </Link>
            </div>
          </div>
        )}
        <div id="videos">
          <video
            id="remote-video"
            ref={video => {
              this.remoteVideo = video
            }}
          />
          <video
            id="my-video"
            ref={video => {
              this.myVideo = video
            }}
          />
        </div>
      </div>
    )
  }
}

export default NewVideo
