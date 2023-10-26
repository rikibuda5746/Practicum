import styled from "styled-components";
import {Button, DialogContent, Table, TableCell, TableContainer} from '@mui/material';


export const DivFlexhigt=styled(DialogContent)`
&&{
min-width: 400px;   
border-top: solid 3px #08737d;
color: rgba(0, 0, 0, 0.87);
font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
}
`;

export const TableCellMe=styled(TableCell)`&&{
  border-bottom: 1px solid ${props=>props.theme.colors.primary};
  border-top: 1px solid ${props=>props.theme.colors.primary};
}`

export const ButtonMe=styled(Button)`&&
{
    color: ${props=>props.theme.colors.primary};   
}
`;

export const TableMe = styled(TableContainer)`&&
position: relative;
overflow: scroll;
`;









