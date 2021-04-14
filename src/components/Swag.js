import { useState } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { getCart } from "../../redux/cartReducer";

function Swag(props) {
  
  const [productId, setId] = useRadioButtons("productId");

  const [select, setSelect] = useState(false);

  function selector() {
    setSelect(true);
  }

  const addItem = (e) => {
    e.preventDefault();
    axios
      .post(`/api/cart/product/${productId}`)
      .then((res) => {
       props.history.push(`/cart/me`);
      })
      .catch((err) => console.log(err));
  };
 
    
}