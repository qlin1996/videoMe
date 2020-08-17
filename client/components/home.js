import React from 'react'

function Home() {
  return (
    <div className="container">
      <img src="https://images.pexels.com/photos/3960127/pexels-photo-3960127.jpeg?cs=srgb&dl=pexels-andrea-piacquadio-3960127.jpg&fm=jpg" />
      <div className="text-on-image">
        <h1>
          A simple 1-to-1
          <br />
          video chat application.
        </h1>
        <p>
          All you have to do is send your URL to your friend to start the call.
        </p>
      </div>
    </div>
  )
}

export default Home
