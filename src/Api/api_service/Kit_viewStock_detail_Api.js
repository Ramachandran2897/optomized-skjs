import axios from "axios"
const kitStockDetailApi = (empId, kitId)=>{
    return axios.get(
        `viewstockdetail?emp_id=${empId}&kit=${kitId}`
      );
}
export default kitStockDetailApi
