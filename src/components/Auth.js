import { useState } from 'react'
import { Link } from 'react-router-dom'
import { getUser } from '../redux/userReducer'
import { connect } from 'react-redux'
import axios from 'axios'
import { useHistory } from 'react-router-dom'

const Auth = ({ getUser }) => {
  const [state, setState] = useState({
    email: '',
    password: ''
  })

  const history = useHistory()

  const loginUser = async (e) => {
    e.preventDefault()
    const { email, password } = state

    try {
      const user = await axios.post('/auth/login', { email, password })
      getUser(user.data)
      history.push('/')
    } catch (err) {
      console.log(err)
    }
  }
  const changeHandler = e => setState({
    ...state,
    [e.target.name]: e.target.value
  })
  return (
    <div className='auth-component'>
      <h1 className='auth-title'>Sign In</h1>
      <form className='auth-sign-in' onSubmit={(e => loginUser(e))}>
        <input
          className='auth-input-email'
          placeholder='Hopless Gains ID'
          name='email'
          onChange={(e) => changeHandler(e)}
        />
        <input
          className='auth-inout-password'
          placeholder='Password'
          name='password'
          onChange={(e) => changeHandler(e)}
        />
        <section>
          <p className='auth-reminder'>Your Hopeless Gains ID is your email you used to register</p>
        </section>
        <button className='sign-in-button' type='submit'>Sign in</button>
      </form>
      <p className='auth-forgot'>Forgot your email or password</p>
      <Link className='registration-link' to={'/register'}>No Hopeless Gains ID? Create one</Link>
    </div>
  )
}

const mapStateToProps = (state) => state;
export default connect(mapStateToProps, { getUser })(Auth)