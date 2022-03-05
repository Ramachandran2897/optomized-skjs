import { set_Token, remove_Token } from "./UserTokenTypes";
const setUserTokenAction  = (props)=>{
    const [token] = [...props]
    console.log('setToken', token);
    return (dispatch) => {
        dispatch({ type: set_Token, data: token });
    }
}
export default setUserTokenAction