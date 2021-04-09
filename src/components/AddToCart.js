import React from 'react'
import { useState, useEffect } from "react";

const CartItem = ({ product: { img, product_name, product_color, product_id, quantity: initialQuantity, product_price, product_size }, deleteProduct, editQuantity }) => {

  const [toggle, setToggle] = useState(false)
  const [quantity, setQuantity] = useState('1')
  const [priceChange, setPriceChange] = useState('')

  useEffect(() => {
    setPriceChange(product_price * quantity)
  }, [quantity])

  useEffect(() => {
    setQuantity(initialQuantity)
  }, [])

  return (
    <div className="cart-product-info">
      <div>
        <img className='cart-product-img' alt='' src={img} />
      </div>
      <h1 className='cart-product-name'>{product_name}</h1>
      <h2 className='cart-product-color'>{product_color}</h2>
      <h3 className='cart-product-size'>{product_size}</h3>
      <div className='cart-product-quantity'>
        {toggle ? (
          <div className='cart-quantity-options'>
            <ul style={{ listStyle: "none" }}>
              {[...Array(3).keys()].map((quantity) => (
                <li className="edit-quantity-dropdown" key={`input: ${quantity}`}>
                  <input
                    className="dropdown-item"
                    type="button"
                    value={quantity + 1}
                    onClick={() => {
                      editQuantity(product_id, quantity + 1)
                      setQuantity(quantity + 1)
                      setToggle(!toggle)
                    }}

                  />
                </li>
              ))}
            </ul>
          </div>
        ) : <div
          onClick={() => { setToggle(!toggle) }}
          className="cart-product-quantity-button"
          type="button"
        >
          {`${quantity}`}
        </div>}
      </div>
      <h2 className='cart-product-price'>${priceChange}.00</h2>
      <div className='cart-remove-button'>
        <button className='cart-item-remove-button' onClick={() => deleteProduct(product_id)}>Remove</button>
      </div>

    </div>
  );
};
export default CartItem