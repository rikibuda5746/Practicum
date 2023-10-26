import React from "react";
import { CardStyled } from "./Card.styeld";
import { CardContent, CardHeader,CardProps as MuiCardProps,CardHeaderProps } from "@mui/material";
interface CardProps extends MuiCardProps {
  header?: CardHeaderProps;
  content?: React.ReactNode;
  actions?: React.ReactNode;
}

const Card: React.FC<CardProps> = (props) => {
  const { header, content, actions } = props;
  return (
    <CardStyled sx={{ minWidth: 275 }}>
      {header && <CardHeader {...header}></CardHeader>}
      {content &&  <CardContent>{content}</CardContent>}
      {actions &&  <CardContent>{actions}</CardContent>}
    </CardStyled>
  );
};
export default Card;