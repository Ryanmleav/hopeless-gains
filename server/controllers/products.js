module.exports = {
  getAllProducts: async (req, res) => {
    const db = req.app.get('db');
    const products = await db.products.get_all_products();
    console.log(products)
    if (products) {
      res.status(200).send(products)
    } else {
      res.status(400).send('products not found')
    }
  },

  getOneProduct: async (req, res) => {
    const db = req.app.get('db')
    const { id } = req.params
    const product = await db.products.get_one_product(+id)
    console.log(product)
    if (product) {
      res.status(200).send(product)
    } else {
      res.status(400).send('unable to find product')
    }
  },

  getProductColor: async (req, res) => {
    const db = req.app.get('db')
    const { id } = req.params
    const product = await db.products.get_product_color(+id)
    console.log(product)
    if (product) {
      res.status(200).send(product)
    } else {
      res.status(400).send('color and image not available')
    }
  }
}