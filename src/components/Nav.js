import { Link } from 'react-router-dom'
import { useState } from "react"
import { logoutUser } from '../redux/userReducer'

const Nav = ({ logoutUser, user }) => {

  const [toggle, setToggle] = useState(false)


  function cartDropdown() {
    setToggle(!toggle)
  }
  return (
    <div className='nav-component'>

      <Link className='dashboard-button' to='/'>Home</Link>
      <Link to={`/swag`}>Swag</Link>
      <Link to={`/email`}>Contact Us</Link>

      <div className='nav-cart-dropdown'>
        <button onClick={cartDropdown} className='cart-dropdown' icon='#9776'></button>
        {toggle ?
          <div className='dropdown-content'>
            <Link onClick={() => { setToggle(!toggle) }} className='dropdown-link' to={`/cart`}>Check Out</Link>
            <Link onClick={() => { setToggle(!toggle) }} className='dropdown-link' to={`/cart`}>Cart</Link>
            <Link onClick={() => { setToggle(!toggle) }} className='dropdown-link' to={'/register'}>Register</Link>

            {!user.isLoggedIn
              ? (<Link onClick={() => { setToggle(!toggle) }} className='dropdown-link' to={`/auth`}>Sign in </Link>)
              : (<Link onClick={() => {
                logoutUser()
                setToggle(!toggle)
              }}
                className='dropdown-link'
                to={`/auth`}>Sign Out</Link>)}
          </div>
          : null}
      </div>

    </div>
  )
}

const mapStateToProps = (state) => state;
export default connect(mapStateToProps, { logoutUser })(Nav);