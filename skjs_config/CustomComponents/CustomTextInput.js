import React, { memo, forwardRef } from "react";
import { Dimensions, TouchableOpacity, View, StyleSheet, Text } from "react-native";
import { StyledTextInputPrimary } from "../CustomStyledComponents/StyledTextInput";
import { Ionicons } from "@expo/vector-icons";
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from "react-native-confirmation-code-field";
const deviceWidth = Math.round(Dimensions.get("window").width);
export const CustomPrimaryTextinput = memo(
  forwardRef((props, ref) => {
    const {
      setpasswordTextVisible,
      passwordTextVisible,
      enablePasswordIcon,
      ...rest
    } = { ...props };
    return (
      <View>
        <StyledTextInputPrimary {...rest} ref={ref} />
        {enablePasswordIcon && (
          <TouchableOpacity
            onPress={() => setpasswordTextVisible(!passwordTextVisible)}
            style={{ position: "absolute", right: 10, top: 15 }}
          >
            <Ionicons
              name={passwordTextVisible ? "eye-sharp" : "eye-off"}
              size={24}
              color="black"
            />
          </TouchableOpacity>
        )}
      </View>
    );
  })
);
export const CustomPrimaryOtpTextinput = memo(
  forwardRef((props, ref) => {
    return (
      <View style={{ width: deviceWidth / 6 }}>
        <StyledTextInputPrimary
          {...props}
          style={{ textAlign: "center", paddingLeft: 0, fontSize: 24 }}
          ref={ref}
        />
      </View>
    );
  })
);

const styles = StyleSheet.create({
  root: { width: "100%", justifyContent: "space-around" },
  cell: {
    width: 55,
    height: 55,
    lineHeight: 38,
    fontSize: 24,
    borderWidth: 2,
    borderColor: "#00000030",
    textAlign: "center",
    marginHorizontal: 5,
  },
  focusCell: {
    borderColor: "#000",
  },
});

export const CustomOtpTextinput = memo(
 forwardRef((props, ref)=>{
   const {onLayout, ...rest} = props
   return(
    <View style={styles.root}>
    <CodeField
      ref={ref}
      {...rest}
      rootStyle={styles.codeFiledRoot}
      keyboardType="number-pad"
      textContentType="oneTimeCode"
      renderCell={({ index, symbol, isFocused }) => (
        <Text
          key={index}
          style={[styles.cell, isFocused && styles.focusCell]}
          onLayout={onLayout(index)}
        >
          {symbol || (isFocused ? <Cursor /> : null)}
        </Text>
      )}
    />
  </View>
   )
 })
)
