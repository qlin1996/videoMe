const router = require('express').Router()
const nodemailer = require('nodemailer')
const dotenv = require('dotenv')
dotenv.config()
module.exports = router

router.post('/', (req, res, next) => {
  try {
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
      }
    })

    let mailOptions = {
      from: 'testingVideoMe@gmail.com',
      to: req.body.email,
      subject: 'Your Friend is Waiting on VideoMe',
      text: `Your friend has invited you to a video call. Join here ${
        req.body.link
      }.`
    }

    transporter.sendMail(mailOptions, function(error) {
      if (error) {
        console.log('unsuccessful at sending email', error)
      } else {
        console.log('email has been sent sucessfully')
      }
    })

    res.send('email has been sent sucessfully')
  } catch (error) {
    next(error)
  }
})
