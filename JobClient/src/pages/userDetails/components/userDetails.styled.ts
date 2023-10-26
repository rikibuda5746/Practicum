import styled from "styled-components";

export const Line = styled.div`
    display: inline-flex;
    font-family: ${props => props.theme.fontFamilies.headerFontFamily};
    font-style: normal;
    font-weight: ${props => props.theme.Weights.headerLightFontWeight};
    font-size: ${props => props.theme.fonts.normalFontSize};
    margin: 0;
    width: fit-content;
    height: 15px;
    width: 265px;
    left: 0px;
    top: 18px;
    border-radius: nullpx;
    line-height: 17px;
    letter-spacing: 0em;
    text-align: right;
`;

export const ThinLine = styled.div`
    display: inline-flex;
    font-family: ${props => props.theme.fontFamilies.headerFontFamily};
    font-style: normal;
    font-weight: ${props => props.theme.Weights.headerLightFontWeight};
    font-size: ${props => props.theme.fonts.smallFontSize};
    margin: 0;
    width: fit-content;
    height: 14.88px;
    width: 227.27px;
    left: 38px;
    top: 51.12px;
    border-radius: nullpx;
    line-height: 14.22px;
    letter-spacing: 0em;
    text-align: right;
`;

export const BoldLine = styled.div`
    display: inline-flex;
    font-family: ${props => props.theme.fontFamilies.headerFontFamily};
    font-style: normal;
    font-weight: ${props => props.theme.Weights.headerBoldFontWeight};
    font-size: ${props => props.theme.fonts.biggerFontSize};
    line-height: 17px;
    text-align: right;
    margin: 0;
    width: fit-content;
    width:211.5px;
    height:18.8px;
    top:31.32px;
    left:52.84px;
`;

export const LinesWrapper = styled.div`
    display:flex;
    flex-direction:column;
    width: 30%;
`;

export const Item = styled.p`
    margin: 0;
    margin-left:0.3vw;
`;