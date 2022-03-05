import React, { useCallback, useState } from "react";
import { SafeAreaView, Text, View, Alert } from "react-native";
import CustomPrimaryTable from "../../../../skjs_config/CustomComponents/CustomPrimaryTable";
import { connect } from "react-redux";
import { useFocusEffect } from "@react-navigation/native";
import kitStockDetailApi from "../../../Api/api_service/Kit_viewStock_detail_Api";
import customAlert from "../../../../skjs_config/CustomComponents/CustomAlert";
import { Alert_msg_Text } from "../../../../skjs_config/text";

function ViewStockDetailPage(props) {
  const [kitDetailList, setKitDetailList] = useState([]);
  useFocusEffect(
    useCallback(() => {
      kitStockDetailApi(
        props.loginData.data.emp_id,
        props.route.params.kitId
      ).then((res) => {
        if (res.status === 200 && res.data.success) {
          const detailList = res.data.kitproducts.map((response) => {
            delete response["pcs/pair"];
            return { ...response };
          });
          setKitDetailList(detailList);
        } else {
          customAlert({
            heading: Alert_msg_Text.alert_msg_HeadingOne,
            description: Alert_msg_Text.alert_msg_descriptionThree,
            successText: Alert_msg_Text.alert_msg_successOne,
            onPress: () => console.log("OK Pressed"),
          });
        }
      });
    }, [])
  );
  const titlename = ["S.no", "Category", "Sku", "Net wgt"];
  return (
    <View style={{ flex: 1, marginTop: 30, marginHorizontal: 10 }}>
      <CustomPrimaryTable titleArray={titlename} valueArray={kitDetailList} />
    </View>
  );
}
const mapStateToProps = (state) => {
  return {
    loginData: state.Login.data,
  };
};
export default connect(mapStateToProps, null)(ViewStockDetailPage);
