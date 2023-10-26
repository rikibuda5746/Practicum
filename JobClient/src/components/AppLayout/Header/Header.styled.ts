import { NavLink } from "react-router-dom";
import styled from "styled-components";
export const HeaderWrapper = styled.div`
    // // background-color: #8A56F9;
    // display: flex;
    // justify-content: space-between;
    // align-items: center;
    // direction: rtl;
    // z-index:100000;
    // // position:fixed;
    // width:100vw;
    // color: #8A56F9;
    // *:hover{
    //     color: black !important;        
    //     transition: all .4s ease;
    // }

    // **************** from dasi

    display: flex;
    justify-content: space-between;
    align-items: center;
    direction: rtl;
    z-index:100000;
    position:fixed;
    background-color:white;
    width:100vw;
    top:0;
    
`;
interface LogoProps {
    imageUrl: string,
}
export const Logo = styled.div<LogoProps>`
    background-image: url(${props => props.imageUrl});
    background-position: center;
    background-size: contain;
    background-repeat: no-repeat;
    cursor: pointer;

    // padding: 18px;
    // width: 100px;
    // height: 100%;


    // **************from dasi
    width:120px;
    height:56px;
    top:13px;
    left:1315px;
    position: absolute;
    right: 2.38%;
    bottom: 93.32%;
`;
export const NavStyled = styled.nav`
    // display: flex;
    // justify-content: center;
    // gap: 30px;

    // ***************from dasi
    display: flex;
    justify-content: center;
    gap: 10%;
`;
export const NavLinkStyled = styled(NavLink)`
    text-decoration: none;
    padding: 20px;
    color: ${props => props.theme.colors.primary};
    font-weight: 500;
    &.active{
        border-bottom: solid 2px ${props => props.theme.colors.primary};
        // border-bottom: solid 2px  #8A56F9;
    }

`;

export const LeftSide = styled.div` 
    // display: flex;
    // align-items: center;
    gap: 30px;

    // *********from dasi
    background-color: ${props => props.theme.colors.appWhite};
    display: flex;
    align-items: center;
    // gap: 10%;
    right: 21.97%;
    height:100%;
    justify-content: flex-end
    padding-inline:2vh;
`;
export const RightSide = styled.div`
    // display: flex;
    // align-items: center;
    // weight: 200px;

    // ***********from dasi
    // width:1155px;
    left:1487px;
    display: flex;
    align-items: center;
    height:82px;
`;

export const Avatar = styled.img`

// ***********from dasi
    &&{
    cursor: pointer;
        width:34px;
        height:34px;
        top:25px;
        left:275px;  
        :hover{
    cursor:pointer;
        }
    }   
`;