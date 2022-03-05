import {SHOW_LOADER, HIDE_LOADER} from './loaderTypes'
export const LoaderAction = (bool)=>{
    return (dispatch) => {
        dispatch(bool ? {
            type:SHOW_LOADER,
            data:bool
          }: {
            type: HIDE_LOADER,
            data: bool
          });
    }
  }
  export default LoaderAction;