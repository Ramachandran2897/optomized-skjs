import React, { useCallback, useEffect, useState } from "react";
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
  Alert,
} from "react-native";
import { Button } from "react-native-paper";
import { colors } from "../../../../skjs_config/colors";
import { CustomHeadingText } from "../../../../skjs_config/CustomComponents/CustomText";
import { CustomPrimaryTextinput } from "../../../../skjs_config/CustomComponents/CustomTextInput";
import {
  CustomSecondaryButton,
  CustomTernaryButton,
} from "../../../../skjs_config/CustomComponents/CustomButton";
import { PlaceOrderStyles } from "../NewSale_ModuleStyles/PlaceOrderStyles";
import CustomLabelValue from "../../../../skjs_config/CustomComponents/CustomLabelValue";
import CustomPrimaryTable from "../../../../skjs_config/CustomComponents/CustomPrimaryTable";
import { MaterialIcons } from "@expo/vector-icons";
import newSaleViewCart from "../../../Api/api_service/new_sale_view_cart_api";
import { connect } from "react-redux";
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import newSaleViewDeleteItem from "../../../Api/api_service/new_sale_view_cart_delete_item";
import custom_Toast from "../../../../skjs_config/CustomComponents/CustomToast";
import kidViewStockApi from "../../../Api/api_service/kid_view_stock_api";
import newSalePlaceOrder, {
  newSaleOrderDetailApi,
} from "../../../Api/api_service/new_sale_placeorder_api";
import customAlert from "../../../../skjs_config/CustomComponents/CustomAlert";
import { Alert_msg_Text } from "../../../../skjs_config/text";

