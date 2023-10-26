import { Button } from "@mui/material";
import styled from "styled-components";

export const ButtonStyled = styled(Button)`
&&{
    background-color:${props => props.theme.colors.button} ;
    color:${props => props.theme.colors.appWhite};
    margin:20px;
    border-radius:20px;
    display: flex;
    align-items: flex-start;
    padding: 7px 61px;
    gap: 10px;

    &:hover{
        background-color:${props => props.theme.colors.buttonDark} ;
    }
}`;