import styled from 'styled-components';
import theme from '../../themes/theme';

export const AppLayoutWrapper = styled.div`
    display: flex;
    -webkit-flex-direction: column;
    -ms-flex-direction: column;
    -webkit-flex-direction: column;
    -ms-flex-direction: column;
    flex-direction: column;
    height: 100vh;
    background-color:${theme.colors.background};
    width: 100vw;
    -webkit-align-content: center;
    -ms-flex-line-pack: center;
    align-content: flex-start;
    -webkit-align-items: flex-end;
    -webkit-box-align: flex-end;
    -ms-flex-align: flex-end;
    align-items: flex-end;
    overflow:hidden;
    `;


export const OutletWrapper = styled.div`
    width:87%;
    justify-content: center;
    overflow-y: scroll;;
    overflow-x:hidden;

    background-color:red;
    //padding:2vw;   
    background-color:${theme.colors.background};
    //position:fixed;
    // left:0;
    // height: 100%;
    display:flex;
    //justify-content: center;
    margin-top:${theme.size.headerHeight};
    // min-height:100vh;
    //overflow-y:scroll;
`;
