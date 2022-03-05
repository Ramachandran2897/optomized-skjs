import React, {memo} from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { colors } from "../../skjs_config/colors";
import DrawerContent from "./drawerContent";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AddSkuIdPage from "../modules/NewSale_module/AddSkuIdComponent/AddSkuIdPage"
import CustomCart from "../../skjs_config/CustomComponents/CustomCart";

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();
const CustomDrawerNavigation = memo((params) => {
  console.log("calling navigatior", params);
  const screenParams = [
    {
      name: "AddSkuIdScreen",
      component: AddSkuIdPage,
      options: {
        title: "SKJS-sale",
        headerRight: ()=> <CustomCart onPress={() => params.Drawerprops.navigation.navigate("PlaceOrderScreen")}/>
      },
    },
  ];
  return (
    <Drawer.Navigator initialRouteName="AddSkuIdScreen"
      drawerContent={(props) => <DrawerContent {...props} {...params} />}
      
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.secondaryColor
        },
        headerTintColor: colors.ternary,
        drawerStyle: {
          backgroundColor: colors.primary,
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
