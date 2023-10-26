import { TextField, TextFieldProps } from '@mui/material';
import styled from 'styled-components';


export const TextFieldStyled = styled(TextField)`
&&{
    // padding: 5px;
    border-radius: 5px;
    // border: 1px solid gray;
    flex-basis: 100%;
    @media (min-width: 768px) {
    flex-basis: 50%;
    }
    @media (min-width: 1024px) {
    flex-basis: 100%;
    }
    }
`;
