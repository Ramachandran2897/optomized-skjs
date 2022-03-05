import styled from "styled-components";
import { Dimensions } from "react-native";
import { colors } from "../colors";
import { fontSize } from "../fontSize";
const deviceWidth = Math.round(Dimensions.get("window").width);
//30
// padding: 10px ${deviceWidth/40}px;
export const StyledSecondaryButton = styled.TouchableOpacity`
  background: ${colors.secondaryColor};
  padding: 10px 15px;
  border-radius: 5px;
`;
export const DefaultPrimaryButton = styled.TouchableOpacity`
  background-color: ${colors.secondaryColor};
  border-radius: 10px;
`;
export const StyledPrimaryButton = styled(DefaultPrimaryButton)`
  width: ${deviceWidth/2.8}px;
  padding: ${deviceWidth/20}px;
  
`;
export const StyledPrimaryButton2 = styled(DefaultPrimaryButton)`
  padding: 15px;
`;
//50
