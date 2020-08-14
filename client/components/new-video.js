import React from 'react'
import {connect} from 'react-redux'
import socket from '../socket'

class NewVideo extends React.Component {
  async handleClick() {
    try {
      // ask for access to webcam and audio
      const stream = await window.navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true
      })
      // once stream is available, set it as the source object for the video tag and start video
      const video = document.querySelector('video')
      video.srcObject = stream
      video.play()
    } catch (error) {
      console.error(error)
    }
  }

  render() {
    // send to server
    socket.emit('join-room', this.props.match.params.roomId, 10)
    return (
      <div>
        <div id="video-grid">
          <video autoPlay={true} muted="muted" />
        </div>
        <div>
          <button type="button" onClick={this.handleClick}>
            Start Video
          </button>
        </div>
      </div>
    )
  }
}

export default connect(null)(NewVideo)
