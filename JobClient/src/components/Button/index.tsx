import React from "react";
import{ButtonProps as MuiButtonProps} from '@mui/material';
import { ButtonStyled } from "./Button.styled";

interface ButtonProps extends MuiButtonProps {

}

const Button: React.FC<ButtonProps> = (props) => {
  const { children, ...rest } = props;
  return (
    <ButtonStyled {...rest}>
        {children}
    </ButtonStyled>
  );
};

export default Button;