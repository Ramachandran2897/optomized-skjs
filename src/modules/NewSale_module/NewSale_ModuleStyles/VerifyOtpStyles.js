import {StyleSheet, Dimensions} from 'react-native'
import { colors } from '../../../../skjs_config/colors'
const deviceHeight = Math.round(Dimensions.get("window").height);
import {styles} from '../../Credencial_module/Cresencial_moduleStyles/landingPageStyles'
export const VerifyOtpStyles = StyleSheet.create(
    {...styles}
)