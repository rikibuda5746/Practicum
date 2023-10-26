
import { DateField } from "@mui/x-date-pickers";
import React from "react";
export interface SelectProps {
  variant?: React.ReactNode;
}

const DatePicker: React.FC<any> = (props) => {
  const { variant,onChange,error,...rest} = props;
  return (
    <DateField
    onChange={onChange}
    error={error}
    {...rest}
    />
  );
};

export default DatePicker;