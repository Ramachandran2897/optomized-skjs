import React from "react";
import {
  Dimensions,
  View,
  ScrollView,
  TextInput,
  SafeAreaView,
  TouchableHighlight,
  TouchableOpacity,
  Text,
  Image,
  StyleSheet,
} from "react-native";
import { colors } from "../colors";
import { fontSize } from "../fontSize";
import { CustomErrorComponent } from "./CustomText";

export const defaultViewStyles = StyleSheet.create({
  tableHeadingContainer: {
    flex: 1,
    alignSelf: "stretch",
    justifyContent: "center",
    backgroundColor: colors.secondaryColor,
    alignItems: 'center'
  },
  tableHeadingText: {
    textAlign: "center",
    fontSize: fontSize.skjs_quaternary,
    color: colors.ternary,
  },
  tableCellStyle: {
    flex: 1,
    alignSelf: "stretch",
    justifyContent: "center",
    padding: 10,
  },
});

const CustomPrimaryTable = (props) => {
  const { titleArray, valueArray } = props;
  return (
    <>
      <View style={{ flexDirection: "row" }}>
        {React.Children.toArray(titleArray.map((val) => (
          <View style={[defaultViewStyles.tableHeadingContainer, val=="S.no"&&{maxWidth: 50}]}>
            <Text style={defaultViewStyles.tableHeadingText}>{val}</Text>
          </View>
        )))}
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        {valueArray && valueArray.length > 0 ? (
          <View style={{ marginBottom: 20, borderWidth: 0.5 }}>
            {React.Children.toArray(valueArray.map((val, index) => {
              return (
                <View
                  style={[
                    { flex: 1, flexDirection: "row" },
                    index % 2 == 0 && {
                      backgroundColor: colors.card_background_color_primary,
                    },
                  ]}
                >
                  {React.Children.toArray(Object.keys(val).map(function (key, index) {
                    if (key !== "checkboxValue") {
                      return (
                        <View
                          style={[defaultViewStyles.tableCellStyle, (key=="sno" || key == "id") && {maxWidth: 50}]}
                        >
                          <Text style={{ textAlign: "center" }}>
                            {val[key]}
                          </Text>
                        </View>
                      );
                    }
                  }))}
                </View>
              );
            }))}
          </View>
        ) : (
          <View style={{ alignItems: "center", justifyContent: "center" }}>
            <CustomErrorComponent errormessagename={"No Records Found"} />
          </View>
        )}
      </ScrollView>
    </>
  );
};
export default CustomPrimaryTable;
