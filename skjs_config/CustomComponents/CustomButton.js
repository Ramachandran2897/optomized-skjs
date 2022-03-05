import React, {memo} from "react";
import { StyledSecondaryButton } from "../CustomStyledComponents/StyledButton";
import { StyledPrimaryButton } from "../CustomStyledComponents/StyledButton";
import { CustomPrimaryButtonText } from "./CustomText";
import { CustomSecondaryButtonText } from "./CustomText";
import { StyledPrimaryButton2 } from "../CustomStyledComponents/StyledButton";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Button } from 'react-native-paper';
export const CustomSecondaryButton = memo((props) => {
  const { name, onPress, disabled } = props;
  return (
    <StyledSecondaryButton onPress={onPress} disabled={disabled}>
      <CustomSecondaryButtonText name={name} />
    </StyledSecondaryButton>
  );
});
export const CustomPrimaryButton = memo((props) => {
  const { name, onPress, icon, disabled } = props;
  return (
    <StyledPrimaryButton onPress={onPress} disabled={disabled}>
      {icon}
      <CustomPrimaryButtonText name={name} />
    </StyledPrimaryButton>
  );
});
export const CustomPrimaryButton2 = memo((props) => {
  const { name, onPress } = props;
  return (
    <StyledPrimaryButton2 onPress={onPress}>
      <CustomPrimaryButtonText name={name} />
    </StyledPrimaryButton2>
  );
});
export const CustomTernaryButton = memo((props)=>{
  const {name, onPress} = props
  return(
    <Button
          onPress={onPress}
          mode={'contained'}
          color={'#001F7E'}
        >{name}</Button>
  )
})
