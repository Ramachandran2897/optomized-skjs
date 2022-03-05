import axios from "axios"
const newCustomerOtpvalidationApi = (mobilenumber, otpVal)=>{
    return axios.get(
        `usrregisterverify?mobile=${mobilenumber}&otp_val=${otpVal}`
      );
}
export default newCustomerOtpvalidationApi