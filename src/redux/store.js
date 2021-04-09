import { createStore, applyMiddleware, combineReducers } from 'redux';
import promiseMiddleware from 'redux-promise-middleware';
import userReducer from './userReducer';
import cartReducer from './cartReducer';

const rootreducer = combineReducers({
  cart: cartReducer,
  user: userReducer
})

export default createStore(rootreducer, applyMiddleware(promiseMiddleware))