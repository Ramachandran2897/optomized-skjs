import React, { useCallback, useState, useRef, useEffect } from "react";
import { View, Text, ScrollView } from "react-native";
import { CustomSecondaryButton } from "../../../../skjs_config/CustomComponents/CustomButton";
import { CustomPrimaryButtonText } from "../../../../skjs_config/CustomComponents/CustomText";
import CustomLabelValue from "../../../../skjs_config/CustomComponents/CustomLabelValue";
import existingCustomerGetAreaApi from "../../../Api/api_service/ExistingCustomer_getAreaApi";
import custom_Toast from "../../../../skjs_config/CustomComponents/CustomToast";
import existingCustomerLoginApi from "../../../Api/api_service/ExistingCustomer_loginApi";
import newCustomerCheckPincodeApi from "../../../Api/api_service/new_Customer_Check_pincode_Api";
import CustomSearchableDropDown from "../../../../skjs_config/CustomComponents/CustomSearchableDropDown";
function ExistingCustomerPage(props) {
  const [selectArea, setSelectArea] = useState();
  const [selectCustomer, setSelectCustomer] = useState();
  const scrollref = useRef(null);
  const [areaValue, setAreaValue] = useState({});
  const [area, setArea] = useState([]);

  const [customerValue, setCustomerValue] = useState({});
  const [customer, setCustomer] = useState([]);

  const [firstTimeLoginValue, setFirstTimeLoginValue] = useState(false);
  const [loginObject, setLoginObject] = useState({});

  const formObject = [
    {
      label: "Select area",
      type: "dropDown",
      setSelectedItems: setSelectArea,
      selectedItems: selectArea,
      visible: true,
      items: [
        {
          id: "hello",
          name: "world",
        },
      ],
    },
    {
      label: "Select customer",
      type: "dropDown",
      setSelectedItems: setSelectCustomer,
      visible: !!selectArea || false,
      selectedItems: selectCustomer,
      items: [
        {
          id: "hello",
          name: "world",
        },
      ],
    },
  ];
  const selectAreaValueOnChange = (value) => {
    if (value.length >= 2) {
      newCustomerCheckPincodeApi(value).then((res) => {
        if (res.status === 200 && res.data.success) {
          let localarea = res.data.pincodes.map((obj) => {
            return { ...obj, name: obj.cat };
          });
          scrollref.current.scrollToEnd();
          setArea(localarea);
        } else {
          custom_Toast({ message: "invalid area" });
        }
      });
    }
  };
  useEffect(() => {
    if (Object.keys(areaValue).length != 0) {
      existingCustomerGetAreaApi(areaValue.id).then((res) => {
        if (res.status === 200 && res.data.success) {
          let localcustomer = res.data.customers.map((obj) => {
            return { ...obj, name: obj.cat };
          });
          scrollref.current.scrollToEnd();
          setCustomer(localcustomer);
        } else {
          custom_Toast({ message: "invalid customer" });
        }
      });
    }
  }, [areaValue]);
  useEffect(() => {
    if (Object.keys(customerValue).length != 0) {
      existingCustomerLoginApi(customerValue.id).then((res) => {
        if (res.status === 200 && res.data.success) {
          setLoginObject(res.data);
        } else {
          custom_Toast({ message: "Login Invalid" });
        }
      });
    }
  }, [customerValue]);
  return (
    <ScrollView keyboardShouldPersistTaps={"handled"} ref={scrollref}>
      <View style={{ flex: 1, margin: 30 }}>
        <View style={{ marginVertical: 5 }}>
          <CustomPrimaryButtonText
            name={"Select area"}
            style={{ textAlign: "left" }}
          />
          <CustomSearchableDropDown
            onItemSelect={(item) => setAreaValue({ ...item })}
            onChangeText={(value) => selectAreaValueOnChange(value)}
            placeholder={"Select Area"}
            selectedItems={areaValue}
            items={area}
          />
          {Object.keys(areaValue).length != 0 && (
            <View style={{ marginVertical: 5 }}>
              <CustomPrimaryButtonText
                name={"Select customer"}
                style={{ textAlign: "left" }}
              />
              <CustomSearchableDropDown
                onItemSelect={(item) => setCustomerValue({ ...item })}
                selectedItems={customerValue}
                placeholder={"Select Customer"}
                items={customer}
              />
            </View>
          )}
        </View>
        {Object.keys(loginObject).length != 0 && (
          <>
            <CustomPrimaryButtonText
              name={"Customers Details"}
              style={{ textAlign: "left" }}
            />
            <CustomLabelValue
              labelValueArray={[
                {
                  key: "Jewellery name",
                  value: `${loginObject.userdetail[0].full_name}`,
                },
                { key: "GST", value: `${loginObject.userdetail[0].gst}` },
                {
                  key: "Areaname",
                  value: `${loginObject.userdetail[0].area_name}`,
                },
                {
                  key: "Address",
                  value: `${loginObject.userdetail[0].address1}`,
                },
                { key: "City", value: `${loginObject.userdetail[0].city}` },
                {
                  key: "Mobile",
                  value: `${loginObject.mobile}`,
                },
              ]}
            />
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                marginTop: 20,
              }}
            >
              <CustomSecondaryButton
                name={"PROCEED"}
                onPress={() =>
                  props.navigation.navigate("VerifyOtpScreen", {
                    loginObject: loginObject,
                    customerValue: customerValue.id,
                  })
                }
              />
            </View>
          </>
        )}
      </View>
    </ScrollView>
  );
}
export default ExistingCustomerPage;
