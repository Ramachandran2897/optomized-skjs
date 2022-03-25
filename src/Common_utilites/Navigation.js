import React, { useLayoutEffect, useState } from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { connect } from "react-redux";
import { Post_Data } from "../Redux/Login/LoginTypes";
import store from "../Redux/store";
import { colors } from "../../skjs_config/colors";
import LoginLandingPage from "../modules/Credencial_module/credencialComponent/LoginLandingPage";
import Drawernav from "./Drawer";
import MyKitLandingPage from "../modules/mykit_module/mykitComponent/MyKitLandingPage";
import ViewStockPage from "../modules/mykit_module/ViewStockComponent/ViewStockPage";
import ViewSoldoutPage from "../modules/mykit_module/ViewSoldoutComponent/ViewSoldoutPage";
import NewSaleLandingPage from "../modules/NewSale_module/NewSaleComponent/NewSaleLandingPage";
import VerifyOtpPage from "../modules/NewSale_module/VerifyOtpComponent/VerifyOtpPage";
import { Employee_Login_Customer_Post_Data } from "../Redux/EmployeeLoginCustomer/EmployeeLoginCustomerTypes";
import NewSaleDrawer from "./NewSaleDrawer";
import PlaceOrderPage from "../modules/NewSale_module/PlaceOrderComponent/PlaceOrderPage";
import ViewGroupCartPage from "../modules/NewSale_module/ViewGroupCartComponent/ViewGroupCartPage";
import AppLoading from "expo-app-loading";
import ModefiedAddSkuIdPage from "../modules/NewSale_module/AddSkuIdComponent/AddSkuIdPage";
import OrderSuccessPage from "../modules/NewSale_module/OrderSuccessComponent/OrderSuccessPage";
import setAddtoCart from "../Redux/AddtoCart/AddtoCartAction";
import ViewStockDetailPage from "../modules/mykit_module/ViewStockComponent/ViewStockDetailPage";
import ExistingCustomerPage from "../modules/NewSale_module/NewSaleComponent/ExistingCustomerPage";
import NewCustomerPage from "../modules/NewSale_module/NewSaleComponent/NewCustomerPage";
import FindShopingCostPage from "../modules/Shoping_cost_module/shopingCostComponent/findShopingCostPage";
// import ModefiedHomeLandingPage from "../modules/main_module/mainComponent/HomeLandingPage";
const Stack = createNativeStackNavigator();

const Navigation = (props) => {
  const [tokenValue, setTokenValue] = useState();
  const [employeeLoginUserTokenValue, setEmployeeLoginUserTokenValue] =
    useState();
  const getUserToken = async ()=>{
    let login = JSON.parse(await AsyncStorage.getItem("Login"));
    store.dispatch({ type: Post_Data, payload: login });
    let tok = await AsyncStorage.getItem("userToken");
    setTokenValue(tok)
  }
  const getEmployeeToken = async ()=>{
    let loginCustomer = JSON.parse(await AsyncStorage.getItem("EmployeeLoginCustomer"));
    let cartCount = Number(await AsyncStorage.getItem("cartValues"));
    store.dispatch(setAddtoCart(cartCount));
    store.dispatch({type: Employee_Login_Customer_Post_Data,payload: loginCustomer});
    let empToken =  await AsyncStorage.getItem("EmployeeLoginCustomerToken");
    setEmployeeLoginUserTokenValue(empToken)
  }
  getEmployeeToken()
  getUserToken()
  
  console.log("tokenvalue", tokenValue, employeeLoginUserTokenValue);
  return (
    <NavigationContainer>
      {employeeLoginUserTokenValue &&
      employeeLoginUserTokenValue != null &&
      tokenValue &&
      tokenValue != null ? (
        <Stack.Navigator
          initialRouteName="DrawernavScreen"
          screenOptions={{
            headerStyle: {
              backgroundColor: colors.secondaryColor,
            },
            contentStyle: { backgroundColor: colors.primary },
          }}
        >
          <Stack.Screen
            name={"DrawernavScreen"}
            component={NewSaleDrawer}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="PlaceOrderScreen"
            component={PlaceOrderPage}
            options={{ title: "SKJS-sale" }}
          />
          <Stack.Screen
            name="ViewGroupCartScreen"
            component={ViewGroupCartPage}
            options={{ title: "SKJS-sale" }}
          />
          <Stack.Screen
            name="OrderSuccessScreen"
            component={OrderSuccessPage}
            options={{ title: "SKJS-sale", headerLeft: (props) => <></> }}
          />
        </Stack.Navigator>
      ) : tokenValue && tokenValue != null ? (
        <Stack.Navigator
          initialRouteName="DrawernavScreen"
          screenOptions={{
            headerStyle: {
              backgroundColor: colors.secondaryColor,
            },
            contentStyle: { backgroundColor: colors.primary },
          }}
        >
          <Stack.Screen
            name={"DrawernavScreen"}
            component={Drawernav}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="MykitScreen"
            component={MyKitLandingPage}
            options={{ title: "SKJS" }}
          />
          <Stack.Screen
            name="ViewStockScreen"
            component={ViewStockPage}
            options={{ title: "View Stock" }}
          />
          <Stack.Screen
            name="ViewStockDetailScreen"
            component={ViewStockDetailPage}
            options={{ title: "View Stock Detail" }}
          />
          <Stack.Screen
            name="ViewSoldoutScreen"
            component={ViewSoldoutPage}
            options={{ title: "View Soldout" }}
          />
          <Stack.Screen
            name="NewSaleScreen"
            component={NewSaleLandingPage}
            options={{ title: "NewSale" }}
          />
          <Stack.Screen
            name="NewSaleNewCustomerScreen"
            component={NewCustomerPage}
            options={{ title: "New Customer" }}
          />
          <Stack.Screen
            name="NewSaleExistingCustomerScreen"
            component={ExistingCustomerPage}
            options={{ title: "Existing Customer" }}
          />
          <Stack.Screen
            name="VerifyOtpScreen"
            component={VerifyOtpPage}
            options={{ title: "SKJS-sale" }}
          />
          <Stack.Screen
            name="findshipingcost"
            component={FindShopingCostPage}
            options={{ title: "Find Shiping Cost" }}
          />
        </Stack.Navigator>
      ) : (
        <Stack.Navigator
          initialRouteName="LoginScreen"
          screenOptions={{
            contentStyle: { backgroundColor: colors.primary },
            headerShown: false,
          }}
        >
          <Stack.Screen name="LoginScreen" component={LoginLandingPage} />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  )
};
const mapStateToProps = (state) => {
  console.log("navigationstate", state.Token);
  return {
    token: state.Token,
    employeeLoginCustomerToken: state.EmployeeLoginCustomerToken,
  };
};
export default connect(mapStateToProps, null)(Navigation);
