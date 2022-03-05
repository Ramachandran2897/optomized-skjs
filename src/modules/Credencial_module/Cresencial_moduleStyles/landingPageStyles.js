import {StyleSheet, Dimensions} from 'react-native'
import { colors } from '../../../../skjs_config/colors'
const deviceHeight = Math.round(Dimensions.get("window").height);
export const styles = StyleSheet.create({
    container: {
          justifyContent: "center",
          alignItems: "center",
          marginHorizontal: 30,
    },
    textField:{
         margin: 20, width: "80%" 
    }
})