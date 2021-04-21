import React from "react";
import { useState, useEffect } from "react";

const CartItem= (
  props
  //   {
  //   product: {
  //     img,
  //     product_color,
  //     product_id,
  //     product_price,
  //     product_size,
  //   },
  // deleteProduct,
  //   editQuantity,
  // }
) => {
  const [toggle, setToggle] = useState(false);
  const [quantity, setQuantity] = useState(props.product.quantity);
  const [priceChange, setPriceChange] = useState("");

  // useEffect(() => {
    // setPriceChange(props.product.product_price * quantity);
  // }, [quantity]);

  useEffect(() => {
    // setQuantity(initialQuantity);
  }, []);
  // console.log(props.product);
  return (
    <div className="cart-product-info">
      <div>
        <img
          className="cart-product-img"
          alt="product"
          src={props.product.img}
        />
      </div>
      
      <div className="cart-product-quantity">
        {toggle ? (
          <div className="cart-quantity-options">
            <ul style={{ listStyle: "none" }}>
              {[...Array(3).keys()].map((quantity) => (
                <li
                  className="edit-quantity-dropdown"
                  key={`input: ${quantity}`}
                > {console.log(quantity)}
                  <input
                    className="quanitiy"
                    type="button"
                    value={quantity + 1}
                    onClick={() => {
                      // editQuantity(product_id, quantity + 1);
                      setQuantity(quantity + 1);
                      setToggle(!toggle);
                    }}
                  />
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <div
            onClick={() => {
              setToggle(!toggle);
            }}
            className="cart-product-quantity-button"
            type="button"
          >
            {`${quantity}`}
          </div>
        )}
      </div>
      <h2 className="cart-product-price">${props.product.product_price}</h2>
      <div className="cart-remove-button">
        <button
          className="cart-item-remove-button"
          onClick={() => props.deleteProduct(props.product.color_id)}
        >
          Remove
        </button>
      </div>
    </div>
  );
};
export default CartItem;
