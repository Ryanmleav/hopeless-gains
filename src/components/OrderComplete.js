import React from 'react'
import { Link } from 'react-router-dom'

const OrderComplete = (props) => {
  return (
    <section>
      <h1>Thanks for your support!</h1>
      <p>
        We appreciate your business!
      </p>
      <Link to={'/api/email'}>Send Email Confirmation</Link>
    </section>
  )
}

export default OrderComplete;