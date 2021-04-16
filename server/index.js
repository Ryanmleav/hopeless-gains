require('dotenv').config();
const express = require('express');
const massive = require('massive');
const session = require('express-session');
const nodemailer = require('nodemailer');
const userCtrl = require('./controllers/users')
const productCtrl = require('./controllers/products')
const cartCtrl = require('./controllers/cart')
const emailCtrl = require('./controllers/email');
const { checkUser } = require('./controllers/middleware')
const stripeCtrl = require('./controllers/stripe')


const { SERVER_PORT, CONNECTION_STRING, SESSION_SECRET, SECRET_KEY } = process.env;
const stripe = require('stripe')(SECRET_KEY);


const app = express();

app.use(express.json());
app.set('stripe', stripe)

app.use(session({
  resave: false,
  saveUninitialized: true,
  secret: SESSION_SECRET,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24
  }
}));

massive({
  connectionString: CONNECTION_STRING,
  ssl: {
    rejectUnauthorized: false
  }
}).then(dbInstance => {
  app.set('db', dbInstance)
  app.listen(SERVER_PORT, () => console.log(`Server & db is running ${SERVER_PORT}`));
})
  .catch(err => console.log(err));

//ENDPOINTS - USER
app.post('/auth/register', userCtrl.registerUser)
app.post('/auth/login', userCtrl.loginUser)
app.post('/auth/logout', userCtrl.logoutUser)
app.get('/auth/me', checkUser, userCtrl.getUser)

//ENDPOINTS - PRODUCTS
app.get('/api/products', productCtrl.getAllProducts)
app.get('/products/:id', productCtrl.getOneProduct)
app.get('/products/color/:id', productCtrl.getProductColor)

//ENDPOINTS - CART
app.get('/api/cart/me', cartCtrl.getCartByUser)
app.post('/api/cart/product', cartCtrl.addProductToCart)
app.put('/api/cart/product/:id', cartCtrl.editProductInCart)
app.delete('/api/cart/product/:id', cartCtrl.deleteProductInCart)

//NODEMAILER
app.post('/api/email', emailCtrl.email)

//STRIPE
app.post('/api/payment', stripeCtrl.makePayment)


