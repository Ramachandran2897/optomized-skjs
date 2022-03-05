import React, { memo, forwardRef } from "react";
import { Dimensions, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { StyledPrimaryTextArea } from "../CustomStyledComponents/StyledTextArea";
const deviceWidth = Math.round(Dimensions.get("window").width);

export const CustomPrimaryTextArea = memo(
  forwardRef((props, ref) => {
    return (
      <StyledPrimaryTextArea
        ref={ref}
        {...props}
        multiline={true}
        numberOfLines={5}
      />
    );
  })
);
