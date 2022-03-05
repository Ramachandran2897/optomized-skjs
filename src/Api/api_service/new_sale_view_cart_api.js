
import axios from "axios"
const newSaleViewCart = (empId, cus_id)=>{
    return axios.get(
        `viewcart?emp_id=${empId}&cus_id=${cus_id}`
      );
}
export default newSaleViewCart