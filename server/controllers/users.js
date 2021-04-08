const bcrypt = require('bcryptjs')

module.exports = {
  registerUser: async (req, res) => {
    const db = req.app.get('db')
    const { firstName, lastName, email, password, phoneNumber } = req.body
    try {
      const [foundUser] = await db.user.get_user(email)
      if (foundUser) {
        res.status(401).send('Sorry account already exists')
      } else {
        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(password, salt)
        const [newUser] = await db.user.register_user([firstName, lastName, email, hash, phoneNumber])
        delete newUser.password
        console.log(newUser)
        req.session.user = newUser
        res.status(200).send(req.session.user)
      }
    } catch (err) {
      console.log('Database error on register function', err)
    }
  },

  loginUser: async (req, res) => {
    const db = req.app.get('db')
    const { email, password } = req.body

    try {
      const [foundUser] = await db.user.get_user(email)
      if (foundUser) {
        const comparePassword = foundUser.password
        const authenticated = bcrypt.compareSync(password, comparePassword)
        if (authenticated) {
          delete foundUser.password
          req.session.user = foundUser
          console.log(req.session.user)
          res.status(200).send(req.session.user)
        } else {
          res.status(401).send('Incorrect email or password')
        }
      } else {
        res.status(401).send('foundUser issue incorrect email or password')
      }
    } catch (err) {
      console.log('database error on login function', err)
    }
  },

  logoutUser: (req, res) => {
    req.session.destroy();
    res.sendStatus(200)
  },

  getUser: (req, res) => {
    res.status(200).send(req.session.user)
  },
}
