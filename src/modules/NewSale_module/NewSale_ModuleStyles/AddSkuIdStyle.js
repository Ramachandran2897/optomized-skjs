import {StyleSheet, Dimensions} from 'react-native'
import { colors } from '../../../../skjs_config/colors'
const deviceHeight = Math.round(Dimensions.get("window").height);
import {styles} from '../../Credencial_module/Cresencial_moduleStyles/landingPageStyles'
export const SkuidStyles = StyleSheet.create(
    {
        container: { margin: 20, flex: 1 },
        marginBetweenView: { marginVertical: 10 },
        skuidinputContainer:{ justifyContent: "center", alignItems: "center" }
}
)