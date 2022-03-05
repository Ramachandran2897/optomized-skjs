import { StyledPrimaryCard } from "../CustomStyledComponents/StyledCard"
export const CustomPrimaryCard = (props)=>{
    const {children} = props
    return(
        <StyledPrimaryCard>{children}</StyledPrimaryCard>
    )
}