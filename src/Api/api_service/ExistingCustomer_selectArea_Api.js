import axios from "axios"
const existingCustomerAreaApi = (area)=>{
    return axios.get(
        `getarea?area=${area}`
      );
}
export default existingCustomerAreaApi