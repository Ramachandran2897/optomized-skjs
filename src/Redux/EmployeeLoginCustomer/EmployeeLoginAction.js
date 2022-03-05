import { Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import newSaleOtpValidation from "../../Api/api_service/new_sale_otp_validation";
import setAddtoCart from "../AddtoCart/AddtoCartAction"
import setEmployeeLoginCustomerTokenAction from "../EmployeeLoginCustomerToken/EmployeeLoginCustomerTokenAction"

const EmployeeLoginAction = (mobilenumber, otp) => {
  return (dispatch) => {
    newSaleOtpValidation(
      mobilenumber,
      otp
    ).then(async (res) => {
      if (res.status === 200 && res.data.success) {
        await Promise.all([
           AsyncStorage.setItem("EmployeeLoginCustomerToken", "EmployeeLoginCustomerToken"),
           AsyncStorage.setItem("EmployeeLoginCustomer", JSON.stringify(res.data)),
           AsyncStorage.setItem("cartValues", JSON.stringify(res.data.count_cart))
        ]);
        dispatch(setAddtoCart(res.data.count_cart))
        dispatch(setEmployeeLoginCustomerTokenAction(await AsyncStorage.getItem("EmployeeLoginCustomerToken")));
      } else {
        Alert.alert("Failed", "invalid OTP", [
          { text: "OK", onPress: () => console.log("OK Pressed") },
        ]);
      }
    }).catch((err) => {
        console.log(err);
      });
  };
};
export default EmployeeLoginAction;
