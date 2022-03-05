import React, { createRef, useState, useCallback } from "react";
import {
  Dimensions,
  View,
  ScrollView,
  TextInput,
  SafeAreaView,
  TouchableHighlight,
  TouchableOpacity,
  Alert,
  Text,
  Image,
  StyleSheet,
} from "react-native";
import { Button } from "react-native-paper";
// import OTPInputView from '@twotalltotems/react-native-otp-input'
import { VerifyOtpStyles } from "../NewSale_ModuleStyles/VerifyOtpStyles";
import {
  CustomHeadingText,
  CustomPrimaryButtonText,
} from "../../../../skjs_config/CustomComponents/CustomText";
import {
  CustomSecondaryButton,
  CustomTernaryButton,
} from "../../../../skjs_config/CustomComponents/CustomButton";
import { colors } from "../../../../skjs_config/colors";
import {
  CustomOtpTextinput,
  CustomPrimaryOtpTextinput,
} from "../../../../skjs_config/CustomComponents/CustomTextInput";
import { Formik } from "formik";
import * as Yup from "yup";
import { CustomErrorComponent } from "../../../../skjs_config/CustomComponents/CustomText";
import newSaleOtpValidation from "../../../Api/api_service/new_sale_otp_validation";
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from "react-native-confirmation-code-field";
import { useFocusEffect } from "@react-navigation/native";
import newSaleOtpRequest from "../../../Api/api_service/new_sale_otp_request";
import custom_Toast from "../../../../skjs_config/CustomComponents/CustomToast";
import AsyncStorage from "@react-native-async-storage/async-storage";
import store from "../../../Redux/store";
import { connect } from "react-redux";
import setAddtoCart from "../../../Redux/AddtoCart/AddtoCartAction";
import setEmployeeLoginCustomerTokenAction from "../../../Redux/EmployeeLoginCustomerToken/EmployeeLoginCustomerTokenAction";
import existingCustomerLoginApi from "../../../Api/api_service/ExistingCustomer_loginApi";
import EmployeeLoginAction from "../../../Redux/EmployeeLoginCustomer/EmployeeLoginAction";
const deviceWidth = Math.round(Dimensions.get("window").width);

const styles = StyleSheet.create({
  root: { width: "100%", justifyContent: "space-around" },
  cell: {
    width: 55,
    height: 55,
    lineHeight: 38,
    fontSize: 24,
    borderWidth: 2,
    borderColor: "#00000030",
    textAlign: "center",
    marginHorizontal: 5,
  },
  focusCell: {
    borderColor: "#000",
  },
});

function VerifyOtpPage(propss) {
  const [otpSeconds, setOtpSeconds] = useState(120);
  const CELL_COUNT = 4;
  const [value, setValue] = useState("");
  const [error, setError] = useState(null);
  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  useFocusEffect(
    useCallback(() => {
      let timer = setInterval(() => setOtpSeconds((otp) => otp - 1), 1000);
      if (otpSeconds == 0) {
        clearInterval(timer);
      }
      return () => {
        clearInterval(timer);
      };
    }, [otpSeconds])
  );
  //validation starts

  const onSubmitResend = () => {
    existingCustomerLoginApi(propss.route.params.customerValue).then((res) => {
      if (res.status === 200 && res.data.success) {
        custom_Toast({ message: "OTP send sucessfully please enter otp" });
        setOtpSeconds(120);
      } else {
        Alert.alert("Faild", "invalid employee id or mobile Number", [
          { text: "OK", onPress: () => console.log("OK Pressed") },
        ]);
      }
    });
  };

  const onSubmit = () => {
    if (value.length == 4) {
      setError(null);
      store.dispatch(
        EmployeeLoginAction(
          propss.route.params.loginObject.mobile,
          Number(value)
        )
      );
    } else {
      setError("please enter full otp");
    }
  };
  //validation ends
  const customer = propss.route.params.loginObject.userdetail[0];
  return (
    <ScrollView contentContainerStyle={{ flex: 1, justifyContent: "center" }}>
      <View style={VerifyOtpStyles.container}>
        <View style={{ marginLeft: "auto" }}>
          <CustomTernaryButton
            name={"CHANGE"}
            onPress={() => propss.navigation.goBack(null)}
          />
        </View>
        <View style={{ marginVertical: 10 }}>
          <CustomPrimaryButtonText
            name={`${customer.full_name},${customer.phone},${customer.area_name},${customer.city}, ${customer.state}`}
          />
        </View>
        <View style={{ marginVertical: 10 }}>
          <CustomPrimaryButtonText name={"Enter OTP"} />
        </View>
        <View style={{ marginVertical: 10 }}>
          <CustomOtpTextinput
            ref={ref}
            {...props}
            value={value}
            onChangeText={setValue}
            cellCount={CELL_COUNT}
            onLayout={getCellOnLayoutHandler}
          />

          {error && <CustomErrorComponent errormessagename={error} />}
        </View>
        <View
          style={[{ marginVertical: 10 }, otpSeconds == 0 && { opacity: 0.5 }]}
        >
          <CustomSecondaryButton
            name={"Login"}
            onPress={onSubmit}
            disabled={otpSeconds == 0}
          />
        </View>
        <View style={{ flexDirection: "row", marginVertical: 10 }}>
          <Text>({otpSeconds})</Text>
          <TouchableOpacity
            disabled={otpSeconds != 0}
            style={otpSeconds != 0 && { opacity: 0.5 }}
            onPress={onSubmitResend}
          >
            <Text
              style={{
                color: colors.quaternery,
                textDecorationLine: "underline",
              }}
            >
              RESEND
            </Text>
          </TouchableOpacity>
          <Text>(OR) Get From Admin</Text>
        </View>
      </View>
    </ScrollView>
  );
}
const mapStateToProps = (state) => {
  console.log("statevalues", state);
  return {
    loginData: state.Login.data,
  };
};
export default connect(mapStateToProps, null)(VerifyOtpPage);
