import {StyleSheet, Dimensions} from 'react-native'
import { colors } from '../../../../skjs_config/colors'
import { fontSize } from '../../../../skjs_config/fontSize';
const deviceHeight = Math.round(Dimensions.get("window").height);
import { mykitstyles } from './myKitStyles';
export const defaultViewStyles = StyleSheet.create({
    PrimaryCardLabelValueContainer: mykitstyles.PrimaryCardLabelValueContainer,
    primaryCardLabel: mykitstyles.primaryCardLabel,
    selectCustomerContainer: {
        backgroundColor: colors.placholderTextColor,
        marginVertical: 10,
        borderRadius: 10,
      },
      tableHeadingContainer: {
        flex: 1,
        alignSelf: "stretch",
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
        padding: 10
      }
})