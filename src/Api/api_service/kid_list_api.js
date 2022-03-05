import axios from "axios"
const kidListApi = (empId)=>{
    return axios.get(
        `kitlist?emp_id=${empId}`
      );
}
export default kidListApi