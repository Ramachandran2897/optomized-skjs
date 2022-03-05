import React, { useState, useCallback, useEffect } from "react";
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
import { Alert_msg_Text } from "../../../../skjs_config/text";
import { CustomSecondaryButton } from "../../../../skjs_config/CustomComponents/CustomButton";
import { CustomHeadingText } from "../../../../skjs_config/CustomComponents/CustomText";
import { CustomPrimaryCard } from "../../../../skjs_config/CustomComponents/CustomCard";
import { mykitstyles } from "../mykit_ModuleStyles/myKitStyles";
import CustomLabelValue from "../../../../skjs_config/CustomComponents/CustomLabelValue";
import { useFocusEffect } from "@react-navigation/native";
import kidListApi from "../../../Api/api_service/kid_list_api";
import { connect } from "react-redux";
import kidReturnApi from "../../../Api/api_service/kit_remove_kit_api";
import { CustomErrorComponent } from "../../../../skjs_config/CustomComponents/CustomText";
import customAlert from "../../../../skjs_config/CustomComponents/CustomAlert";
const MyKitLandingPage = (props) => {
  console.log(props.loginData);
  const [kidList, setKidList] = useState([]);
  useFocusEffect(
    useCallback(() => {
      kidListApi(props.loginData.data.emp_id).then((res) => {
        console.log(res.data.kitdetail[0].id);
        if (res.status === 200 && res.data.success) {
          setKidList(res.data.kitdetail);
        }else{
          customAlert({
            heading: Alert_msg_Text.alert_msg_HeadingOne, 
            description: Alert_msg_Text.alert_msg_descriptionOne,
            successText: Alert_msg_Text.alert_msg_successOne,
            onPress: () => console.log("OK Pressed")
          })
        }
      });
    }, [])
  );
  const secondaryButtonArray = [
    {
      name: "View Stock",
      onPress: "ViewStockScreen",
    },
    {
      name: "View Soldout",
      onPress: "ViewSoldoutScreen",
    },
  ];
  const removeKit = () => {
    customAlert({
      heading: Alert_msg_Text.alert_msg_HeadingTwo, 
      description: Alert_msg_Text.alert_msg_descriptionTwo,
      successText: Alert_msg_Text.alert_msg_successOne,
      cancelText: Alert_msg_Text.alert_msg_cancelOne,
       onPress: () => {
        kidReturnApi(kidList[0].id).then((res) => {
          if (res.status === 200 && res.data.success) {
            props.navigation.navigate("Home");
          } else {
            customAlert({
              heading: Alert_msg_Text.alert_msg_HeadingOne, 
              description: Alert_msg_Text.alert_msg_descriptionOne,
              successText: Alert_msg_Text.alert_msg_successOne,
              onPress: () => console.log("OK Pressed")
            })
          }
        });
      }
    })
  };
  if (kidList.length > 0) {
    return (
      <ScrollView style={{ flex: 1 }}>
        <View style={mykitstyles.container}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <CustomHeadingText name={"MY KIT"} />
            <View style={{ marginLeft: "auto" }}>
              <CustomSecondaryButton name={"Kit Submission"} onPress={removeKit} />
            </View>
          </View>
          {kidList.map((obj) => {
            let kitDetails = [];
            for (const property in obj) {
              property !== "id" &&
                kitDetails.push({
                  key: property,
                  value: obj[property],
                });
            }
            return (
              <View key={obj.id}>
                <CustomPrimaryCard>
                  <>
                    <CustomLabelValue labelValueArray={kitDetails} />
                    <View style={mykitstyles.buttonsContainer}>
                      {secondaryButtonArray.map((object) => {
                        return (
                          <View key={object.name}>
                            <CustomSecondaryButton
                              name={object.name}
                              onPress={() =>
                                props.navigation.navigate(object.onPress, {
                                  kitId: obj.id,
                                })
                              }
                            />
                          </View>
                        );
                      })}
                    </View>
                  </>
                </CustomPrimaryCard>
              </View>
            );
          })}
        </View>
      </ScrollView>
    );
  } else {
    return (
    <View style={{justifyContent: 'center', alignItems: 'center', height: '100%'}}>
      <CustomErrorComponent errormessagename={"No Records Found"} />
      </View>)
  }
};
const mapStateToProps = (state) => {
  return {
    loginData: state.Login.data,
  };
};
export default connect(mapStateToProps, null)(MyKitLandingPage);
