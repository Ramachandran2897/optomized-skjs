import React, { useCallback, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Dimensions,
  BackHandler,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomLabelValue from "../../../../skjs_config/CustomComponents/CustomLabelValue";
import CustomPrimaryTable from "../../../../skjs_config/CustomComponents/CustomPrimaryTable";
import { CustomHeadingText } from "../../../../skjs_config/CustomComponents/CustomText";
import { fontSize } from "../../../../skjs_config/fontSize";
import { MaterialIcons } from "@expo/vector-icons";
import { CustomSecondaryButton } from "../../../../skjs_config/CustomComponents/CustomButton";
import { colors } from "../../../../skjs_config/colors";
import { OrderSucessStyles } from "../NewSale_ModuleStyles/OrderSucesspageStyles";
import RNHTMLtoPDF from "react-native-html-to-pdf";
import * as Print from "expo-print";
import { shareAsync } from "expo-sharing";
import { useFocusEffect } from "@react-navigation/native";
import store from "../../../Redux/store";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Modal } from "react-native-paper";
import { customHtmlPdf } from "../../../../skjs_config/CustomComponents/CustomHtmlForPdf";
import customAlert from "../../../../skjs_config/CustomComponents/CustomAlert";
import { Alert_msg_Text } from "../../../../skjs_config/text";
import { set_Employee_Login_Customer_remove_Token } from "../../../Redux/EmployeeLoginCustomerToken/EmployeeLoginCustomerTokenTypes";
const deviceHeight = Math.round(Dimensions.get("window").height);
const deviceWidth = Math.round(Dimensions.get("window").width);
const OrderSuccessPage = (porps) => {
  const backAction = () => {
    console.log('back')
    Alert.alert("Hold on!", "Are you sure you want to go back?", [
      {
        text: "Cancel",
        style: "cancel",
        onPress: ()=>null
      },
      { text: "New order as same customer", onPress: ()=> porps.navigation.navigate("AddSkuIdScreen") },
      { text: "Logout", onPress: async () => {
        let employeeLogincustomerValue = await AsyncStorage.getItem(
          "EmployeeLoginCustomerToken"
        );
        if (employeeLogincustomerValue) {
          store.dispatch({
            type: set_Employee_Login_Customer_remove_Token,
            data:
              (await AsyncStorage.removeItem("EmployeeLoginCustomerToken")) ||
              null,
          });
        }
      } }
    ]);
    return true;
  };
  useFocusEffect(
    useCallback(() => {
      const setData = async()=>{
      BackHandler.addEventListener(
        "hardwareBackPress",
        backAction
      );
      }
      setData()
      return () =>
      BackHandler.removeEventListener("hardwareBackPress", backAction);
    }, [])
  );
  let orderSucessData = porps.route.params.orderSuccesScreenData;
  let orderDetails = porps.route.params.orderDetails;
  let today = new Date();
  let date =
    today.getDate() + "-" + (today.getMonth() + 1) + "-" + today.getFullYear();
  let time = today.getHours() + ":" + today.getMinutes();
  const titlename = ["S.no", "Info", "PKT", "Pcs/Pair", "Wt", "Qty", "Pure"];
  const orderVlues = [
    {
      key: "Estimation Number",
      value: orderSucessData.orderdetail.est_no,
    },
    {
      key: "Seal Name",
      value: orderSucessData.userdetail[0].seal_name,
    },
  ];
  const oldWeightOldAmount = [
    {
      key: "W",
      value: orderSucessData.userdetail[0].oldweight,
    },
    {
      key: "A",
      value: orderSucessData.userdetail[0].oldamt,
    },
  ];
  const orderTotalValues = [
    {
      key: "Total Weight",
      value: orderSucessData.orderdetail.totweight,
    },
    {
      key: "Total Pure",
      value: `${orderSucessData.orderdetail.totpure}\t\t${
        (Number(orderSucessData.orderdetail.totpure) +
        Number(orderSucessData.userdetail[0].oldweight)).toFixed(3)
      }`,
    },
    {
      key: "Total No of pairs",
      value: `${orderSucessData.orderdetail.totpair}(2pcs)`,
    },
    {
      key: "Total No of Pieces",
      value: orderSucessData.orderdetail.totpcs,
    },
    {
      key: "Hallmark Amount",
      value: `(${
        Number(orderSucessData.orderdetail.totpair) * 2 +
        Number(orderSucessData.orderdetail.totpcs)
      }*${orderSucessData.orderdetail.hallamt})`,
    },
  ];
  const productDetailPdf = async () => {
    const tableFieldName = orderDetails.orderdetail.orderproducts.map((obj) => {
      let huid1 = null;
      let huid2 = null;
      if (obj.huid != null) {
        const huidarray = obj.huid?.split(",");
        if (Array.isArray(huidarray)) {
          huid1 = huidarray[0];
          huid2 = huidarray[1];
        } else {
          huid1 = huidarray;
        }
      }
      return {
        sno: obj.sno,
        skuid: obj.skuid,
        weight: obj.weight,
        huid1: huid1 || "",
        huid2: huid2 || "",
      };
    });
    const tableHeadingName = [
      "S.no",
      "Product number",
      "Weight",
      "Huid 1",
      "Huid 2",
    ];
    const detailsOfKeyAndValue = [
      {
        key: "Total Products",
        value: orderSucessData.orderdetail.totpair + orderSucessData.orderdetail.totpcs,
      },
      { key: "No of pairs", value: orderSucessData.orderdetail.totpair },
      { key: "No of Pieces", value: orderSucessData.orderdetail.totpcs },
    ];
    const heading = {
      title1: "Product Detail",
    };
    await Print.printAsync({
      html: customHtmlPdf({
        tableFieldName,
        tableHeadingName,
        detailsOfKeyAndValue,
        heading,
        detailsOfKeyAndValueHeading: [],
        name: "detail",
        estno: orderSucessData.orderdetail.est_no,
      }),
    });
  };
  const createEstimationPDF = async () => {
    const tableFieldName = orderSucessData.orderdetail.estdetail.map((obj) => {
      return {
        sno: obj.sno,
        info: obj.info,
        cat: obj.cat,
        tot: obj.tot,
        weight: obj.weight,
        qty: obj.qty,
        pure: obj.pure,
      };
    });
    const tableHeadingName = [
      "S.no",
      "Info",
      "PKT",
      "Pcs/Pair",
      "Wt",
      "Qty",
      "Pure",
    ];
    const heading = {
      title1: "Estimation Only",
      title2: "GST and Other Tax Applicable",
      value1: `W: ${orderSucessData.userdetail[0].oldweight}`,
      value2: `A: ${orderSucessData.userdetail[0].oldamt}`,
    };
    const detailsOfKeyAndValueHeading = [{
      key: "Seal Name",
      value: orderSucessData.userdetail[0].seal_name
    }]
    const detailsOfKeyAndValue = [
      { key: "Bill Weight", value: orderSucessData.orderdetail.totweight },
      { key: "Bill Pure", value: orderSucessData.orderdetail.totpure },
      {
        key: `No of pairs(${orderSucessData.orderdetail.totpair}X2 pcs)`,
        value: Number(orderSucessData.orderdetail.totpair) * 2,
      },
      { key: `No of Pieces`, value: orderSucessData.orderdetail.totpcs },
      {
        key: `Hallmark Amount (${
          Number(orderSucessData.orderdetail.totpair) * 2 + Number(orderSucessData.orderdetail.totpcs)
        }*${orderSucessData.orderdetail.hallamt})`,
        value: orderSucessData.orderdetail.tothallmark,
      },
      {
        key: `Total Pure`,
        value: `${(
          Number(orderSucessData.orderdetail.totpure) +
          Number(orderSucessData.userdetail[0].oldweight)
        ).toFixed(3)}`,
      },
      {
        key: `Total Amount`,
        value: `${
          Number(orderSucessData.orderdetail.tothallmark) +
          Number(orderSucessData.userdetail[0].oldamt)
        }`,
      },
    ];
    await Print.printAsync({
      // html: createEstimetionHtml(orderSucessData),
      html: customHtmlPdf({
        tableFieldName,
        tableHeadingName,
        detailsOfKeyAndValue,
        heading,
        estno: orderSucessData.orderdetail.est_no,
        detailsOfKeyAndValueHeading
      }),
    });
  };
  return (
    <>
      <SafeAreaView style={OrderSucessStyles.container}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        >
          <View style={{ alignItems: "center" }}>
            <View style={OrderSucessStyles.marginBetweenView}>
              <CustomHeadingText name={"Order Successful"} />
            </View>
            <View style={OrderSucessStyles.marginBetweenView}>
              <MaterialIcons
                name="verified-user"
                size={100}
                color={colors.successColor}
              />
            </View>
            </View>
            <View style={[OrderSucessStyles.marginBetweenView, { flexDirection: 'row', justifyContent: 'space-around', flexWrap: 'wrap'}]}>
              <View>
              <CustomSecondaryButton
                name={"Estimation PDF"}
                onPress={() => createEstimationPDF()}
              />
              </View>
              <View>
              <CustomSecondaryButton
                name={"Product Detail PDF"}
                onPress={() => productDetailPdf()}
              />
              </View>
            </View>
          
          <View style={OrderSucessStyles.marginBetweenView}>
            <CustomLabelValue labelValueArray={orderVlues} />
            <CustomLabelValue labelValueArray={oldWeightOldAmount} />
            <Text style={{ marginLeft: "auto" }}>{`${date} ${time} ${
              today.getHours() >= 12 ? "PM" : "AM"
            }`}</Text>
            <Text style={{ fontWeight: "bold", marginLeft: 10 }}>
              GST and Other Tax Applicable
            </Text>
          </View>
          <ScrollView
            style={{ maxHeight: deviceHeight / 2 }}
            nestedScrollEnabled={true}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
          >
            <CustomPrimaryTable
              titleArray={titlename}
              valueArray={orderSucessData.orderdetail.estdetail}
            />
          </ScrollView>
          <View style={{ marginTop: 20 }}>
            <CustomLabelValue labelValueArray={orderTotalValues} />
            <Text style={OrderSucessStyles.totalamount}>
              {orderSucessData.orderdetail.tothallmark}
            </Text>
          </View>
          <Text style={{ marginLeft: "auto", marginRight: 25 }}>
            {orderSucessData.userdetail[0].oldamt}
          </Text>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default OrderSuccessPage;
