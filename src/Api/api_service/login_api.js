import axios from "axios"
const loginApi = (username, password)=>{
    return axios.get(
        `login?username=${username}&password=${password}`
      );
}
export default loginApi