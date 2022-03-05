import axios from "axios"
const newSaleUserStatus = (phone)=>{
    return axios.get(
        `checkusrstatus?phone=${phone}`
      );
}
export default newSaleUserStatus