import styled from "styled-components";
import theme from "../../../themes/theme";
import { Typography } from "@mui/material";

export const CardStyle = styled.div`

font-family: Rubik;
align-items:center;
z-index: 1;
position: relative;

`;

// export const CollapsedDiv = styled.div`
// height: initial;
// min-height: 50px;
// `;
// export const LeftSide = styled.span`
// text-align: left;
// `;
// export const RightSide = styled.span`
//     display: inline;
//     align-items: center;
// `;
export const JobHeader = styled.div`
border-top-right-radius: 20px;
border-top-left-radius: 20px;
background-color: ${theme.colors.primary};
height:50px;
display: flex;
justify-content: flex-start;
align-items: center;
color: white;
`;

export const Button = styled.button`
flex-direction: row;
align-items: stretch;
padding: 12px 61px;
gap: 10px;
background: ${theme.colors.primary};
border-radius: 20px;
border-width: 0px;
color: white;
width: 140px;
display: flex;
justify-content: space-around;
margin: 5px;

`;

export const LightButton = styled.button`
flex-direction: row;
align-items: stretch;
padding: 12px 61px;
gap: 10px;
background: #83b3ab;
border-radius: 20px;
border-width: 0px;
color: white;
width: 140px;
display: flex;
justify-content: space-around;

`;

export const JobFooter = styled.div`
display: flex;
flex-direction: column;
min-height:50px;
align-items: center;
justify-content: space-between;

`;

export const Card = styled.div`
width: 80%;
margin: 25px;
margin-right: 10%;
border: 2px;
border-style: solid;
border-color: ${theme.colors.primary};
border-radius: 23px;
`;

export const Header = styled.div`
display: flex;
justify-content: flex-end;
margin-left: 14px;
margin-top: -40px;

`;

export const PopUp = styled.div`
width: 370px;
height: 200px;
border: 0.5px;
border-style: solid;
border-color: ${theme.colors.primary};
border-radius: 23px;
margin-right: 30%;
z-index: 4;
font-family: Rubik;
position: relative;

`;

export const PopupButtons = styled.div`
display: flex;
padding-top: 55px;
justify-content: space-evenly;
padding-bottom: 40px;
`;
export const PopupHeader = styled.div`
display: flex;
    justify-content: center;
    color: white;
    border-top-right-radius: 20px;
    border-top-left-radius: 20px;
    background-color: ${theme.colors.primary};
    height:30px;
    align-items: center;
`;

export const CircleButton = styled.button`

background: ${theme.colors.primary};

    width: 40px;
    height: 40px;
    border-radius: 50%;
    border: 0px;
    background: #83b3ab;
    margin-left: 4px;
`;

export const CandidatesButton = styled.div`
display: flex;
justify-content: space-evenly;
padding-bottom: 20px;
    padding-left: 3px;
`;

export const MoreLessDetails = styled.div`
padding: 0px;
padding-right: 2%;
font-size: 30px;
display: flex;
justify-content: start;
width: 100%;
`;

export const StyledTypography=styled(Typography)`&&{
    overflow-x: auto;
    max-width: 100%;
  }`
  


//https://www.youtube.com/watch?v=_YkODU_Yi_o  //------dont forget to earase!!!!