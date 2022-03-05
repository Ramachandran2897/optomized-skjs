import React, { useRef, useState, createRef, useCallback } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { CustomSecondaryButton } from "../../../../skjs_config/CustomComponents/CustomButton";
// import CustomDropdown from "../../../../skjs_config/CustomComponents/CustomDropdown";
import { CustomPrimaryButtonText } from "../../../../skjs_config/CustomComponents/CustomText";
import { CustomPrimaryTextArea } from "../../../../skjs_config/CustomComponents/CustomTextArea";
import { CustomPrimaryTextinput, CustomOtpTextinput } from "../../../../skjs_config/CustomComponents/CustomTextInput";
import { Formik } from "formik";
import * as Yup from "yup";
import SearchableDropdown from "react-native-searchable-dropdown";
import { CustomErrorComponent } from "../../../../skjs_config/CustomComponents/CustomText";
import { useFocusEffect } from "@react-navigation/native";
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from "react-native-confirmation-code-field";
import { colors } from "../../../../skjs_config/colors";
import newCustomerCheckOtpApi from "../../../Api/api_service/new_Customer_Check_gst";
import custom_Toast from "../../../../skjs_config/CustomComponents/CustomToast";
import newCustomerCheckPhoneApi from "../../../Api/api_service/new_Customer_Checkphoe_Api";
import newCustomerCheckPincodeApi from "../../../Api/api_service/new_Customer_Check_pincode_Api";
import newCustomerOtpvalidationApi from "../../../Api/api_service/new_Customer_otpValidation";
import { CustomDropDownSecondary } from "../../../../skjs_config/CustomComponents/CustomDropdown";
import newCustomerRegisterApi from "../../../Api/api_service/new_Customer_RegisterApi";
import AsyncStorage from "@react-native-async-storage/async-storage";
import setAddtoCart from "../../../Redux/AddtoCart/AddtoCartAction";
import store from "../../../Redux/store";
import setEmployeeLoginCustomerTokenAction from "../../../Redux/EmployeeLoginCustomerToken/EmployeeLoginCustomerTokenAction";
import CustomSearchableDropDown from "../../../../skjs_config/CustomComponents/CustomSearchableDropDown";
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
function NewCustomerPage(props) {
  const [mobileNumberForOtp, setMobileNumberForOtp] = useState();
  const [otpSeconds, setOtpSeconds] = useState(120);
  const [dropdownvalues, setDropDownValues] = useState();
  const [validGstNumber, setValidGstNumber] = useState(false);
  const [validPhoneNumber, setValidPhoneNumber] = useState(false);
  const [pincode, setPinCode] = useState([]);
  const [validPincode, setValidPinCode] = useState(false);
  const scrollref = useRef(null);
  const [enableOtp, setEnableOtp] = useState(false);
  const [filteredPincodeValueArray, setPincodeValueArray] = useState([]);
  const [filteredPincodeValue, setPinCodeValue] = useState("");
  const [selectedItems, setSelectedItems] = useState({});
  const CELL_COUNT = 4;
  const [value, setValue] = useState("");
  const [error, setError] = useState(null);
  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
  const [propss, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });
  const [passwordTextVisible, setpasswordTextVisible] = useState(false);
  //validation starts
  const jewelleryNameRef = createRef(null);
  const gstNumberRef = createRef(null);
  const mobileNumberRef = createRef(null);
  const address1Ref = createRef(null);
  const address2Ref = createRef(null);
  const pincodeRef = createRef(null);

  const initialValues = {
    jewelleryName: "",
    gstNumber: "",
    mobileNumber: "",
    address1: "",
    address2: "",
    pincode: {},
  };
  useFocusEffect(
    useCallback(() => {
      if (enableOtp) {
        let timer = setInterval(() => setOtpSeconds((otp) => otp - 1), 1000);
        if (otpSeconds == 0) {
          clearInterval(timer);
        }
        return () => {
          clearInterval(timer);
        };
      }
    }, [otpSeconds, enableOtp])
  );
  const otpLogin = () => {
    console.log(value);
    newCustomerOtpvalidationApi(mobileNumberForOtp, value).then(async (res) => {
      if (res.status === 200 && res.data.success) {
        // props.navigation.navigate("AddSkuIdScreen", {mobilenumber: mobileNumberForOtp})
        await AsyncStorage.setItem(
          "EmployeeLoginCustomerToken",
          "EmployeeLoginCustomerToken"
        );
        await AsyncStorage.setItem(
          "EmployeeLoginCustomer",
          JSON.stringify(res.data)
        );
        // await AsyncStorage.setItem("cartValues", JSON.stringify(res.data.count_cart))
        // store.dispatch(setAddtoCart(res.data.count_cart))
        // res.data.count_cart
        store.dispatch(
          setEmployeeLoginCustomerTokenAction(
            await AsyncStorage.getItem("EmployeeLoginCustomerToken")
          )
        );
      } else {
        custom_Toast({ message: "Otp Not valid" });
      }
    });
  };
  const onSubmit = (values, onSubmitProps) => {
    console.log(values);
    setMobileNumberForOtp(values.mobileNumber);
    newCustomerRegisterApi(
      values.mobileNumber,
      values.jewelleryName,
      values.gstNumber,
      values.address1,
      values.address2,
      values.pincode.id
    ).then((res) => {
      if (res.status === 200 && res.data.success) {
        custom_Toast({ message: "Form submited please enter otp" });
        scrollref.current.scrollToEnd();
        setEnableOtp(true);
        if (enableOtp) {
          setOtpSeconds(120);
        }
      } else {
        custom_Toast({ message: "Form not submited" });
      }
    });
  };

  const validationYup = Yup.object({
    jewelleryName: Yup.string()
      .required("Jewellery Name cannot be empty")
      .min(6, `Jewellery Name must be at least 6 char`),
    // "^[0-9]{2}[A-Z]{5}[0-9]{4}" + "[A-Z]{1}[1-9A-Z]{1}" + "Z[0-9A-Z]{1}$",
    gstNumber: Yup.string()
      .required("GST Number cannot be empty")
      .matches(
        "^[0-9]{2}[A-Z]{5}[0-9]{4}" + "[A-Z]{1}[1-9A-Z]{1}" + "Z[0-9A-Z]{1}$",
        `Enter valid GST number`
      )
      .min(15, `gst must be 15 character`),
    mobileNumber: Yup.string()
      .required("mobile Number cannot be empty")
      .min(10, `mobile Number must be 10 character`),
    address1: Yup.string()
      .required("address cannot be empty")
      .min(10, `address must be minimum 10 character`)
      .max(348, `address must be maximum 350 character`),
    address2: Yup.string()
      .min(10, `address must be minimum 10 character`)
      .max(348, `address must be maximum 350 character`),
    pincode: Yup.object().required("pincode cannot be empty"),
  });
  //validation ends
  const formObject = [
    {
      label: "Enter Jewellery name",
      type: "textInput",
      onChange: "jewelleryName",
      ref: jewelleryNameRef,
      returnKeyType: "next",
      onSubmitEditing: gstNumberRef,
    },
    {
      label: "Enter GST number",
      type: "textInput",
      onChange: "gstNumber",
      ref: gstNumberRef,
      returnKeyType: "next",
      onSubmitEditing: mobileNumberRef,
      autoCapitalize: "characters",
      max: 15,
    },
    {
      label: "Enter mobile number",
      type: "textInput",
      onChange: "mobileNumber",
      ref: mobileNumberRef,
      returnKeyType: "next",
      onSubmitEditing: address1Ref,
      keyboardType: "numeric",
      max: 10,
    },
    {
      label: "Address 1",
      type: "textArea",
      onChange: "address1",
      ref: address1Ref,
      returnKeyType: "next",
      onSubmitEditing: address2Ref,
    },
    {
      label: "Address 2",
      type: "textArea",
      onChange: "address2",
      ref: address2Ref,
      returnKeyType: "next",
      onSubmitEditing: pincode,
    },
    {
      label: "Enter Pincode",
      type: "dropDown",
      onChange: "pincode",
      ref: pincode,
      returnKeyType: "done",
      keyboardType: "numeric",
      onSubmitEditing: pincode,
    },
  ];
  return (
    <ScrollView
      ref={scrollref}
      keyboardShouldPersistTaps={"handled"}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
    >
      <View style={{ flex: 1, margin: 30 }}>
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
              setFieldError,
              setFieldValue,
              values,
              errors,
              isValid,
              touched,
              isSubmitting,
              loggingIn,
              dirty,
              setFieldTouched,
            } = formik;

            if (
              !errors.gstNumber &&
              values.gstNumber.length == 15 &&
              !validGstNumber
            ) {
              newCustomerCheckOtpApi(values.gstNumber).then((res) => {
                if (res.status === 200 && res.data.success) {
                  custom_Toast({ message: res.data.msg });
                  setValidGstNumber(true);
                } else {
                  setFieldError("gstNumber", res.data.msg);
                  setFieldValue("gstNumber", "", false);
                  custom_Toast({ message: res.data.msg });
                }
              });
            }
            if (values.gstNumber.length < 15) {
              setValidGstNumber(false);
            }
            if (
              !errors.mobileNumber &&
              values.mobileNumber.length == 10 &&
              !validPhoneNumber
            ) {
              newCustomerCheckPhoneApi(values.mobileNumber).then((res) => {
                if (res.status === 200 && res.data.success) {
                  custom_Toast({ message: res.data.msg });
                  setValidPhoneNumber(true);
                } else {
                  setFieldError("mobileNumber", res.data.msg);
                  setFieldValue("mobileNumber", "", false);
                  custom_Toast({ message: res.data.msg });
                }
              });
            }
            if (values.mobileNumber.length < 10) {
              setValidPhoneNumber(false);
            }
            // if (
            //   !errors.pincode &&
            //   values.pincode.length == 3 &&
            //   !validPincode
            // ) {
            //   newCustomerCheckPincodeApi(values.pincode).then((res) => {
            //     if (res.status === 200 && res.data.success) {
            //       setPinCode(res.data.pincodes);
            //       setValidPinCode(true);
            //       pinCodeOrArea(values.pincode);
            //       scrollref.current.scrollToEnd();
            //     } else {
            //       setFieldError("pincode", res.data.msg);
            //       setFieldValue("pincode", "", false);
            //       custom_Toast({ message: res.data.msg });
            //     }
            //   });
            // }
            const pincodeLocalval = (val) => {
              if (val.length >= 2) {
                newCustomerCheckPincodeApi(val).then((res) => {
                  if (res.status === 200 && res.data.success) {
                    let localPincode = res.data.pincodes.map((obj) => {
                      return { ...obj, name: obj.cat };
                    });
                    scrollref.current.scrollToEnd();
                    setPinCode(localPincode);
                    setValidPinCode(true);
                    // pinCodeOrArea(values.pincode);
                  } else {
                    // setFieldError("pincode", res.data.msg);
                    // setFieldValue("pincode", "", false);
                    custom_Toast({ message: res.data.msg });
                  }
                });
              }
              scrollref.current.scrollToEnd();
            };
            if (values.pincode.length < 3) {
              setValidPinCode(false);
            }
            return (
              <>
                {formObject.map((obj) => {
                  return (
                    <View key={obj.label} style={{ marginVertical: 5 }}>
                      <CustomPrimaryButtonText
                        name={obj.label}
                        style={{ textAlign: "left" }}
                      />
                      {obj.type == "textInput" && (
                        <CustomPrimaryTextinput
                          placeholder={obj.label}
                          keyboardType={obj.keyboardType}
                          autoCapitalize={obj.autoCapitalize}
                          ref={obj.ref}
                          returnKeyType={obj.returnKeyType}
                          onBlur={handleBlur(obj.onChange)}
                          onChangeText={handleChange(obj.onChange)}
                          maxLength={obj.max}
                          onSubmitEditing={() =>
                            obj.onSubmitEditing.current.focus()
                          }
                          value={values[obj.onChange]}
                        />
                      )}
                      {obj.type == "textArea" && (
                        <CustomPrimaryTextArea
                          ref={obj.ref}
                          returnKeyType={obj.returnKeyType}
                          onBlur={handleBlur(obj.onChange)}
                          onChangeText={handleChange(obj.onChange)}
                          style={{ textAlignVertical: "top" }}
                          maxLength={350}
                          onSubmitEditing={() =>
                            obj.onSubmitEditing.current.focus()
                          }
                        />
                      )}
                      {obj.type == "dropDown" && (
                        <>
                          {console.log(values)}
                          {console.log("pincode", pincode)}
                          <CustomSearchableDropDown
                            ref={pincodeRef}
                            onItemSelect={(item) => {
                              console.log("items", item);
                              setFieldValue("pincode", item);
                            }}
                            onChangeText={(value) => pincodeLocalval(value)}
                            placeholder={"Pincode"}
                            selectedItems={values.pincode}
                            items={pincode}
                          />
                        </>
                      )}
                      {errors[obj.onChange] && touched[obj.onChange] && (
                        <CustomErrorComponent
                          errormessagename={errors[obj.onChange]}
                        />
                      )}
                    </View>
                  );
                })}
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    marginTop: 20,
                  }}
                >
                  <CustomSecondaryButton
                    name={"REGISTER"}
                    onPress={handleSubmit}
                  />
                </View>
                {/* enableOtp */}
                {enableOtp && (
                  <View style={{ marginVertical: 20, justifyContent: 'center' }}>
                    <CustomPrimaryButtonText name={"Enter OTP"} />
                    <View style={{marginVertical: 10, marginHorizontal:"10%" }}>
                    <CustomOtpTextinput
                      ref={ref}
                      {...propss}
                      value={value}
                      onChangeText={setValue}
                      cellCount={CELL_COUNT}
                      onLayout={getCellOnLayoutHandler}
                    />
                    </View>

                    <View
                      style={[
                        {
                          flexDirection: "row",
                          justifyContent: "center",
                          marginTop: 20,
                        },
                        otpSeconds == 0 && { opacity: 0.5 },
                      ]}
                    >
                      <CustomSecondaryButton
                        name={"LOGIN"}
                        onPress={otpLogin}
                        disabled={otpSeconds == 0}
                      />
                    </View>

                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "center",
                        marginTop: 15,
                      }}
                    >
                      <Text>({otpSeconds})</Text>
                      <TouchableOpacity
                        disabled={otpSeconds != 0}
                        style={otpSeconds != 0 && { opacity: 0.5 }}
                        onPress={handleSubmit}
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
                    </View>
                  </View>
                )} 
              </>
            );
          }}
        </Formik>
      </View>
    </ScrollView>
  );
}
export default NewCustomerPage;
