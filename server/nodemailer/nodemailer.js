const nodemailer = require('nodemailer')
const dotenv = require('dotenv')
dotenv.config()

let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    // user: 'testingVideoMe@gmail.com',
    // pass: 'testing123!',
    user: process.env.EMAIL,
    pass: process.env.PASSWORD
  }
})

let mailOptions = {
  from: 'testingVideoMe@gmail.com',
  to: 'testingVideoMe@gmail.com',
  subject: 'testing',
  text: 'it works'
}

transporter.sendMail(mailOptions, function(error, data) {
  if (error) {
    console.log('unsuccessful at sending email', error)
  } else {
    console.log('email sent')
  }
})
