import axios from "axios"
const existingCustomerLoginApi = (user_id)=>{
    return axios.get(
        `areacustomerlogin?usr_id=${user_id}`
      );
}
export default existingCustomerLoginApi