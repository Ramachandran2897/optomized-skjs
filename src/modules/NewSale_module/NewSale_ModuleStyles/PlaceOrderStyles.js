import { mykitstyles } from '../../mykit_module/mykit_ModuleStyles/myKitStyles';
import {StyleSheet, Dimensions} from 'react-native'
import { colors } from '../../../../skjs_config/colors'
import { fontSize } from '../../../../skjs_config/fontSize';
const deviceHeight = Math.round(Dimensions.get("window").height);
import {styles} from '../../Credencial_module/Cresencial_moduleStyles/landingPageStyles'
export const PlaceOrderStyles = StyleSheet.create(
    {...mykitstyles,
        selectCustomerContainer: {
            backgroundColor: colors.placholderTextColor,
            marginVertical: 10,
            borderRadius: 10,
          },
          tableHeadingContainer: {
            flex: 1,
            alignSelf: "stretch",
            borderWidth: 1,
            justifyContent: "center",
            backgroundColor: colors.secondaryColor,
          },
          tableHeadingText:{
            textAlign: "center",
            fontSize: fontSize.skjs_quaternary,
            color: colors.ternary,
          },
          tableCellStyle:{
            flex: 1,
            alignSelf: "stretch",
            justifyContent: "center",
            borderLeftWidth: 1
          }}
)