import { Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import loginApi from "../../Api/api_service/login_api";
import setUserTokenAction from "../UserToken/UserTokenAction";

const LoginAction = (username, password) => {
  return (dispatch) => {
      loginApi(username, password)
      .then(async (res) => {
        // handle success
        if (res.status === 200 && res.data.success) {
          await Promise.all([
             AsyncStorage.setItem("userToken", "hello world"),
             AsyncStorage.setItem("Login", JSON.stringify(res.data))
         ])
          // dispatch({ type: Post_Data, payload: res.data });
        //   console.log('token', JSON.parse(await AsyncStorage.getItem("userToken")))
          dispatch(
            setUserTokenAction(await AsyncStorage.getItem("userToken"))
          );
        } else if (res.data.error) {
          Alert.alert("Failed", "invalid username or password"), [{ text: "Okay" }];
          return;
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
};
export default LoginAction;
