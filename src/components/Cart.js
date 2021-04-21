import React from 'react'
import { connect } from 'react-redux';
import { useCallback, useEffect, useState } from "react";
import { getCart } from '../redux/cartReducer'
import axios from 'axios'
import AddToCart from './AddToCart'
import { Link } from 'react-router-dom';
import StripeCheckout from 'react-stripe-checkout';

const Cart = (props) => {
  const { getCart } = props
console.log(props)

  // const [quantity, setQuantity] = useState(1)
  const [cart, setCart] = useState([])
  // const [toggle, setToggle] = useState(false)
  const [cartTotal, setCartTotal] = useState(0)

  const total = useCallback(() => {
    let totalVal = 0;
    for (let i = 0; i < props.cart.cart.length; i++) {
      totalVal += props.cart.cart[i].product_price * props.cart.cart[i].quantity
    }
    setCartTotal(totalVal)
  }, [props.cart.cart])



  const editQuantity = async (color_id, quantity) => {
    // console.log(quantity)
    // console.log(product_id)
    try {
      await axios.put(`/api/cart/product/${color_id}`, { quantity }
      )
      props.getCart()
    } catch (error) {
      console.log(error)
    }
  }

  const deleteProduct = async (colorId) => {

    try {
      const cart = await axios.delete(`/api/cart/product/${colorId}`)
      setCart(cart.data)
      props.getCart()
    } catch (error) {
      console.log(error)
    }
    console.log("DELETE")
  }

  useEffect(() => {
    console.log('HIT')
    props.getCart()
    total()
  }, [getCart])

  useEffect(() => {
    console.log(props.cart.cart)

  }, [props.cart.cart])

  const mappedCart = props.cart.cart.map((product) => {
    return <AddToCart
      key={product.product_id} 
      product={product}
      deleteProduct={deleteProduct}
      editQuantity={editQuantity}
    />
  })

  const onToken = (token) => {
    console.log(token);
    console.log(props.cartTotal)
    token.card = void 0;
    axios.post('/api/checkout', { token, price: (props.cartTotal) })
      .then(response => {
        alert('Transaction Successful')
      }).catch((err) => console.log(err))
  }
  return (
    <div className='cart-component'>
      <h1 className='cart-review-text'>Swag List</h1>
      <h4 className='cart-return-text'>Free delivery and returns</h4>
      <ul style={{ listStyle: 'none' }}>{mappedCart}</ul>
      <div className='cart-total'>
        <div className='cart-total-text'>Total:</div>
        <div className='cart-total-number'> ${cartTotal}</div>
      </div>
      <div className="stripeCheckout">
        <Link to={'/ordercomplete'}><StripeCheckout
          description={"Hopeless Gains checkout"}
          token={onToken}
          stripeKey={process.env.REACT_APP_PUB_KEY}
          amount={(props.cartTotal)}
        /></Link>
      </div>

    </div>
  )
}

const mapStateToProps = (state) => state;
export default connect(mapStateToProps, { getCart })(Cart)
