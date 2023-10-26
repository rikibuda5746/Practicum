import { Drawer, List, ListItemText } from "@mui/material";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import  theme  from "../../../themes/theme";

export const DrawerWrapper = styled(Drawer)(({ theme }) => ({
    '&': {
        width: '10vw',

        flexShrink: 0,
        '& .MuiDrawer-paper': {
            width: '13vw',
            marginTop: `82px`,
            minWidth: '200px',
            boxSizing: 'border-box',
            backgroundColor: theme.colors.neutralDark,
            '& .MuiList-padding': {
                paddingTop: 0,
            },
            '&.MuiListItem-gutters': {
                padding: '5%',
            },
        },
    },
}));

export const ListWrapper = styled(List)(({ theme }) => ({
    '&': {
        '& .MuiFormControl-root': {
            width: '100%',
            fontSize: theme.fonts.biggerFontSize,
            margin: 0,
        },
    },
}));

export const ListItemTextWrapper = styled(ListItemText)(({ theme }) => ({
    '&': {
        '& .MuiTypography-root': {
            textAlign: 'start',
            color: theme.colors.appWhite,
            fontFamily: theme.fonts.normalFontFamily,
            paddingInlineStart: '5%',
        },
    },

}));


export const ListItemWrapper = styled(NavLink)`
    text-decoration: none;
    width:100%;            
    &.active{
        // background-color: ${props => props.theme.colors.neutralDarker};
        border-radius: 25px 0px 0px 25px;
        // box-shaow: inset 0px 2px 4px rgba(0, 0, 0, 0.25);          
        //   padding-block:5%;
        & .MuiTypography-root{
            color: ${props => props.theme.colors.primaryLighter};
            font-weight: bold;


        }
    }
`

