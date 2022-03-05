import {set_Employee_Login_Customer_Token} from "./EmployeeLoginCustomerTokenTypes"
const setEmployeeLoginCustomerTokenAction  = (props)=>{
    const [token] = [...props]
    return (dispatch) => {
        dispatch({ type: set_Employee_Login_Customer_Token, data: token });
    }
}
export default setEmployeeLoginCustomerTokenAction