import { AddCartValue } from "./AddtoCartToken";
const AddtoCartReducer = (state = '', action) => {
    switch (action.type) {
        case AddCartValue:
            return action.data;
            break;
        default:
            return state;
    }
}

export default AddtoCartReducer;