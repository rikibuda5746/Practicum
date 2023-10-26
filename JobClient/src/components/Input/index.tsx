
import React from "react";
import { CardContent, CardHeader } from "@mui/material";
import {TextField,TextFieldProps} from '@mui/material';
import { TextFieldStyled } from "./Input.styled";

export interface InputProps {
  variant?: React.ReactNode;
}

const Input: React.FC<InputProps & TextFieldProps> = (props) => {
  const { variant,onChange,error,helperText,placeholder,...rest} = props;
  return (
    <TextFieldStyled
    sx={{ m: 1, minWidth: 214 }}
    onChange={onChange}
    error={error}
    helperText={helperText}
    placeholder={placeholder}
    {...rest}
    />
  );
};

export default Input;
