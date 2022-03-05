import axios from "axios"
const newSaleAddToCart = (empId, cus_id, sku, kitId)=>{
    return axios.get(
        `addtocartsku?emp_id=${empId}&cus_id=${cus_id}&sku=${sku}&kit=${kitId}`
      );
}
export default newSaleAddToCart

export const newSaleAddToCartScanner = (empId, cus_id, sku, kitId)=>{
  return axios.get(
      `addtocartscan?emp_id=${empId}&cus_id=${cus_id}&sku=${sku}&kit=${kitId}`
    );
}