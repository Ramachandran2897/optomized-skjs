import {StyleSheet, Dimensions} from 'react-native'
import { colors } from '../../../../skjs_config/colors'
const deviceHeight = Math.round(Dimensions.get("window").height);
const deviceWidth = Math.round(Dimensions.get("window").width);
import {styles} from '../../Credencial_module/Cresencial_moduleStyles/landingPageStyles'
export const OrderSucessStyles = StyleSheet.create(
    {
        container: { margin: 20, flex: 1, zIndex: -1  },
        marginBetweenView: { marginVertical: 10 },
        totalamount: { position: "absolute", bottom: 10, right: deviceWidth/10, fontWeight: 'bold' }
}
)