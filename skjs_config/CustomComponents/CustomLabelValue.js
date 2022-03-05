import React from "react";
import {
  Dimensions,
  View,
  ScrollView,
  TextInput,
  SafeAreaView,
  TouchableHighlight,
  TouchableOpacity,
  Text,
  Image,
  StyleSheet,
} from "react-native";
import { colors } from "../colors";
import { fontSize } from "../fontSize";
import { mykitstyles } from "../../src/modules/mykit_module/mykit_ModuleStyles/myKitStyles";

export const defaultViewStyles = StyleSheet.create({
  PrimaryCardLabelValueContainer: mykitstyles.PrimaryCardLabelValueContainer,
  primaryCardLabel: mykitstyles.primaryCardLabel,
  selectCustomerContainer: {
    backgroundColor: colors.placholderTextColor,
    marginVertical: 10,
    borderRadius: 10,
  },
});

function CustomLabelValue(props) {
  const { labelValueArray } = props;
  return (
    <>
      {labelValueArray.map((obj) => {
        return (
          <View
            style={defaultViewStyles.PrimaryCardLabelValueContainer}
            key={obj.key}
          >
            <Text style={defaultViewStyles.primaryCardLabel}>{obj.key}</Text>
            <Text style={{ width: "40%", fontSize: fontSize.skjs_quaternary}}>: {obj.value}</Text>
          </View>
        );
      })}
    </>
  );
}

export default CustomLabelValue;
