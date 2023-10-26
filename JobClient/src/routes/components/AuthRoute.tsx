import React from "react";
import { Navigate, useLocation } from "react-router-dom";

interface AuthRouteProps {
  children: React.ReactElement;
  isLoggedin: boolean;
}
const AuthRoute: React.FC<AuthRouteProps> = (props) => {
  const location = useLocation();
  const { state } = location;
  const { children, isLoggedin } = props;
  return isLoggedin ? <Navigate to={state.from ?? "/"}></Navigate> : children;
};

export default AuthRoute;
