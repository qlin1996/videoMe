const router = require('express').Router()
const nodemailer = require('nodemailer')
const dotenv = require('dotenv')
dotenv.config()
module.exports = router

// POST /email
router.post('/', (req, res, next) => {
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD
    }
  })

  let mailOptions = {
    from: process.env.EMAIL,
    to: req.body.email,
    subject: 'Your Friend is Waiting on VideoMe',
    text: req.body.message
  }

  transporter.sendMail(mailOptions, function(error) {
    if (error) {
      console.log('unsuccessful at sending email', error)
    } else {
      console.log('email has been sent sucessfully')
      res.sendStatus(204)
    }
  })
})
