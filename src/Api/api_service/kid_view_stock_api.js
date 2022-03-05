import axios from "axios"
const kidViewStockApi = (empId, kitId)=>{
    return axios.get(
        `kitstock?emp_id=${empId}&kit=${kitId}`
      );
}
export default kidViewStockApi