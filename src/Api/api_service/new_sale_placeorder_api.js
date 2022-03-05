import axios from "axios"
const newSalePlaceOrder = (empId, cus_id)=>{
    return axios.get(
        `placeorder?emp_id=${empId}&cus_id=${cus_id}`
      );
}
export default newSalePlaceOrder

export const newSaleOrderDetailApi = (orderId, cust_id)=>{
  return axios.get(`orderdetails?order_id=${orderId}&cus_id=${cust_id}`)
}