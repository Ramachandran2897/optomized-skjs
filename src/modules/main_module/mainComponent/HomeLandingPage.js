import React,{useCallback, useState} from "react";
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
import { colors } from "../../../../skjs_config/colors";
import {
  CustomPrimaryButton,
  CustomPrimaryButton2,
} from "../../../../skjs_config/CustomComponents/CustomButton";
import { styles } from "../main_ModuleStyles/HomePageStyle";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { Foundation } from '@expo/vector-icons';
import kidListApi from "../../../Api/api_service/kid_list_api";
import { useFocusEffect } from "@react-navigation/native";
import { connect } from "react-redux";
const deviceHeight = Math.round(Dimensions.get("window").height);
const HomeLandingPage = (props) => {
  const [kidList, setKidList] = useState([]);
  useFocusEffect(
    useCallback(() => {
      kidListApi(props.loginData.data.emp_id).then((res) => {
        console.log('kit response', res)
        if (res.status === 200 && res.data.success) {
          setKidList(res.data.kitdetail);
        }else{
          setKidList([]);
        }
      });
    }, [])
  );
  const primaryButton = [
    {
      name: "MY KIT",
      onPress: useCallback(() => props.navigation.navigate("MykitScreen"), []),
      icon: <Foundation name="shopping-bag" size={40} color="black" style={{textAlign: 'center'}} />,
      disabled: false
    },
    {
      name: "NEW SALE",
      onPress: useCallback(() => props.navigation.navigate("NewSaleScreen"), []),
      icon: <MaterialCommunityIcons name="sale" size={40} color="black" style={{textAlign: 'center'}} />,
      disabled: kidList.length === 0 ? true : false
    },
    // {
    //   name: "FIND SHIPING COST",
    //   onPress: () => props.navigation.navigate("NewSaleScreen"),
    //   // icon: <FontAwesome5 name="shipping-fast" size={40} color="black" style={{textAlign: 'center'}} />,
    //   disabled: false
    // },
  ];
  return (
    <View style={styles.container}>
      <View style={styles.containerPrimaryButton}>
        {React.Children.toArray(primaryButton.map((obj) => {
          return <View style={obj.disabled && {opacity: 0.5}}><CustomPrimaryButton onPress={obj.onPress} name={obj.name} icon={obj.icon} disabled={obj.disabled} /></View>;
        }))}
        {/* <View style={{ marginTop: 10 }}>
        <CustomPrimaryButton2 onPress={() => props.navigation.navigate('findshipingcost')} name={"FIND SHIPING COST"} />
      </View> */}
      </View>
    </View>
  );
};
const mapStateToProps = (state) => {
  return {
    loginData: state.Login.data,
  };
};
export default connect(mapStateToProps, null)(HomeLandingPage);
