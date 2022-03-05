import * as redux from 'redux'
import { Employee_Login_Customer_Post_Data } from './EmployeeLoginCustomerTypes'
const loginData = {
    data: {}
}
export const EmployeeLoginReducer = (state = loginData, action)=>{
    switch(action.type){
        case Employee_Login_Customer_Post_Data : {
            return {...state, data: action.payload}
            break;
        }
        default: {
            return {...state}
        }
    }
}