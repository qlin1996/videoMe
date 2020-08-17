import React from 'react'
import {Link} from 'react-router-dom'
// to create a unique roomId
import {v4} from 'uuid'

const Navbar = () => {
  return (
    <div>
      <div className="flex">
        <div className="flex" id="icon">
          <i className="fas fa-square" />
          <i className="fas fa-video" />
        </div>
        <div>
          <h1>VideoMe</h1>
        </div>
      </div>
      <nav>
        <div>
          <Link to="/">Home</Link>
          <Link to={`/rooms/${v4()}`}>New Video Call</Link>
        </div>
      </nav>
    </div>
  )
}

export default Navbar
