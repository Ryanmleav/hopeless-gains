import { Switch, Route } from 'react-router-dom'
import Home from './Components/Home'
import Auth from './Components/Auth'
import Registration from './Components/Register'
import Cart from './Components/Cart'
import Checkout from './Components/Checkout'
import Email from './Components/Email'

export default (
  <Switch>
    <Route exact path='/' component={Home} />
    <Route path='/auth' component={Auth} />
    <Route path='/register' component={Registration} />
    <Route path='/cart' component={Cart} />
    <Route path='/checkout' component={Checkout} />
    <Route path='/email' component={Email} />
  </Switch>
)