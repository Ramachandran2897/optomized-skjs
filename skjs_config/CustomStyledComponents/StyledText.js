import styled from "styled-components";
import { colors } from "../colors";
import { fontSize } from "../fontSize";

export const StyledSecondaryButtonText = styled.Text`
  color: ${colors.ternary};
  text-align: center;
  font-weight: bold;
  font-size: ${fontSize.skjs_quaternary}
  text-transform: uppercase;
`;
export const StyledPrimaryButtonText = styled.Text`
  text-align: center;
  font-size: ${fontSize.skjs_quaternary}px;
  font-weight: bold;
`;
export const StyledHeadingText = styled.Text`
font-size: ${fontSize.heading}px; font-weight: bold;
`
export const StyledErrorMessageText = styled.Text`
color: ${colors.quaternery};
padding-left: 10;
`