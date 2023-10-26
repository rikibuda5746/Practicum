import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { actions, selectors } from "../../redux/data/user";
import { AppRoutesEnum, Role } from "../../routes/modules/constants";
import { AppLayoutWrapper, OutletWrapper } from "./AppLayout.styled";
import Header from "./Header";
import IListItem, { CANDIDATESLIST, FAVORITEMANAGER, HOME, JOBS, MANAGERJOBS, PERSNALDETAILS, PUBLISHNEWJOB, SEARCH, USERJOBS } from "./Section/modules/constant";
import Sidebar from "./sidebar";
import { useEffect } from "react";

const AppLayout = () => {


  const isLoggedin = !!useSelector(selectors.getUserId);
  const userRole = useSelector(selectors.getUserRole);
  console.log("userRole  ",userRole);
  
  const MENUGUEST: Array<IListItem> = [
  { text: SEARCH, path: AppRoutesEnum.JOBSLIST, icon: "search" },
  { text: JOBS, path: AppRoutesEnum.JOBSLIST, icon: "jobs" },
  { text: HOME, path: AppRoutesEnum.HOME, icon: "home" }]

  const MENUUSER: Array<IListItem> = [
  { text: HOME, path: AppRoutesEnum.HOME, icon: "home" },
  { text: JOBS, path: AppRoutesEnum.JOBSLIST, icon: "search" },
  { text: PERSNALDETAILS, path: AppRoutesEnum.ROUTEEPROCESSREGISTRATION, icon: "personal" }, 
  { text: USERJOBS, path: AppRoutesEnum.JOBSAPPLYFOR, icon: "jobs" }, 
  ]
  const MENUMANAGER: Array<IListItem> = [
  { text: HOME, path: AppRoutesEnum.HOME, icon: "home" },
  { text: CANDIDATESLIST, path: AppRoutesEnum.CANDIDATE, icon: "search" },
  { text: MANAGERJOBS, path: AppRoutesEnum.MANAGERJOBS, icon: "search" },
  { text: PUBLISHNEWJOB, path: AppRoutesEnum.ADDNEWJOB, icon: "jobs" },
  { text: FAVORITEMANAGER, path: AppRoutesEnum.FAVORITEMANAGER, icon: "jobs" },
  { text: PERSNALDETAILS, path: AppRoutesEnum.ROUTEEPROCESSREGISTRATION, icon: "personal" }, 


  ]
    
  return (
    <AppLayoutWrapper>
      <Header />
      <div style={{height: 100}} />
      { 
        // userRole == Role.GUEST ?
        //   <Sidebar content={MENUGUEST} />
        //    : userRole == Role.USER ? 
           <Sidebar content={MENUUSER} />
        //     :
        //  <Sidebar content={MENUMANAGER} />
      }
      <OutletWrapper><Outlet /></OutletWrapper>
    </AppLayoutWrapper>
  );
};

export default AppLayout;
