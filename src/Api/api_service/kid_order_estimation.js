import axios from "axios"
const kidOrderList = (orderId, cus_id)=>{
    return axios.get(
        `getorderest?order_id=${orderId}&cus_id=${cus_id}`
      );
}
export default kidOrderList