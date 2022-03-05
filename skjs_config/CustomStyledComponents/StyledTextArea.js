import styled from "styled-components";
import { colors } from "../colors";
import { fontSize } from "../fontSize";

export const StyledPrimaryTextArea = styled.TextInput`
color: ${colors.textsecondaryColor};
padding-left: 10px;
font-size: 14px;
border-radius: 6px;
border-width: 1px;
border-color: ${colors.placholderTextColor};
`;