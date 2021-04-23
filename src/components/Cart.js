import React from "react";
import { connect } from "react-redux";
import { useEffect, useState } from "react";
import { getCart } from "../redux/cartReducer";
import axios from "axios";
import { Link } from "react-router-dom";
import StripeCheckout from "react-stripe-checkout";
import CartItem from "./CartItem";

const Cart = (props) => {
  const { getCart } = props;

  // const [quantity, setQuantity] = useState(1)
  const [cart, setCart] = useState([]);

  const editQuantity = async (color_id, quantity) => {
    try {
      await axios.put(`/api/cart/product/${color_id}`, { quantity });
      props.getCart();
    } catch (error) {
      console.log(error);
    }
  };

  const deleteProduct = async (color_id) => {
    try {
      const cart = await axios.delete(`/api/cart/product/${color_id}`);

      props.getCart();
    } catch (error) {
      console.log(error);
    }
    console.log("DELETE");
  };

  useEffect(() => {
    props.getCart();
  }, []);

  useEffect(() => {
    console.log(props.cart.cart);
  }, [props.cart.cart]);

  const mappedCart = props.cart.cart.map((product) => {
    return (
      <CartItem
        key={product.product_id}
        product={product}
        deleteProduct={deleteProduct}
        editQuantity={editQuantity}
      />
    );
  });
  const reducer = (acc, curr) => acc + curr.product_price * curr.quantity;
  const total = props.cart.cart.reduce(reducer, 0);
  console.log(total);

  const onToken = (token) => {
    console.log(token);
    console.log(props.cartTotal);
    token.card = void 0;
    axios
      .post("/api/checkout", { token, price: props.cartTotal })
      .then((response) => {
        alert("Transaction Successful");
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="cart-component">
      <h1 className="cart-review-text">Swag List</h1>
      <h4 className="cart-return-text">Free delivery and returns</h4>
      <ul style={{ listStyle: "none" }}>{mappedCart}</ul>
      <div className="cart-total">
        <div className="cart-total-text">Total:</div>
        <div className="cart-total-number"> ${total}</div>
      </div>
      <div className="stripeCheckout">
        <Link to={"/ordercomplete"}>
          <StripeCheckout
            description={"Hopeless Gains checkout"}
            token={onToken}
            stripeKey="pk_test_51Ie3gNHGyGBO6n8RUA1x7LIU5eFgAmn02IYwg8kA7hnyidX4hEiH6mDA9IWfDVc8HIidWH4XeBzAsxqKHpaXoz1600qenklH91"
            amount={props.cartTotal}
          />
        </Link>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => state;
export default connect(mapStateToProps, { getCart })(Cart);
