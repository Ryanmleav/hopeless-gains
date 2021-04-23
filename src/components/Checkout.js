import { Link } from 'react-router-dom'
import StripeCheckout from "react-stripe-checkout"
import axios from "axios"
import React, { Component } from 'react'
const { REACT_APP_SECRET_KEY } = process.env


class Checkout extends Component {
  constructor(props) {
    super(props);
  }
  onToken = (token) => {
    console.log(token);
    // console.log(this.props.cartTotal)
    token.card = void 0;
    axios.post('/api/checkout', { token, price: (this.props.cartTotal) })
      .then(response => {
        alert('Transaction Successful')
      }).catch((err) => console.log(err))
    }
    
    render() {
      console.log(REACT_APP_SECRET_KEY)
      return (
      
      <div className='checkout-component'>
        <header>
          <h3 className='checkout-text'>Checkout</h3>
          <p className='checkout-total'>Show Order Summary: {this.props.cartTotal}</p>

        </header>

        <div className="stripeCheckout">
          <StripeCheckout
            description={"Hopeless Gains demo"}
            token={this.onToken}
            stripeKey={'pk_test_51Ie3gNHGyGBO6n8RUA1x7LIU5eFgAmn02IYwg8kA7hnyidX4hEiH6mDA9IWfDVc8HIidWH4XeBzAsxqKHpaXoz1600qenklH91'}
            amount={(this.props.cartTotal)}
          />
        </div>
        <Link to="/cart/me"><button className="continueShopping">Review Cart</button></Link>



      </div>
    )
  }
}
export default Checkout;

