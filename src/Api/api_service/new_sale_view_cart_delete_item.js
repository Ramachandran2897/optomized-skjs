import axios from "axios"
const newSaleViewDeleteItem = (cust_id, proid)=>{
    return axios.get(
        `removecart?cus_id=${cust_id}&proid=${proid}`
      );
}
export default newSaleViewDeleteItem