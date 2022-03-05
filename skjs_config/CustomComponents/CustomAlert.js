import {
    Alert,
  } from "react-native";
const customAlert = (props)=>{
    const {heading, description, successText, cancelText, onPress} = props
    Alert.alert(heading, description, [
      successText && { text: successText, onPress: onPress},
      cancelText && {text: cancelText, },
      ]);
}
export default customAlert