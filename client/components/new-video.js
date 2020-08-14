import React from 'react'
import {connect} from 'react-redux'

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
    return (
      <div>
        <div>
          <video autoPlay="true" muted="muted" className="#video-grid" />
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
