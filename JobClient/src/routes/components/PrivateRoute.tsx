import React from "react";
import { Navigate, Route } from "react-router-dom";
import { Lock } from "../../components";
import { AppRoutesEnum } from "../modules/constants";

interface PrivateRouteProps {
  children: React.ReactElement;
  isLoggedin: boolean;
  path: string;
  allowed: boolean;
}

const PrivateRoute: React.FC<PrivateRouteProps> = (props) => {
  const { children, isLoggedin, path, allowed } = props;
  const Page = allowed ? (
    children
  ) : (
    <div>
      <p>locked</p>
      <Lock />
    </div>
  )
  return isLoggedin ? (
    Page
  ) : (
    <div>
      <p>not logged in</p>
      <Navigate to={AppRoutesEnum.AUTH} replace state={{ from: path }} />
    </div>
    // <Navigate to={AppRoutesEnum.AUTH} replace state={{ from: path }} />
    // <Navigate to={AppRoutesEnum.MANAGERJOBS} replace state={{ from: path }} />  
  );
};

export default PrivateRoute;
