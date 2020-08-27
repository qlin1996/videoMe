import React from 'react'

class Email extends React.Component {
  constructor() {
    super()
    this.state = {
      senderName: '',
      email: ''
    }
  }

  handleChange(event) {
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
        <form>
          <div className="form-input">
            <label>Your Name:</label>
            <input
              name="senderName"
              type="text"
              onChange={this.handleChange}
              value={this.state.senderName}
            />
            <label>Your Friend's Email:</label>
            <input
              name="email"
              type="text"
              onChange={this.handleChange}
              value={this.state.email}
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
