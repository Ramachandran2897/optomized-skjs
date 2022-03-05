import axios from "axios"
const newCustomerCheckPhoneApi = (checkPhone)=>{
    return axios.get(
        `checkphone?phone=${checkPhone}`
      );
}
export default newCustomerCheckPhoneApi