import axios from "axios"
const newSaleOtpRequest = (empId, mobileNumber)=>{
    return axios.get(
        `customerlogin?emp_id=${empId}&mobile=${mobileNumber}`
      );
}
export default newSaleOtpRequest