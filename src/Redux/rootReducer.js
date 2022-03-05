import * as redux from 'redux'
import { LoginReducer } from './Login/LoginReducer';
import UserTokenReducer from './UserToken/UserTokenReducer';
import LoaderReducer from './loader/LoaderReducer';
import EmployeeLoginCustomerTokenReducer from './EmployeeLoginCustomerToken/EmployeeLoginCustomerTokenReducer';
import { EmployeeLoginReducer } from './EmployeeLoginCustomer/EmployeeLoginCustomerReducer';
import AddtoCartReducer from './AddtoCart/AddtoCartReducer';
const RootReducer = redux.combineReducers({
    Login: LoginReducer,
    Token: UserTokenReducer,
    Loader: LoaderReducer,
    EmployeeLoginCustomerToken: EmployeeLoginCustomerTokenReducer,
    EmployeeLogin: EmployeeLoginReducer,
    CartValue: AddtoCartReducer
    })
export default RootReducer;
