import { useEffect, useState } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { getCart } from "../redux/cartReducer";


function Swag(props) {

  // const [productId, setId] = useState("productId");

  const [select, setSelect] = useState(false);

  let [productList, setProductList] = useState([]);

  let [colorList, setColorList] = useState([])

  useEffect(() => {
    axios.get('/api/products')
      .then((res) => {
        setProductList(res.data)
      })
  }, [])

  const productDetails = (e) => {
    let id = e.target.value
    axios.get(`/products/color/${id}`)
    .then((res) => {
      setColorList(res.data)
      console.log(res.data)
    })

  }

  // useEffect(() => {
  //   axios.get('')
  //   .then((res) => {
  //     setColorList(res.data)
  //   })
  // })

  function selector() {
    setSelect(true);
  }
  const mappedProducts = productList.map((e) => {
    return <option value={e.product_id}>{e.product_name} ${e.product_price}</option>
  })
  console.log(productList)
  // const mappedColors = colorList.map((e) => {
  //   return <option value={e.color_id}>{e.product_color}</option>
  // })
  return (
    <div className='swag' >
      <h3 className='swag-descr'>Swag Items</h3>
      <img className='swag-image' src='https://i.imgur.com/vBqjUKG.jpg'></img>
      <select className='swag-dropdown' placeholder='Swag items' onChange={productDetails}>{mappedProducts}
      </select>
      <select className='swag-color' placeholder='color'></select>
      <button className='add-swag' >Add Swag</button>
    </div>
  )
}

const mapStateToProps = (state) => state;
export default connect(mapStateToProps, { getCart })(Swag)

  // const addItem = (e) => {
  //   e.preventDefault();
  //   axios
  //     .post(`/api/cart/product/${productId}`)
  //     .then((res) => {
  //       // props.getCart();
  //       props.history.push(`/cart/me`);
  //     })
  //     .catch((err) => console.log(err));
  // };