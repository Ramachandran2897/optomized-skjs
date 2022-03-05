import * as redux from 'redux'
import {Post_Data} from './LoginTypes'
const loginData = {
    data: {}
}
export const LoginReducer = (state = loginData, action)=>{
    switch(action.type){
        case Post_Data : {
            return {...state, data: action.payload}
            break;
        }
        default: {
            return {...state}
        }
    }
}