import React from 'react'
import axios from 'axios'

class Email extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      message: `Your friend has invited you to a video call. Join here https://video-me.herokuapp.com/rooms/${
        this.props.roomId
      } to connect.`,
      successfullySent: false,
      sending: false
    }
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit = async event => {
    event.preventDefault()
    this.setState({
      sending: true
    })
    const {data} = await axios.post('/email', {
      email: this.state.email,
      message: this.state.message
    })
    this.setState({
      email: '',
      message: `Your friend has invited you to a video call. Join here https://video-me.herokuapp.com/rooms/${
        this.props.roomId
      } to connect.`,
      successfullySent: data.successfullySent,
      sending: false
    })
    console.log('state', this.state)
  }

  render() {
    return (
      <div>
        <p>
          Waiting for the other user to connect. Send an email to your friend to
          invite them to this room.
        </p>

        <form>
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
            <button type="submit" onClick={this.handleSubmit}>
              Send Email
            </button>
          </div>

          <div className="one-field">
            {this.state.sending && <p>Your email is being sent.</p>}
            {this.state.successfullySent === 'yes' && (
              <p>Your email was sent successfully.</p>
            )}
            {this.state.successfullySent === 'no' && (
              <p>There was an error sending your email.</p>
            )}
          </div>
        </form>
      </div>
    )
  }
}

export default Email
