import React, { useState, useRef } from "react";
import { CustomPrimaryButtonText } from "../../../../skjs_config/CustomComponents/CustomText";
import CustomSearchableDropDown from "../../../../skjs_config/CustomComponents/CustomSearchableDropDown";
import { ScrollView, View } from "react-native";
import newCustomerCheckPincodeApi from "../../../Api/api_service/new_Customer_Check_pincode_Api";
import { CustomPrimaryTextinput } from "../../../../skjs_config/CustomComponents/CustomTextInput";
import { CustomSecondaryButton } from "../../../../skjs_config/CustomComponents/CustomButton";
import { Formik } from "formik";
import * as Yup from "yup";
import { CustomErrorComponent } from "../../../../skjs_config/CustomComponents/CustomText";
import CustomLabelValue from "../../../../skjs_config/CustomComponents/CustomLabelValue";
import findShipingCostApi from "../../../Api/api_service/FindShipingCostApi";

function FindShopingCostPage(props) {
  const [areaValue, setAreaValue] = useState({});
  const [area, setArea] = useState([]);
  const scrollref = useRef(null);
  const [pincode, setPinCode] = useState([]);
  const shipingDetails = [
    {
      key: "Approximate Shiping Carrt",
      value: "hello",
    },
    {
      key: "Rs",
      value: "hello",
    },
    {
      key: "Approximate Delivery Date",
      value: "hello",
    },
  ];
  //validation starts
  const initialValues = {
    pincode: {},
    weight: "",
  };
  const onSubmit = (values, onSubmitProps) => {
    console.log("Ganapathi Agraharam  / 614202 / Tamil Nadu".split('/')[1].trim())
    values.pincode.cat;
    console.log("values", values, onSubmitProps);
    findShipingCostApi({pincode: values.pincode.cat.split('/')[1].trim(), weight: values.weight })
  };
  const validationYup = Yup.object().shape({
    pincode: Yup.object().required("pincode cannot be empty"),
    weight: Yup.string().required("Jewellery Name cannot be empty"),
  });
  //validation ends
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
        {
          console.log("error", errors);
        }
        return (
          <ScrollView keyboardShouldPersistTaps={"handled"} ref={scrollref}>
            <View style={{ flex: 1, margin: 30 }}>
              <View style={{ marginVertical: 5 }}>
                <CustomPrimaryButtonText
                  name={"Select area"}
                  style={{ textAlign: "left" }}
                />
                <CustomSearchableDropDown
                  onItemSelect={(item) => {
                    console.log("items", item);
                    setFieldValue("pincode", item);
                  }}
                  onChangeText={(value) => pincodeLocalval(value)}
                  placeholder={"Pincode"}
                  selectedItems={values.pincode}
                  items={pincode}
                />
                {/* <CustomSearchableDropDown
                  onItemSelect={(item) => setAreaValue({ ...item })}
                  onChangeText={(value) => selectAreaValueOnChange(value)}
                  placeholder={"Select Area"}
                  selectedItems={areaValue}
                  items={area}
                /> */}
                {errors["pincode"] && touched["pincode"] && (
                  <CustomErrorComponent errormessagename={errors["pincode"]} />
                )}
              </View>
              <View style={{ marginVertical: 5 }}>
                <CustomPrimaryButtonText
                  name={"weight(gm)"}
                  style={{ textAlign: "left" }}
                />
                <CustomPrimaryTextinput
                  onBlur={handleBlur("weight")}
                  onChangeText={handleChange("weight")}
                  value={values["weight"]}
                  keyboardType={"numeric"}
                />
                {errors["weight"] && touched["weight"] && (
                  <CustomErrorComponent errormessagename={errors["weight"]} />
                )}
              </View>
              <View style={Object.keys(errors).length > 0 && { opacity: 0.5 }}>
                <CustomSecondaryButton
                  name={"SUBMIT"}
                  onPress={handleSubmit}
                  disabled={!!Object.keys(errors).length > 0}
                />
              </View>
              <CustomLabelValue labelValueArray={shipingDetails} />
            </View>
          </ScrollView>
        );
      }}
    </Formik>
  );
}

export default FindShopingCostPage;
