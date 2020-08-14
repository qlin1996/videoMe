import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
// to create a unique roomId
import {v4} from 'uuid'

class Video extends React.Component {
  render() {
    return (
      <div>
        <Link to={`/rooms/${v4()}`}>New Video</Link>
      </div>
    )
  }
}

export default connect(null)(Video)
