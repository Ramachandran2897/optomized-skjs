import React, { useCallback, useEffect, useMemo, useState } from "react";
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
  Button,
} from "react-native";
import { colors } from "../../../../skjs_config/colors";
import { CustomHeadingText } from "../../../../skjs_config/CustomComponents/CustomText";
import { CustomPrimaryTextinput } from "../../../../skjs_config/CustomComponents/CustomTextInput";
import { CustomSecondaryButton } from "../../../../skjs_config/CustomComponents/CustomButton";
// import { ViewGroupCartStyles } from "../NewSale_ModuleStyles/ViewGroupCartStyles";
import { ViewGroupCartStyles } from "../NewSale_ModuleStyles/ViewGroupCartPageStyles";
import CustomLabelValue from "../../../../skjs_config/CustomComponents/CustomLabelValue";
import CustomPrimaryTable from "../../../../skjs_config/CustomComponents/CustomPrimaryTable";
import { CustomPrimayCheckbox } from "../../../../skjs_config/CustomComponents/CustomCheckbox";
import { Checkbox } from "react-native-paper";
import { connect } from "react-redux";
import { useFocusEffect } from "@react-navigation/native";
import newSaleViewGroupCart from "../../../Api/api_service/new_sale_view_group_cart_api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import kidListApi from "../../../Api/api_service/kid_list_api";
import customAlert from "../../../../skjs_config/CustomComponents/CustomAlert";
import { Alert_msg_Text } from "../../../../skjs_config/text";

function ViewGroupCartPage(props) {
  const userDetail = props.employeeLoginCustomerData.data;
  const [cardList, setCardList] = useState([]);
  const [responseValue, setResponseValue] = useState([]);
  const [enableVerifiedButton, setEnableVerificationButton] = useState(false);
  useFocusEffect(
    useCallback(() => {
      const fnNewSalegroupCart = () => {
        kidListApi(props.loginData.data.emp_id).then((response) => {
          newSaleViewGroupCart(
            props.loginData.data.emp_id,
            userDetail.userdetail[0].id,
            response.data.kitdetail[0].id
          ).then((res) => {
            if (res.status === 200 && res.data.success) {
              let responsevalue = res.data.cartproducts.map((obj, index) => {
                return {
                  sno: obj.sno,
                  category: obj.cat,
                  current: obj.current,
                  quantity_received: obj.reserve,
                  quantity_avaliable: obj.avail,
                  checkboxValue: false,
                };
              });
              setResponseValue(responsevalue);
            } else {
              customAlert({
                heading: Alert_msg_Text.alert_msg_HeadingOne,
                description: Alert_msg_Text.alert_msg_descriptionNine,
                successText: Alert_msg_Text.alert_msg_successOne,
                onPress: () => console.log("OK Pressed"),
              });
            }
          });
        });
      };
      fnNewSalegroupCart();
    }, [])
  );
  let cartlistArray = responseValue.map((obj, index) => {
    return {
      ...obj,
      action_verified: (
        <CustomPrimayCheckbox
          object={obj}
          checkedValue={(val) => {
            console.log(obj);
            responseValue[index].checkboxValue = val;
            // responseValue.splice(index, 1, obj);
            setEnableVerificationButton(
              responseValue.length > 0
                ? responseValue.every((values) => values.checkboxValue)
                : false
            );
            setResponseValue(responseValue);
          }}
          index={index}
          cardList={cardList}
        />
      ),
    };
  });
  // setCardList(cartlistArray);
  console.log("cartlist", cartlistArray);
  const customer = [
    {
      key: "Customer Details",
      value:
        Object.keys(userDetail).length > 0
          ? `${userDetail?.userdetail[0]?.full_name}, ${userDetail?.userdetail[0]?.city}, ${userDetail?.userdetail[0]?.state}, +91 ${userDetail?.userdetail[0]?.phone} CID: ${userDetail?.userdetail[0]?.id}`
          : "null",
    },
  ];
  const titlename = [
    "S.no",
    "Category",
    "Current Stock",
    "Qty Reserved",
    "Qty Avail",
    "Action Verified",
  ];
  console.log("enable verification button", responseValue);
  return (
    <View style={{ marginHorizontal: 20, flex: 1 }}>
      <CustomLabelValue labelValueArray={customer} />
      <CustomPrimaryTable titleArray={titlename} valueArray={cartlistArray} />
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <View
          style={[
            { marginVertical: 10 },
            !enableVerifiedButton && { opacity: 0.5 },
          ]}
        >
          <CustomSecondaryButton
            name={"All Verified"}
            onPress={() =>
              props.navigation.navigate("PlaceOrderScreen", {
                enableplaceorderButton: true,
              })
            }
            disabled={!enableVerifiedButton}
          />
        </View>
        <View style={{ marginVertical: 10 }}>
          <CustomSecondaryButton
            name={"Back to cart"}
            onPress={() => props.navigation.navigate("PlaceOrderScreen")}
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

export default connect(mapStateToProps, null)(ViewGroupCartPage);
