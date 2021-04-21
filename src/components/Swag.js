import { useEffect, useState } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { getCart } from "../redux/cartReducer";


function Swag(props) {

  // const [productId, setId] = useState("productId");

  // const [select, setSelect] = useState(false);

  let [productList, setProductList] = useState([]);

  let [colorList, setColorList] = useState([]);

  let [color, setColor] = useState(0);

  let [quantity, setQuantity] = useState([])

  useEffect(() => {
    axios.get('/api/products')
      .then((res) => {
        setProductList(res.data)

        let id = res.data[0].product_id
        // console.log(id)
        axios.get(`/products/color/${id}`)
          .then((res) => {
            setColorList(res.data)
          })
      })
  }, [])



  const productDetails = (e) => {
    let id = e.target.value
    axios.get(`/products/color/${id}`)
      .then((res) => {
        setColorList(res.data)

      })
  }

  const selectColor = (e) => {
    let id = e.target.value
    console.log(+id)
    let index = colorList.findIndex((elem) => elem.color_id === +id)

    setColor(index)
  }

  const addItem = (e) => {
    e.preventDefault();
    console.log(colorList[color])
    console.log({ color })

    axios
      .post('/api/cart/product', { colorId: colorList[color].color_id, quantity })
      .then((res) => {
        console.log(res.data)
        // props.getCart();
        props.history.push(`/cart`);
      })
      .catch((err) => console.log(err));
  };



  // function selector() {
  //   setSelect(true);
  // }
  const mappedProducts = productList.map((e) => {
    return <option key={e.product_id} value={e.product_id}>{e.product_name} ${e.product_price}</option>
  })

  const mappedColors = colorList.map((e) => {
    return <option key={e.color_id} value={e.color_id}>{e.product_color}</option>
  })
  console.log(colorList)
  return (
    <div className='swag' >
      <h3 className='swag-descr'>Swag Items</h3>
      {colorList.length > 0 ? <img className='swag-image' src={colorList[color].img} alt={colorList[color].product_color}></img> : <div></div>}
      {/* <img className='swag-image' src={colorList[color].img}></img> */}
      <select className='swag-dropdown' placeholder='Swag items' onChange={productDetails}>{mappedProducts}
      </select>
      <select className='swag-color' placeholder='color' onChange={selectColor}>{mappedColors}</select>
      <input className='quanity-box' placeholder='quantity' type='number' onChange={(e) => setQuantity(e.target.value)}></input>
      <button className='add-swag' onClick={(e) => addItem(e)}>Add Swag</button>
    </div>
  )
}


const mapStateToProps = (state) => state;
export default connect(mapStateToProps, { getCart })(Swag)

