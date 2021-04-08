module.exports = {
  getCartByUser: async (req, res) => {
    const db = req.app.get('db')
    const { user_id } = req.session.user

    try {
      const cart = await db.cart.get_cart_by_user([+user_id])
      res.status(200).send(cart)
    } catch (err) {
      console.log('cart unavailable', err)
      res.sendStatus(500)
    }
  },

  editProductInCart: async (req, res) => {
    const db = req.app.get('db')
    const { id } = req.params
    const { quanity } = req.body
    const { user_id } = req.session.user

    try {
      const cart = await db.cart.edit_product_in_cart([+user_id, +id, +quanity])
      res.status(200).send(cart)
    } catch (err) {
      console.log('unable to edit cart', err)
      res.sendStatus(500)
    }
  },

  addProductToCart: async (req, res) => {
    const db = req.app.get('db')
    const { id } = req.params
    const { quanity } = req.body
    const { user_id } = req.session.user

    try {
      const cart = await db.cart.add_product_to_cart([+user_id, +id, +quanity])
      console.log('Success')
      res.status(200).send(cart)
    } catch (err) {
      console.log('there was a problem adding to the cart', err)
      res.sendStatus(500)
    }
  },

  deleteProductInCart: async (req, res) => {
    const db = req.app.get('db')
    const { id } = req.params

    try {
      const cart = await db.cart.delete_product_from_cart(+id)
      res.status(200).send(cart)
    } catch (err) {
      console.log(`Could not delete item in cart`, err)
      res.sendStatus(500)
    }
  }
}