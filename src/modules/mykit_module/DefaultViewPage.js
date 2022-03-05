import React, { useState, memo } from "react";
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
} from "react-native";
import CustomPrimaryTable from "../../../skjs_config/CustomComponents/CustomPrimaryTable";
import CustomLabelValue from "../../../skjs_config/CustomComponents/CustomLabelValue";
function DefaultViewPage(props) {
  const { kitDetails, kitLists, dropdownValues,setDropDownSelectedValue, titlename } = props;
  return (
    <View style={{ marginHorizontal: 15, flex: 1 }}>
      <CustomLabelValue labelValueArray={kitDetails} />
      <CustomPrimaryTable titleArray={titlename} valueArray={kitLists} />
    </View>
  );
}

export default memo(DefaultViewPage);
