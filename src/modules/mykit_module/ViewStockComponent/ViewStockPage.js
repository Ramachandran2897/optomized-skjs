import React, { useCallback, useState } from "react";
import {View} from "react-native"
import DefaultViewPage from "../DefaultViewPage";
import { useFocusEffect } from "@react-navigation/native";
import kidViewStockApi from "../../../Api/api_service/kid_view_stock_api";
import { connect } from "react-redux";
import { CustomTernaryButton } from "../../../../skjs_config/CustomComponents/CustomButton";
import customAlert from "../../../../skjs_config/CustomComponents/CustomAlert";
import { Alert_msg_Text } from "../../../../skjs_config/text";
function ViewStockPage(props) {
  const [kitDetails, setKitDetails] = useState([]);
  const [viewStockkits, setViewStockKits] = useState([]);
  useFocusEffect(
    useCallback(() => {
      const customalabelname={
        kit_id: "Kit id",
        kit_total_weight: "Current Nt.wt",
        kit_total_pairs: "Current Pairs",
        kit_total_pcs: "Current Pcs",
        Total: "Total"
      }
      kidViewStockApi(
        props.loginData.data.emp_id,
        props.route.params.kitId
      ).then((res) => {
        if (res.status === 200 && res.data.success) {
          let obj = res.data.kitdetail[0];
          let kitDetailss = [];
          for (const property in obj) {
            property !== "id" &&
              kitDetailss.push({
                key: customalabelname[property],
                value: obj[property],
              });
          }
          kitDetailss.push({
            key: "Total",
            value: obj.kit_total_pairs+obj.kit_total_pcs
          })
          const kitproduct = res.data.kitproducts.map((response, index)=>{
            let kitqtykitweight = `${response.kitqty} \n ${response.kitweight} gms`
            let availqtyavailweight = `${response.availqty} \n ${response.availweight} gms`
            let sno = index+1
            delete response.kitqty
            delete response.kitweight
            delete response.availqty
            delete response.availweight
            delete response.sno
            return {sno, ...response, kitqtykitweight: kitqtykitweight, availqtyavailweight: availqtyavailweight}
          })
          setKitDetails(kitDetailss);
          setViewStockKits(kitproduct);
        } else {
          customAlert({
            heading: Alert_msg_Text.alert_msg_HeadingOne, 
            description: Alert_msg_Text.alert_msg_descriptionThree,
            successText: Alert_msg_Text.alert_msg_successOne,
            onPress: () => console.log("OK Pressed")
          })
        }
      });
    }, [])
  );
  return(
  <>
    <View style={{ flexDirection: "row", marginTop: 20, marginLeft: 'auto', marginRight: 20 }}>
      <CustomTernaryButton
        name={"View Detail"}
        onPress={() => props.navigation.navigate("ViewStockDetailScreen", {kitId: props.route.params.kitId, kitDetails: kitDetails })}
      />
    </View>
    <DefaultViewPage
      kitDetails={kitDetails}
      kitLists={viewStockkits}
      titlename = {["S.no", "Category", "Kit.qty/Kit.wt", "Avl.qty/Avl.wt"]}
      routename={props.route.name}
    />
  </>)
}
const mapStateToProps = (state) => {
  return {
    loginData: state.Login.data,
  };
};
export default connect(mapStateToProps, null)(ViewStockPage);
