import {Card} from '@mui/material';
import styled from 'styled-components';
import Title from '../Title';

export const CardStyled = styled(Card)`
&&{
    border-right: solid 5px ${props=>props.theme.colors.primary};
}
`;
export const CardHeader = styled(Title)`
    
`;