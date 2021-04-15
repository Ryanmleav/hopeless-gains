import { useEffect, useState } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { getCart } from "../redux/cartReducer";


function Swag(props) {

  const [productId, setId] = useState("productId");

  const [select, setSelect] = useState(false);

  let [productList, setProductList] = useState([]);

  useEffect(() => {
    axios.get('/api/products')
      .then((res) => {
        setProductList(res.data)
      })
  }, [])

  const addItem = (e) => {
    e.preventDefault();
    axios
      .post(`/api/cart/product/${productId}`)
      .then((res) => {
        // props.getCart();
        props.history.push(`/cart/me`);
      })
      .catch((err) => console.log(err));
  };



  function selector() {
    setSelect(true);
  }
  const mappedProducts = productList.map((e) => {
    return <option>{e.product_name}</option>
  })
  console.log(productList)
  // const mappedColors = productList.map((e) => {
  //   return 
  // })
  return (
    <div className='swag' >
      <h3 className='swag-descr'>Swag Items</h3>
      <img className='swag-image' src='https://imgur.com/vBqjUKG'></img>
      <select className='swag-dropdown' placeholder='Swag items'>{mappedProducts}
      </select>
      <select className='swag-color' placeholder='color'>
        <option>Black</option>
        <option>Red</option>
        <option>Blue</option>
        <option>Green</option>
        <option>Pink</option>
      </select>
      <button className='add-swag' onClick={(e) => addItem(e)}>Add Swag</button>
    </div>
  )
}

const mapStateToProps = (state) => state;
export default connect(mapStateToProps, { getCart })(Swag)