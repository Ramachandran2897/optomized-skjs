const LoaderReducer = (state = false, action) => {
    switch (action.type) {
        case "SHOW_LOADER":
            return action.data;
            break;
        case "HIDE_LOADER":
            return action.data;
            break;
        default:
            return state;
    }
}

export default LoaderReducer;