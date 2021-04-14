import { useEffect, useState } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { getCart } from "../redux/cartReducer";


function Swag(props) {

  // const [productId, setId] = useRadioButtons("productId");

  const [select, setSelect] = useState(false);

  useEffect(() => {
    axios.get('/api/products')
      .then((res) => {
        console.log('products', res.data)
      })
  })

  function selector() {
    setSelect(true);
  }
  return (
    <h1>hey</h1>
  )
  // const addItem = (e) => {
  //   e.preventDefault();
  //   axios
  //     .post(`/api/cart/product/${productId}`)
  //     .then((res) => {
  //      props.history.push(`/cart/me`);
  //     })
  //     .catch((err) => console.log(err));
  // };
  // const handleChange = (e) => {
  //   setState(e.target.value);
  // };

}
const mapStateToProps = (state) => state;
export default connect(mapStateToProps, { getCart })(Swag);