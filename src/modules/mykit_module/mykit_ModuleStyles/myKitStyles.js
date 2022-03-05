import {StyleSheet, Dimensions} from 'react-native'
import { colors } from '../../../../skjs_config/colors'
const deviceHeight = Math.round(Dimensions.get("window").height);
export const mykitstyles = StyleSheet.create({
    container: {
         marginHorizontal: 20, marginTop: 30 
    },
    primaryCardLabel: {
      width: "45%", fontWeight: "bold" 
    },
    PrimaryCardLabelValueContainer:{
        flexDirection: "row", margin: 10 
    },
    buttonsContainer: {
        flexDirection: "row",
        justifyContent: "space-around",
        marginVertical: 10,
      }
})