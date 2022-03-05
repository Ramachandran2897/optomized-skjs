import React, { useState } from "react";
import { colors } from "../colors";
import { Checkbox } from 'react-native-paper';
export const CustomPrimayCheckbox = ({checkedValue}) => {
  const [checked, setChecked] = useState(false);
  return (
    <Checkbox
      status={checked ? "checked" : "unchecked"}
      color={colors.successColor}
      onPress={() => {
        checkedValue(!checked)
        setChecked(!checked);
      }}
    />
  );
};
