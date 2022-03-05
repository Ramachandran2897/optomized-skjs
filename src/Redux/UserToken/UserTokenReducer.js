import { set_Token, remove_Token } from "./UserTokenTypes";
const UserTokenReducer = (state = '', action) => {
    switch (action.type) {
        case set_Token:
            return action.data;
            break;
        case remove_Token:
            return action.data;
            break;
        default:
            return state;
    }
}

export default UserTokenReducer;