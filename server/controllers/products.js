module.exports = {
  getAllProducts: async (req, res) => {
    const db = req.app.get('db');
    const products = await db.products.get_all_products();
    console.log(products)
    res.status(200).send(products)
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
  }
}