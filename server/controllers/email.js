const nodemailer = require('nodemailer')

const {EMAIL, PASSWORD} = process.env

module.exports = {
  email: async (req, res) => {
    const {name, message, email, title} = req.body
    console.log(email)
  try{
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: EMAIL,
        pass: PASSWORD
      }
    });
    let info = await transporter.sendMail({
      from: `'${name}' <${email}>`,
      to: EMAIL,
      sunject: title,
      text: message
    }, (err, res) => {
      if(err){
        console.log('err', err)
      }else{
        console.log('res', res)
        res.status(200).send(info)
      }
    })
  } catch(err) {
    console.log(err)
    res.sendStatus(500)
  }
  }
}