import axios from "axios"
const newSaleViewGroupCart = (empId, cus_id, kitId)=>{
    return axios.get(
        `groupcart?emp_id=${empId}&cus_id=${cus_id}&kit=${kitId}`
      );
}
export default newSaleViewGroupCart