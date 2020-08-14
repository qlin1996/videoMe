import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

class Video extends React.Component {
  render() {
    // create roomId
    let chars = '1234567890qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM'
    let roomId = ''
    for (let j = 0; j < 6; j++) {
      roomId += chars[Math.floor(Math.random() * 62)]
    }

    return (
      <div>
        <Link to={`/rooms/${roomId}`}>New Video</Link>
      </div>
    )
  }
}

export default connect(null)(Video)
