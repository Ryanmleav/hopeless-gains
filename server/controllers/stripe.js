module.exports = {
  makePayment: (req, res) => {
    const stripe = req.app.get("stripe")
    const { token, amount } = req.body
    console.log(token)
    stripe.charges.create(
      {
        amount,
        currency: "usd",
        source: token.id,
        description: "this is a test",
        api_key: process.env.SECRET_KEY
      },
      (err, charge) => {
        if (err) {
          console.log(err.message)
          return res.sendStatus(500)
        }
        console.log(charge)
        return res.sendStatus(200)
      }
    )
  },
}