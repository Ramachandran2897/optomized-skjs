import React, {memo, useCallback} from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { colors } from "../../skjs_config/colors";
import DrawerContent from "./drawerContent";
import {Dimensions} from 'react-native';
const deviceWidth = Math.round(Dimensions.get("window").width);
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AddSkuIdPage from "../modules/NewSale_module/AddSkuIdComponent/AddSkuIdPage"
import CustomCart from "../../skjs_config/CustomComponents/CustomCart";

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();
const CustomDrawerNavigation = memo((params) => {
  console.log("calling navigatior", params);
  const cartOnPress = useCallback(()=>{
    params.Drawerprops.navigation.navigate("PlaceOrderScreen")
  }, [])
  const screenParams = [
    {
      name: "AddSkuIdScreen",
      component: AddSkuIdPage,
      options: {
        title: "SKJS-sale",
        headerRight: ()=> <CustomCart onPress={cartOnPress}/>
      },
    },
  ];
  return (
    <Drawer.Navigator initialRouteName="AddSkuIdScreen"
      drawerContent={(props) => <DrawerContent {...props} {...params} />}
      
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.secondaryColor,
        },
        headerTintColor: colors.ternary,
        drawerStyle: {
          backgroundColor: colors.primary,
          width: deviceWidth/1.5
        }, }}
    >
      {screenParams.map((params) => {
        return <Drawer.Screen {...params} key={params.name} />;
      })}
    </Drawer.Navigator>
  );
});
const NewSaleDrawer = (props) => {
  return (
    <CustomDrawerNavigation Drawerprops={props}/>
  );
};
export default NewSaleDrawer;
