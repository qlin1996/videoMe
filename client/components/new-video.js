import React from 'react'
import {connect} from 'react-redux'
import socket from '../socket'
// peer is a WebTRC API that creates a userId and allows us to connect to other users
import Peer from 'peerjs'

class NewVideo extends React.Component {
  all = async () => {
    try {
      const videoGrid = document.querySelector('#video-grid')

      // create userId
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
      const myVideo = document.querySelector('#my-video')
      myVideo.srcObject = myStream
      myVideo.play()

      // listen to when someone calls us and answer them
      myPeer.on('call', call => {
        call.answer(myStream)
        // and add to their page
        const othersVideo = document.createElement('video')
        call.on('stream', newUserStream => {
          othersVideo.srcObject = newUserStream
          othersVideo.play()
          videoGrid.append(othersVideo)
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
          othersVideo.play()
          videoGrid.append(othersVideo)
        })
        // when new user leaves, remove video
        call.on('close', () => {
          othersVideo.remove()
        })
        // 6. answer the call
      })
    } catch (error) {
      console.error(error)
    }
  }

  render() {
    this.all()
    return (
      <div>
        <div id="video-grid">
          <video id="my-video" autoPlay={true} muted="muted" />
        </div>
      </div>
    )
  }
}

export default connect(null)(NewVideo)
