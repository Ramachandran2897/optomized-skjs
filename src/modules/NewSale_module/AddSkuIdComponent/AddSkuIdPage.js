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
  Alert,
  Image,
} from "react-native";
import { CustomHeadingText } from "../../../../skjs_config/CustomComponents/CustomText";
import { CustomPrimaryTextinput } from "../../../../skjs_config/CustomComponents/CustomTextInput";
import { CustomSecondaryButton } from "../../../../skjs_config/CustomComponents/CustomButton";
import CustomLabelValue from "../../../../skjs_config/CustomComponents/CustomLabelValue";
import { connect } from "react-redux";
import { CustomErrorComponent } from "../../../../skjs_config/CustomComponents/CustomText";
import { Formik } from "formik";
import * as Yup from "yup";
import store from "../../../Redux/store";
import setAddtoCart from "../../../Redux/AddtoCart/AddtoCartAction";
import newSaleAddToCart, {
  newSaleAddToCartScanner,
} from "../../../Api/api_service/new_sale_add_to_cart";
import custom_Toast from "../../../../skjs_config/CustomComponents/CustomToast";
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SkuidStyles } from "../NewSale_ModuleStyles/AddSkuIdStyle";
import newSaleUserStatus from "../../../Api/api_service/new_sale_userStatus";
import kidListApi from "../../../Api/api_service/kid_list_api";
import customAlert from "../../../../skjs_config/CustomComponents/CustomAlert";
import { Alert_msg_Text } from "../../../../skjs_config/text";
function AddSkuIdPage(props) {
  // const [userDetail, setUserDetail] = useState({});
  const userDetail = props.employeeLoginCustomerData.data
  const [checkApporvedOrNot, setCheckedApprovedOrNot] = useState(false);
  console.log("", props.employeeLoginCustomerData)
  useFocusEffect(
    useCallback(() => {
      const customerObj = async () => {
        newSaleUserStatus(userDetail.userdetail[0].phone).then((res) => {
          if (res.status === 200 && res.data.success) {
            custom_Toast({message: res.data.msg})
          } else {
            customAlert({
              heading: Alert_msg_Text.alert_msg_HeadingThree,
              description: Alert_msg_Text.alert_msg_descriptionFive,
              successText: Alert_msg_Text.alert_msg_successOne,
              onPress: () => setCheckedApprovedOrNot(!checkApporvedOrNot),
            });
          }
        });
      };
      customerObj();
    }, [checkApporvedOrNot])
  );
  const customer = [
    {
      key: "Customer",
      value:
        Object.keys(userDetail).length > 0
          ? `${userDetail?.userdetail[0]?.full_name}, ${userDetail?.userdetail[0]?.city}, ${userDetail?.userdetail[0]?.state}, +91 ${userDetail?.userdetail[0]?.phone} CID: ${userDetail?.userdetail[0]?.id}`
          : "null",
    },
  ];

  //validation starts

  const initialValues = {
    skuid: "",
  };

  const onSubmit = (values, form) => {
    console.log('form',form)
    const callListApi = (alterSkuId)=>{
      kidListApi(props.loginData.data.emp_id).then((response) => {
        if (response.status === 200 && response.data.success) {
          newSaleAddToCart(
            props.loginData.data.emp_id,
            userDetail?.userdetail[0]?.id,
            alterSkuId,
            response.data.kitdetail[0].id
          ).then(async (res) => {
            if (res.status === 200 && res.data.success) {
              custom_Toast({ message: res.data.msg });
              await AsyncStorage.setItem(
                "cartValues",
                JSON.stringify(res.data.count_cart)
              );
              // porps.setCartCount(res.data.count_cart)
              store.dispatch(setAddtoCart(res.data.count_cart));
              form.resetForm();
            } else {
              customAlert({
                heading: Alert_msg_Text.alert_msg_HeadingOne,
                description: res.data.msg,
                successText: Alert_msg_Text.alert_msg_successOne,
                onPress: () => console.log("OK Pressed"),
              });
            }
          });
        } else {
          customAlert({
            heading: Alert_msg_Text.alert_msg_HeadingOne,
            description: Alert_msg_Text.alert_msg_descriptionsix,
            successText: Alert_msg_Text.alert_msg_successOne,
            onPress: () => console.log("OK Pressed"),
          });
        }
      });
    }

    let skjsid = values.skuid.split("sku/");
    if (Array.isArray(skjsid) && skjsid[1]) {
      form.setFieldValue("skuid", skjsid[1].toString());
      setTimeout(()=>callListApi(skjsid[1].toString()), 500);
    } else {
      form.setFieldValue("skuid", skjsid.toString());
      setTimeout(()=>callListApi(skjsid.toString()), 500);
    }
  };

  const validationYup = Yup.object({
    skuid: Yup.string()
      .min(3, "please enter minimum 3 character")
      .required("please enter SKU number"),
  });
  //validation ends
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationYup}
    >
      {(formik) => {
        const {
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          isValid,
          touched,
          isSubmitting,
          loggingIn,
          dirty,
          setFieldValue,
        } = formik;
        console.log("values", values);
        if (values.skuid) {
        }
        return (
          <ScrollView
            style={SkuidStyles.container}
            keyboardShouldPersistTaps={"handled"}
          >
            <CustomLabelValue labelValueArray={customer} />
            <View>
              <View style={SkuidStyles.marginBetweenView}>
                <CustomHeadingText name={"Enter Sku ID"} />
              </View>
              <View style={SkuidStyles.skuidinputContainer}>
                <View style={{ marginVertical: 10, minWidth: "80%" }}>
                  <CustomPrimaryTextinput
                    placeholder={"Enter SKU ID"}
                    value={values.skuid}
                    returnKeyType="done"
                    onBlur={handleBlur("skuid")}
                    onSubmitEditing={handleSubmit}
                    onChangeText={handleChange("skuid")}
                  />
                  {errors.skuid && touched.skuid && (
                    <CustomErrorComponent errormessagename={errors.skuid} />
                  )}
                </View>
                <View style={SkuidStyles.marginBetweenView}>
                  <CustomSecondaryButton
                    name={"ADD"}
                    onPress={handleSubmit}
                  />
                </View>
              </View>
            </View>
          </ScrollView>
        );
      }}
    </Formik>
  );
}
const mapStateToProps = (state) => {
  return {
    loginData: state.Login.data,
    employeeLoginCustomerData: state.EmployeeLogin,
  };
};
export default connect(mapStateToProps, null)(AddSkuIdPage);
