import React, { useEffect, useState } from "react";
import { Route, Routes, BrowserRouter, Navigate } from "react-router-dom";
import { AppLayout } from "../../components";
import { appRoutes, privateRoutes, Role } from "../modules/constants";
import { useDispatch, useSelector } from "react-redux";
import { actions, selectors as userSelectors } from "../../redux/data/user";
import PrivateRoute from "./PrivateRoute";
// import PersonalDetails from "../../pages/registration";

const MainRoutes = () => {

  const dispach = useDispatch()
  // useEffect(() => {
  //   console.log("hello");

    dispach(actions.onUploudSiteAftersaga())
   
  // }, [])
  
  const isLoggedin = !!useSelector(userSelectors.getUserId);
 const user = useSelector(userSelectors.getUserDetails);
  // const userRole = Role.ADMIN

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          {appRoutes.map((route) => (
            <Route key={route.path} path={route.path} element={route.element} />
          ))}
          {privateRoutes.map((route) => (
            <Route
              key={route.path}
              element={
                <PrivateRoute isLoggedin={isLoggedin} path={route.path} allowed={route.roles===null||!!(route.roles?(user.role):'')}>
                  {route.element}
                </PrivateRoute>
              }
              path={route.path}
            />
          ))}
        </Route>
        {/* <Route
          element={
              <PersonalDetails/>
          }
          path={AppRoutesEnum.REGISTRATION}
        ></Route>
         <Route
          element={
            <AuthRoute isLoggedin={isLoggedin}>
               <Login />
            </AuthRoute>
          } 
          path={AppRoutesEnum.AUTH}
        ></Route> */}
      </Routes>
    </BrowserRouter>
  );
};

export default MainRoutes;
