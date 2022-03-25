import React,{memo} from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Badge } from "react-native-paper";
import { colors } from "../colors";
import { connect } from "react-redux";
const CustomCart = memo((props) => {
  console.log('prp',props)
  const {cartCount, onPress} = props
  return (
    <TouchableOpacity style={{ padding: 5, marginRight: 15 }} onPress={onPress}>
      <View style={{ position: "absolute", right: 0, bottom: 23, zIndex: 1 }}>
        <Badge>{cartCount}</Badge>
      </View>
      <Ionicons name="ios-cart" size={30} color={"#484848"} />
    </TouchableOpacity>
  );
});
const mapStateToProps = (state) => {
  return {
    cartCount: state.CartValue,
  };
};
export default connect(mapStateToProps, null)(CustomCart);
