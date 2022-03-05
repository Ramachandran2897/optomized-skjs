import {set_Employee_Login_Customer_Token, set_Employee_Login_Customer_remove_Token} from "./EmployeeLoginCustomerTokenTypes"
const EmployeeLoginCustomerTokenReducer = (state = '', action) => {
    switch (action.type) {
        case set_Employee_Login_Customer_Token:
            return action.data;
            break;
        case set_Employee_Login_Customer_remove_Token:
            return action.data;
            break;
        default:
            return state;
    }
}

export default EmployeeLoginCustomerTokenReducer;