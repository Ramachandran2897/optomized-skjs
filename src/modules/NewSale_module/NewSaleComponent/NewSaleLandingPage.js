import React,{useCallback, useState} from "react";
import {
  Dimensions,
  View,
  ScrollView,
  TextInput,
  SafeAreaView,
  TouchableHighlight,
  TouchableOpacity,
  Text,
  Alert,
  Image,
} from "react-native";
import { colors } from "../../../../skjs_config/colors";
import {
  CustomPrimaryButton,
  CustomPrimaryButton2,
} from "../../../../skjs_config/CustomComponents/CustomButton";
import { styles } from "../../main_module/main_ModuleStyles/HomePageStyle";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Foundation } from '@expo/vector-icons';
const deviceHeight = Math.round(Dimensions.get("window").height);
const NewSaleLandingPage = (props) => {
  const primaryButton = [
    {
      name: `NEW\nCUSTOMER`,
      onPress: () => props.navigation.navigate("NewSaleNewCustomerScreen"),
    },
    {
      name: `EXISTING\nCUSTOMER`,
      onPress: () => props.navigation.navigate("NewSaleExistingCustomerScreen"),
    },
  ];
  return (
    <View style={styles.container}>
      <View style={styles.containerPrimaryButton}>
        {primaryButton.map((obj) => {
          return <View key={obj.name} ><CustomPrimaryButton onPress={obj.onPress} name={obj.name} icon={obj.icon}/></View>;
        })}
      </View>
    </View>
  );
};
export default NewSaleLandingPage

