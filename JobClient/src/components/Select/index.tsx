import { FormControl, FormHelperText, InputLabel, Select as SelectField, SelectProps as SelectFieldProps } from "@mui/material";
import React from "react";

export interface SelectProps extends SelectFieldProps {
  variant?: any;
  helperText?: string;
}

const Select: React.FC<SelectProps> = (props) => {
  const { variant, onChange, error, helperText, ...rest } = props;
  return (
    <FormControl variant={variant} error={error}>
      <InputLabel>{rest.label}</InputLabel>
      <SelectField
        {...rest}
        onChange={onChange}
        sx={{ m: 1, minWidth: 214 }}
      >
        {rest.children}
      </SelectField>
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  );
};

export default Select;