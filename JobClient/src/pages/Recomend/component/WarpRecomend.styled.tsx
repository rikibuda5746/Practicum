import styled from "styled-components";

export const RecommendWrapper = styled.div`
    display: flex;
    justify-content: center;
`;
export const FormStyled = styled.form`
display: flex;
flex-wrap: wrap;
justify-content: center;
align-items: center;
margin-right: auto;
margin-left:auto;
`;
export const FormRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-bottom: 10px;
  flex-basis: 100%;
  @media (min-width: 768px) {
    flex-basis: 50%;
  }
  @media (min-width: 1024px) {
    flex-basis: 22.5%;
  }
`;