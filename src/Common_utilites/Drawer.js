import React, {memo} from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
// import { NavigationContainer } from "@react-navigation/native";
// import { Button, View } from 'react-native';
import { colors } from "../../skjs_config/colors";
import DrawerContent from "./drawerContent";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeLandingPage from "../modules/main_module/mainComponent/HomeLandingPage";
// import ModefiedNewSaleLandingPage from "../modules/NewSale_module/NewSaleComponent/NewSaleLandingPage";
// import ModefiedVerifyOtpPage from "../modules/NewSale_module/VerifyOtpComponent/VerifyOtpPage";
// import ModefiedAddSkuIdPage from "../modules/NewSale_module/AddSkuIdComponent/AddSkuIdPage";
// import ModefiedPlaceOrderPage from "../modules/NewSale_module/PlaceOrderComponent/PlaceOrderPage";
// import ModefiedViewGroupCartPage from "../modules/NewSale_module/ViewGroupCartComponent/ViewGroupCartPage";

const Drawer = createDrawerNavigator();
const CustomDrawerNavigation = memo((params) => {
  console.log("calling navigatior");
  const screenParams = [
    {
      name: "Home",
      component: HomeLandingPage,
      headerTitle: "world",
      options: { title: 'SKJS', }
    },
  ];
  return (
    <Drawer.Navigator initialRouteName="Home"
      drawerContent={(props) => <DrawerContent {...props} {...params} />}
      screenOptions={{
        // headerTitle: "SKJS",
        headerStyle: {
          backgroundColor: colors.secondaryColor
        },
        headerTintColor: colors.ternary,
        drawerStyle: {
          backgroundColor: colors.primary,
        }}}
    >
      {screenParams.map((params) => {
        return <Drawer.Screen {...params} key={params.name}  />;
      })}
    </Drawer.Navigator>
  );
});
const Drawernav = (props) => {
  return (
    <CustomDrawerNavigation />
  );
};
export default Drawernav;
