import { Link } from 'react-router-dom'
import { useState } from "react"
import { logoutUser } from '../redux/userReducer'
import { connect } from 'react-redux'

const Nav = ({ logoutUser, user }) => {

  const [toggle, setToggle] = useState(false)

console.log(user)
  function cartDropdown() {
    setToggle(!toggle)
  }
  return (
    <div className='nav-component'>

      <Link className='dashboard-button' to='/'>Home</Link>
      <Link className='dashboard-button' to={`/swag`}>Swag</Link>
      {!user.isLoggedIn
        ? (<Link  className='dashboard-button' to={`/auth`}>Sign in </Link>)
        : (<Link onClick={() => {
          logoutUser()
          setToggle(!toggle)
        }}
          className='dashboard-button'
          to={`/auth`}>Sign Out</Link>)}
      <Link className='dashboard-button' to={'/register'}>Register</Link>

      <div className='nav-cart-dropdown'>
        <button onClick={cartDropdown} className='cart-dropdown' >☰</button>
        {toggle ?
          <ul className='dropdown-content'>
            <li>
           <Link onClick={() => { setToggle(!toggle) }} className='dropdown-link' to={`/checkout`}>Check Out</Link>
           </li>
            <li><Link onClick={() => { setToggle(!toggle) }} className='dropdown-link' to={`/cart`}>Cart</Link>
            </li>
            <li><Link onClick={() => { setToggle(!toggle) }} className='dropdown-link' to={`/email`}>Contact Us</Link>
            </li>
          </ul>
          : null}
      </div>

    </div>
  )
}

const mapStateToProps = (state) => state;
export default connect(mapStateToProps, { logoutUser })(Nav);