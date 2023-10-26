import { Avatar } from '@mui/material'; import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actions as authActions } from "../../../pages/auth/modules/slice";
import { AppRoutesEnum, Role } from "../../../routes/modules/constants";
import {
  HeaderWrapper,
  LeftSide,
  Logo,
  NavLinkStyled,
  NavStyled,
  RightSide,
} from "./Header.styled";
import logo from '../../../logo.svg'
import UserDetails from '../../../pages/userDetails';
import { selectors } from '../../../redux/data/user';
import { Login } from '../../../pages';
import Registeration from '../../../pages/registration';
import { actions } from '../../../redux/data/user';
import { selectors as selectorsLogin} from '../../../redux/data/user';
import Button from '../../Button';
const Header = () => {
  const dispatch = useDispatch();

 const [isLogin, setIsLogin]=useState(false);
 const [isRegister, setIsRegister]=useState(false);
  const userRole = useSelector(selectors.getUserRole)
  const userLogin=useSelector(selectorsLogin.getSuccessLogin)

  const handleLogout=()=>{
    dispatch(actions.onLogout())
}

  return (
    <HeaderWrapper>
      <RightSide>
        <Logo imageUrl={logo}></Logo>
      </RightSide>
      <LeftSide>
        {/* <Avatar sx={{ bgcolor: '#8A56F9' }} onClick={() => console.log("onclick avatar")}></Avatar> */}
        <Avatar onClick={() => console.log("onclick avatar")}></Avatar>
        {
          // userRole == Role.GUEST || undefined ?
          <div>
            {userLogin?
            <Button onClick={ ()=> setIsRegister(true)} disabled={true}> הרשם</Button>:<Button onClick={ ()=> setIsRegister(true)}> הרשם</Button>}
            {isRegister?<Registeration open={isRegister} onClose={()=> setIsRegister(false)}/>:""}
            {userLogin?
            <Button onClick={()=>handleLogout()}> התנתק</Button>:
            <Button onClick={ ()=> setIsLogin(true)}> היכנס</Button>}
            {isLogin?<Login open={isLogin} onClose={()=> setIsLogin(false)}/>:""}


          </div>
          // : ''
        }
        <UserDetails></UserDetails>



      </LeftSide>
    </HeaderWrapper>
  );
};

export default Header;
