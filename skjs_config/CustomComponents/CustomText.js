import React from 'react'
import { 
    StyledSecondaryButtonText, 
    StyledErrorMessageText,
    StyledPrimaryButtonText,
    StyledHeadingText } from '../CustomStyledComponents/StyledText'
export const CustomSecondaryButtonText = (props)=>{
    const {name} = props
    return(
        <StyledSecondaryButtonText>{name}</StyledSecondaryButtonText>
    )
}
export const CustomPrimaryButtonText = (props)=>{
    const {name, style} = props
    return(
        <StyledPrimaryButtonText style={style}>{name}</StyledPrimaryButtonText>
    )
}
export const CustomHeadingText = (props)=>{
    const {name} = props
    return(
        <StyledHeadingText>{name}</StyledHeadingText>
    )
}
export const CustomErrorComponent = (props) => {
    return (
          <StyledErrorMessageText>{props.errormessagename}</StyledErrorMessageText>
    );
  };