import {StyleSheet, Dimensions} from 'react-native'
import { colors } from '../../../../skjs_config/colors'
const deviceHeight = Math.round(Dimensions.get("window").height);
export const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        marginHorizontal: 30,
    },
    containerPrimaryButton:{
        flexDirection: "row",
        justifyContent: "space-around",
        flexWrap: "wrap",
    }
})