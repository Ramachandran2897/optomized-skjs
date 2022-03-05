import * as redux from 'redux'
import RootReducer from './rootReducer'
import thunk from 'redux-thunk'
 
const store = redux.createStore(RootReducer, redux.applyMiddleware(thunk));
export default store; 