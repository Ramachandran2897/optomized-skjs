import { AddCartValue } from "./AddtoCartToken";
const setAddtoCart  = (value)=>{
    return (dispatch) => {
        dispatch({ type: AddCartValue, data: value });
    }
}
export default setAddtoCart