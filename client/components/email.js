import React from 'react'

class Email extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      message: `Your friend has invited you to a video call. Join here https://video-me.herokuapp.com/rooms/${
        this.props.roomId
      } to connect.`
    }
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  render() {
    return (
      <div>
        <p>
          Waiting for the other user to connect. Send an email to your friend to
          invite them to this room.
        </p>

        <form method="POST" action="/email">
          <div className="one-field">
            <label>Your Friend's Email</label>
            <input
              className="email"
              name="email"
              type="text"
              onChange={this.handleChange}
              value={this.state.email}
            />
          </div>
          <div className="one-field">
            <label>Your Message</label>
            <textarea
              className="message"
              name="message"
              type="text"
              onChange={this.handleChange}
              value={this.state.message}
            />
          </div>

          <div className="form-button">
            <button type="submit">Send Email</button>
          </div>
        </form>
      </div>
    )
  }
}

export default Email
