import React, { useState, useCallback } from "react";
import { Alert, TouchableOpacity, View } from "react-native";
import DefaultViewPage from "../DefaultViewPage";
import kidViewSoldoutApi from "../../../Api/api_service/kit_view_soldout_api";
import { useFocusEffect } from "@react-navigation/native";
import { connect } from "react-redux";
import { CustomSecondaryButton } from "../../../../skjs_config/CustomComponents/CustomButton";
import * as Print from "expo-print";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MaterialIcons } from "@expo/vector-icons";
import { colors } from "../../../../skjs_config/colors";
import kidOrderList from "../../../Api/api_service/kid_order_estimation";
import { newSaleOrderDetailApi } from "../../../Api/api_service/new_sale_placeorder_api";
import customAlert from "../../../../skjs_config/CustomComponents/CustomAlert";
import { Alert_msg_Text } from "../../../../skjs_config/text";
import { customHtmlPdf } from "../../../../skjs_config/CustomComponents/CustomHtmlForPdf";
function ViewSoldoutPage(props) {
  const [kitDetails, setKitDetails] = useState([]);
  const [viewStockkits, setViewSoldoutKits] = useState([]);

  const customlabelname = {
    kit_id: "Kit id",
    sold_total_weight: "Sold Nt.wt",
    sold_total_pairs: "Sold Pairs",
    sold_total_pcs: "Sold Pcs",
  };
  const getDetils = (order_id, cus_id, estno) => {
    newSaleOrderDetailApi(order_id, cus_id).then((res) => {
      if (res.status === 200 && res.data.success) {
        productDetailPdf(res.data, estno);
      } else {
        customAlert({
          heading: Alert_msg_Text.alert_msg_HeadingOne,
          description: Alert_msg_Text.alert_msg_descriptionFour,
          successText: Alert_msg_Text.alert_msg_successOne,
          onPress: () => console.log("OK Pressed"),
        });
      }
    });
  };
  const orderEstimation = (order_id, cus_id) => {
    kidOrderList(order_id, cus_id).then((res) => {
      if (res.status === 200 && res.data.success) {
        createEstimationPDF(res.data);
        // setOrderEstimationData(res.data)
      } else {
        customAlert({
          heading: Alert_msg_Text.alert_msg_HeadingOne,
          description: Alert_msg_Text.alert_msg_descriptionFour,
          successText: Alert_msg_Text.alert_msg_successOne,
          onPress: () => console.log("OK Pressed"),
        });
      }
    });
  };
  useFocusEffect(
    useCallback(() => {
      // getItems()
      kidViewSoldoutApi(
        props.loginData.data.emp_id,
        props.route.params.kitId
      ).then((res) => {
        if (res.status === 200 && res.data.success) {
          let obj = res.data.solddetail[0];
          let kitDetailss = [];
          for (const property in obj) {
            property !== "id" &&
              kitDetailss.push({
                key: customlabelname[property],
                value: obj[property] != null ? obj[property] : 0,
              });
          }
          const cudtomerdet = res.data.customerdetail.map((response, index) => {
            let nopcspairs = `${response.pcs} pcs \n${response.pair} pair`;
            let weight = response.weight;
            return {
              sno: index + 1,
              sealname: response.sealname,
              estno: response.estno,
              city: response.city,
              nopcspairs: nopcspairs,
              weight: weight,
              E: (
                <TouchableOpacity
                  onPress={() => orderEstimation(response.orderid, response.id)}
                >
                  <MaterialIcons
                    name="picture-as-pdf"
                    size={24}
                    color={colors.successColor}
                  />
                </TouchableOpacity>
              ),
              D: (
                <TouchableOpacity
                  onPress={() =>
                    getDetils(response.orderid, response.id, response.estno)
                  }
                >
                  <MaterialIcons
                    name="picture-as-pdf"
                    size={24}
                    color={colors.successColor}
                  />
                </TouchableOpacity>
              ),
            };
          });
          setKitDetails(kitDetailss);
          setViewSoldoutKits(cudtomerdet);
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

  const createEstimationPDF = async (data) => {
    console.log("estimation", data);
    const tableFieldName = data.orderdetail.estdetail.map((obj) => {
      return {
        sno: obj.sno,
        info: obj.info,
        cat: obj.cat,
        tot: obj.tot,
        weight: obj.weight,
        qty: obj.qty,
        pure: obj.pure,
      };
    });
    const tableHeadingName = [
      "S.no",
      "Info",
      "PKT",
      "Pcs/Pair",
      "Wt",
      "Qty",
      "Pure",
    ];
    const heading = {
      title1: "Estimation Only",
      title2: "GST and Other Tax Applicable",
      value1: `W: ${data.userdetail[0][0].oldweight}`,
      value2: `A: ${data.userdetail[0][0].oldamt}`,
    };
    const detailsOfKeyAndValueHeading = [{
      key: "Seal Name",
      value: data.userdetail[0][0].seal_name
    }]
    const detailsOfKeyAndValue = [
      { key: "Bill Weight", value: data.orderdetail.totweight },
      { key: "Bill Pure", value: data.orderdetail.totpure },
      {
        key: `No of pairs(${data.orderdetail.totpair}X2 pcs)`,
        value: Number(data.orderdetail.totpair) * 2,
      },
      { key: `No of Pieces`, value: data.orderdetail.totpcs },
      {
        key: `Hallmark Amount (${
          Number(data.orderdetail.totpair) * 2 + Number(data.orderdetail.totpcs)
        }*${data.orderdetail.hallamt})`,
        value: data.orderdetail.tothallmark,
      },
      {
        key: `Total Pure`,
        value: `${(
          Number(data.orderdetail.totpure) +
          Number(data.userdetail[0][0].oldweight)
        ).toFixed(3)}`,
      },
      {
        key: `Total Amount`,
        value: `${
          Number(data.orderdetail.tothallmark) +
          Number(data.userdetail[0][0].oldamt)
        }`,
      },
    ];
    await Print.printAsync({
      // html: createEstimetionHtml(data),
      html: customHtmlPdf({
        tableFieldName,
        tableHeadingName,
        detailsOfKeyAndValue,
        heading,
        estno: data.orderdetail.est_no,
        detailsOfKeyAndValueHeading
      }),
    });
  };
  const productDetailPdf = async (data, estno) => {
    const tableFieldName = data.orderdetail.orderproducts.map((obj) => {
      let huid1 = null;
      let huid2 = null;
      if (obj.huid != null) {
        const huidarray = obj.huid?.split(",");
        if (Array.isArray(huidarray)) {
          huid1 = huidarray[0];
          huid2 = huidarray[1];
        } else {
          huid1 = huidarray;
        }
      }
      return {
        sno: obj.sno,
        skuid: obj.skuid,
        weight: obj.weight,
        huid1: huid1 || "",
        huid2: huid2 || "",
      };
    });
    const tableHeadingName = [
      "S.no",
      "Product number",
      "Weight",
      "Huid 1",
      "Huid 2",
    ];
    const detailsOfKeyAndValue = [
      {
        key: "Total Products",
        value: data.orderdetail.totpair + data.orderdetail.totpcs,
      },
      { key: "No of pairs", value: data.orderdetail.totpair },
      { key: "No of Pieces", value: data.orderdetail.totpcs },
    ];
    const heading = {
      title1: "Product Detail",
    };
    await Print.printAsync({
      html: customHtmlPdf({
        tableFieldName,
        tableHeadingName,
        detailsOfKeyAndValue,
        heading,
        detailsOfKeyAndValueHeading: [],
        name: "detail",
        estno,
      }),
    });
  };

  return (
    <>
      <DefaultViewPage
        routename={props.route.name}
        titlename={[
          "S.no",
          "S Name",
          "E.No",
          "City",
          "No of Pcs/Pairs",
          "Total Net wgt",
          "E",
          "D",
        ]}
        kitDetails={kitDetails}
        kitLists={viewStockkits}
      />
    </>
  );
}
const mapStateToProps = (state) => {
  return {
    loginData: state.Login.data,
  };
};
export default connect(mapStateToProps, null)(ViewSoldoutPage);
