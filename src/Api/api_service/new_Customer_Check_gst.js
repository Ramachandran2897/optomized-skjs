import axios from "axios"
const newCustomerCheckOtpApi = (checkGst)=>{
    return axios.get(
        `checkgst?gst=${checkGst}`
      );
}
export default newCustomerCheckOtpApi