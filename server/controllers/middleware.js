module.exports = {
  checkUser: async (req, res, next) => {
    if (req.session.user) {
      next()
    } else {
      res.status(403).send('your not logged in')
    }
  }
}