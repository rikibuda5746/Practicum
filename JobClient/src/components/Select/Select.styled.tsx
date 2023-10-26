import { Select } from "@mui/material";
import styled from "styled-components";

export const SelectStyled = styled(Select)`
&&{
   
    color:${props=>props.theme.colors.appWhite};
}`;
// background-color  : ${props=>props.theme.colors.primary};