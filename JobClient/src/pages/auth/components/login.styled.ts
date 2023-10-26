import styled from "styled-components";


export const LoginWrapper = styled.div`
    padding:100px
`;

export const FormStyled = styled.form`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap:20px;
    minWidth: 350;
    maxWidth:400;
    minHeight:400;
    display:flex;
    justifyContent: center;
`;

export const LoginWrapperInputs = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: stretch;
    font-size:30px;
`;

export const Label = styled.label`
    text-align: center;
    font-size:30px;
`;