function PlaceOrderPage(props) {
  const userDetail = props.employeeLoginCustomerData.data
  const [rerenderAfterDelete, setRerenderAfterDelete] = useState(0);
  const [customerDetails, setCustomerDetails] = useState([]);
  const [cartList, setCartList] = useState([]);
  const [deletedItems, setDeletedItems] = useState(true)
  const placeOrder = async () => {
    newSalePlaceOrder(
      props.loginData.data.emp_id,
      userDetail.userdetail[0].id
    ).then(async (res) => {
      if (res.status === 200 && res.data.success) {
        newSaleOrderDetailApi(res.data.orderid, res.data.custid).then(
          async (response) => {
            if (response.status === 200 && response.data.success) {
              await AsyncStorage.setItem(
                "cartValues",
                JSON.stringify(res.data.count_cart)
              );
              custom_Toast({ message: "Order verified sucessfully" });
              props.navigation.navigate("OrderSuccessScreen", {
                orderSuccesScreenData: res.data,
                orderDetails: response.data,
              });
            } else {
              await AsyncStorage.setItem(
                "cartValues",
                JSON.stringify(res.data.count_cart)
              );
              customAlert({
                heading: Alert_msg_Text.alert_msg_HeadingOne,
                description: Alert_msg_Text.alert_msg_descriptionSeven,
                successText: Alert_msg_Text.alert_msg_successOne,
                onPress: () => console.log("OK Pressed"),
              });
            }
          }
        );
      } else {
        await AsyncStorage.setItem(
          "cartValues",
          JSON.stringify(res.data.count_cart)
        );
        customAlert({
          heading: Alert_msg_Text.alert_msg_HeadingOne,
          description: Alert_msg_Text.alert_msg_descriptionEight,
          successText: Alert_msg_Text.alert_msg_successOne,
          onPress: () => console.log("OK Pressed"),
        });
      }
    });
  };
  const customlabelname = {
    kit_total_weight: "Cart Nt.wt",
    kit_total_pairs: "Cart Pairs",
    kit_total_pcs: "Cart Pcs",
  };
  useFocusEffect(
    useCallback(() => {
      const fnNewSaleViewCart = async () => {
        newSaleViewCart(
          props.loginData.data.emp_id,
          userDetail.userdetail[0].id
        ).then(async (res) => {
          if (res.status === 200 && res.data.success) {
            let obj = res.data.cartdetail[0];
            let kitDetailss = [];
            for (const property in obj) {
              property !== "id" &&
                kitDetailss.push({
                  key: property == "id" ? "CID" : customlabelname[property],
                  value: obj[property] != null ? obj[property] : 0,
                });
            }
            let cartlistArray = res.data.cartproducts.map((obj) => {
              return {
                sno: obj.sno,
                category: obj.cat,
                skuId: obj.sku,
                netWeight: obj.weight,
                action: (
                  <TouchableOpacity onPress={() => deleteItem(obj.proid)}>
                    <MaterialIcons
                      name="cancel"
                      size={24}
                      color={colors.quaternery}
                    />
                  </TouchableOpacity>
                ),
              };
            });
            setCustomerDetails(kitDetailss);
            setCartList(cartlistArray);
          } else {
            customAlert({
              heading: Alert_msg_Text.alert_msg_HeadingOne,
              description: Alert_msg_Text.alert_msg_descriptionNine,
              successText: Alert_msg_Text.alert_msg_successOne,
              onPress: () => console.log("OK Pressed"),
            });
          }
        });
      };
      fnNewSaleViewCart();
    }, [rerenderAfterDelete])
  );
  const deleteItem = async (proid) => {
    console.log("customer obj", userDetail.userdetail[0].id);
    customAlert({
      heading: Alert_msg_Text.alert_msg_HeadingFour,
      description: Alert_msg_Text.alert_msg_descriptionTen,
      successText: Alert_msg_Text.alert_msg_successOne,
      cancelText: Alert_msg_Text.alert_msg_cancelOne,
      onPress: () => {
        newSaleViewDeleteItem(userDetail.userdetail[0].id, proid).then(
          (res) => {
            if (res.status === 200 && res.data.success) {
              setRerenderAfterDelete((count) => count + 1);
              custom_Toast({ message: "Removed sucessfully" });
              setDeletedItems(false)
            } else {
              customAlert({
                heading: Alert_msg_Text.alert_msg_HeadingOne,
                description: Alert_msg_Text.alert_msg_descriptionNine,
                successText: Alert_msg_Text.alert_msg_successOne,
                onPress: () => console.log("OK Pressed"),
              });
            }
          }
        );
      },
    });
  };
  const customer = [
    {
      key: "Customer Details",
      value:
        Object.keys(userDetail).length > 0
          ? `${userDetail?.userdetail[0]?.full_name}, ${userDetail?.userdetail[0]?.city}, ${userDetail?.userdetail[0]?.state}, +91 ${userDetail?.userdetail[0]?.phone} CID: ${userDetail?.userdetail[0]?.id}`
          : "null",
    },
  ];
  const titlename = ["S.no", "Category", "Sku ID", "Net wgt", "Action"];
  return (
    <View style={{ marginHorizontal: 20, flex: 1 }}>
      <View style={{ flexDirection: "row-reverse", marginTop: 20 }}>
        <CustomTernaryButton
          name={"View Group Cart"}
          onPress={() => props.navigation.navigate("ViewGroupCartScreen")}
        />
      </View>

      <CustomLabelValue labelValueArray={customer} />
      <CustomLabelValue labelValueArray={customerDetails} />
      <CustomPrimaryTable titleArray={titlename} valueArray={cartList} />

      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <View
          style={[
            { marginVertical: 10 },
            (!props.route?.params?.enableplaceorderButton || !deletedItems) && { opacity: 0.5 },
          ]}
        >
          <CustomSecondaryButton
            name={"place Order"}
            onPress={placeOrder}
            disabled={(!props.route?.params?.enableplaceorderButton || !deletedItems)}
          />
        </View>
      </View>
    </View>
  );
}

const mapStateToProps = (state) => {
  return {
    loginData: state.Login.data,
    employeeLoginCustomerData: state.EmployeeLogin,
  };
};

export default connect(mapStateToProps, null)(PlaceOrderPage);
