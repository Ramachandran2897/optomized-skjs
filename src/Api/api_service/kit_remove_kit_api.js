import axios from "axios"
const kidReturnApi = (kitId)=>{
    return axios.get(
        `changereturnstatus?&kit=${kitId}`
      );
}
export default kidReturnApi