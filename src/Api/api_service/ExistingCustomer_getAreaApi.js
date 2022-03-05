import axios from "axios"
const existingCustomerGetAreaApi = (areaid)=>{
    return axios.get(
        `getareacustomer?areaid=${areaid}`
      );
}
export default existingCustomerGetAreaApi