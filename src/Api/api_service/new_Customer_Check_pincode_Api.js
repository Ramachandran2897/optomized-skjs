import axios from "axios"
const newCustomerCheckPincodeApi = (pincode)=>{
    return axios.get(
        `getpincodes?pin=${pincode}`
      );
}
export default newCustomerCheckPincodeApi