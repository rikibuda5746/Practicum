import styled from "styled-components";
import { Button } from "@mui/material";

export const Wrapper = styled.div`
    padding:100px
    width: 80%;
    margin-right: auto;
    display: flex;
    margin-left: auto;
    text-align: center;
    flex-direction: column;
    align-content: center;
    align-items: center;
  
`;

export const FormStyled = styled.form`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap:20px;
`;

export const LabelStyled = styled.label`
margin : 10px;
`;

export const DivDetailsStyled = styled.div`
    display:flex;
    align-items: center;
    width: max-content;
`;

export const BStyeld = styled.b`
display: grid;
margin: auto;
`;

export const DivStyled = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
`;

export const ButtonStyled = styled(Button)`
&&{
background-color  : ${props => props.theme.colors.primary};
color:${props => props.theme.colors.appWhite};
margin:30px;
}`;

export const DivButtons = styled.div`
display:flex;
justify-content:space-between;
justify-content: flex-end;
    align-items: center;
`

export const DivFormWrapper = styled.div`
// width: 80%;
// margin-right: auto;
// margin-left: auto;
// display: flex;
// text-align: center;
// align-items: center;
// justify-content: center;
// flex-direction: column;
margin-left: 12vw;
margin-right: 10vw;
margin-top:7vh;
 h1{
      margin-left: 111%;
      font-weight: normal;
    }
`

