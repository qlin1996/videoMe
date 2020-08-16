import React from 'react'
import {Link} from 'react-router-dom'
// to create a unique roomId
import {v4} from 'uuid'

const Navbar = () => {
  return (
    <div>
      <h1>STACKATHON</h1>
      <nav>
        <div>
          <Link to={`/rooms/${v4()}`}>New Video</Link>
        </div>
      </nav>
      <hr />
    </div>
  )
}

export default Navbar
