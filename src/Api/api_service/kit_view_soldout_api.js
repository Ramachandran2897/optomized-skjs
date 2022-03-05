import axios from "axios"
const kidViewSoldoutApi = (empId, kitId, cusId)=>{
    return axios.get(
        `soldout?emp_id=${empId}&kit=${kitId}&cus_id=${cusId}`
      );
}
export default kidViewSoldoutApi
