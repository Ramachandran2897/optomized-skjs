import axios from "axios"
const newSaleOtpValidation = (mobileNumber, otp)=>{
    return axios.get(
        `checkcustomerotp?mobile=${mobileNumber}&otp=${otp}`
      );
}
export default newSaleOtpValidation
