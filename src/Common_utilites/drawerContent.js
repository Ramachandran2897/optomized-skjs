import React, { useState, useContext, useEffect } from "react";
import { View, StyleSheet, TouchableOpacity, Text, Alert } from "react-native";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import { colors } from "../../skjs_config/colors";
import { fontSize } from "../../skjs_config/fontSize";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { remove_Token } from "../Redux/UserToken/UserTokenTypes";
import AsyncStorage from "@react-native-async-storage/async-storage";
import store from "../Redux/store";
import { set_Employee_Login_Customer_remove_Token } from "../Redux/EmployeeLoginCustomerToken/EmployeeLoginCustomerTokenTypes";
const DrawerContent = (props) => {
  const logoutAlert = () => {
    Alert.alert("Logout !", "Are sure you want to logout your account?", [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      {
        text: "OK",
        onPress: async () => {
          let employeeLogincustomerValue = await AsyncStorage.getItem("EmployeeLoginCustomerToken")
          if (employeeLogincustomerValue) {
            props.navigation.closeDrawer()
            store.dispatch({
              type: set_Employee_Login_Customer_remove_Token,
              data: await AsyncStorage.removeItem("EmployeeLoginCustomerToken") || null,
            });
          } else {
            store.dispatch({
              type: remove_Token,
              data: await AsyncStorage.removeItem("userToken") || null,
            });
          }
        },
      },
    ]);
  };
  const Item = (itemProps) => {
    const { label, navigation, iconname, navigationname } = { ...itemProps };

    return (
      <DrawerItem
        icon={() =>
          iconname === "logout" && (
            <MaterialCommunityIcons
              name="logout"
              size={24}
              color={colors.ternary}
            />
          )
        }
        label={label}
        activeTintColor={"#ffffff"}
        activeBackgroundColor={colors.secondaryColor}
        onPress={
          iconname === "logout"
            ? () => logoutAlert(navigation)
            : () => {
                navigation.navigate(navigationname);
              }
        }
        labelStyle={{ fontSize: fontSize.secondary }}
      />
    );
  };
  const Headings = ({ value }) => {
    return (
      <Text
        style={{
          fontSize: fontSize.heading,
          textAlign: "center",
          marginTop: 30,
        }}
      >
        {value}
      </Text>
    );
  };
  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView {...props}>
        {/* <Headings
          value={"VKJS jwellery, Belly, Anthra Pradesh, +91 9080706050"}
        /> */}
      </DrawerContentScrollView>
      <View>
        <Item
          label={"Logout"}
          iconname={"logout"}
          navigation={props.navigation}
        />
      </View>
    </View>
  );
};
export default DrawerContent;
