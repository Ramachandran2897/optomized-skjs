import axios from "axios"
const newCustomerRegisterApi = (mobilenumber, usename, gst, address1, address2, postcode)=>{
    return axios.get(
        `usrregister?reg_mobile_number=${mobilenumber}&reg_user_name=${usename}&reg_gst=${gst}&reg_address1=${address1}&reg_address2=${address2}&reg_postcode=${postcode}`
      );
}
export default newCustomerRegisterApi