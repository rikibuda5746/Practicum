import React from "react";
import { Button, Input } from "../../../components";
import { useDispatch,useSelector } from "react-redux";
import { useFormik } from "formik";
import { RegistrationFormValues } from "../modules/interfaces";
import { validationSchemaRegisteration } from "../modules/constant";
import { validationSchemaLogin } from "../../auth/modules/constant";
import { actions,selectors } from "../../../redux/data/user";
import { FormStyled } from "./Registration.styled";
import { useState,useEffect } from "react";
import { loginFormValues } from "../../auth/modules/interfaces";
import { Label } from "../../auth/components/login.styled";
import {Dialog} from "@mui/material";
import { AiOutlineClose } from "react-icons/ai"
import { actions as actionsRegisteration,selectors as selectorsRegisteration } from "../modules/slice";
import { useNavigate } from "react-router-dom";


export const Registeration: React.FC<{open: boolean,onClose:any}>=(props)=>{
   
    const dispach=useDispatch();
    const [isRegistered,setisRegistered]=useState(false)
    const [falsePassword,setFalsePassword]=useState(false)
    const [showPassword, setShowPassword] = useState(false);
    const [submited, setSubmited] = useState(false);
    const success =useSelector(selectors.getSuccessLogin)
    const successRegi=useSelector(selectors.getSuccessRegisteration)
    const navigate=useNavigate();

    const register="הרשם"
    const registeration="הרשמה"
    const connect="התחבר"

    const formikRegisteration=useFormik<RegistrationFormValues>({
      initialValues:{
        username:"",
        email:"",
        firstname:"",
        lastname:"",
      },
      validationSchema:validationSchemaRegisteration,
      onSubmit:(values) =>{
       setisRegistered(true);
       dispach(actions.onRegisteration(values))
      }
    })

    const formikLogin=useFormik<loginFormValues>({
     initialValues:{
      username:"",
      password:"",
     },
     validationSchema:validationSchemaLogin,
     onSubmit:(values)=>{
      dispach(actions.onLogin(formikLogin.values))
     }
  })

  const submit = (event: React.FormEvent<HTMLFormElement>) => {
     event.preventDefault();
     const username:string=formikRegisteration.values.username
     const email:string=formikRegisteration.values.email;
     const firstname:string=formikRegisteration.values.firstname;
     const lastname:string=formikRegisteration.values.lastname;
     const password:string=formikLogin.values.password;
     dispach(actions.onLogin({username,password}));
     dispach(actionsRegisteration.onRegisteration({username,email,firstname,lastname,password}));
   };

    useEffect(()=>{
      success?
     LoginSuccessFunc()
    :LoginNoExistFunc()  
   },[success])
 

   const LoginSuccessFunc =()=>{
     closeScreen();
     navigate("/RouteProcessRegistration")
     setFalsePassword(false)
     setSubmited(true);
   }
  
   const LoginNoExistFunc =()=>{
     console.log("LoginNoExist")
     setFalsePassword(true);
     formikLogin.setFieldValue("password","",true)
   }

   const closeScreen=()=>{
     props.onClose()
   }
    

    return(

      <>
    <Dialog open={props.open}>
     <AiOutlineClose onClick={()=>closeScreen()}/>
        <FormStyled onSubmit={formikRegisteration.handleSubmit}>
          <Label>{registeration}</Label>
          <Input
                                     
              name="username"
              value={formikRegisteration.values.username}    
              onChange={formikRegisteration.handleChange}
              error={formikRegisteration.touched.username&&Boolean(formikRegisteration.errors.username)}
              helperText={formikRegisteration.touched.username&&formikRegisteration.errors.username}
              placeholder="שם משתמש"
         />
         <Input
              name="email"
              value={formikRegisteration.values.email}
              onChange={formikRegisteration.handleChange}
              error={formikRegisteration.touched.email&&Boolean(formikRegisteration.errors.email)}
              helperText={formikRegisteration.touched.email&&formikRegisteration.errors.email}
              placeholder="אימייל"
         />
         <Input
              name="firstname"
              value={formikRegisteration.values.firstname}
              onChange={formikRegisteration.handleChange}
              error={formikRegisteration.touched.firstname&&Boolean(formikRegisteration.errors.firstname)}
              helperText={formikRegisteration.touched.firstname&&formikRegisteration.errors.firstname}
              placeholder="שם פרטי"
         />
         <Input
              name="lastname"
              value={formikRegisteration.values.lastname}
              onChange={formikRegisteration.handleChange}
              error={formikRegisteration.touched.lastname&&Boolean(formikRegisteration.errors.lastname)}
              helperText={formikRegisteration.touched.lastname&&formikRegisteration.errors.lastname}
              placeholder="שם משפחה"
         />
     {!isRegistered?
       <Button variant="contained" type="submit">
        {register}
       </Button>
       :""}
          </FormStyled>
          {successRegi?<>
          {isRegistered?

         <FormStyled onSubmit={submit}>

          <p> סיסמת זמנית נשלחה למייל וניתן להחליפה תוך 14 יום</p>
         <Input
              name="password"
              value={formikLogin.values.password}
              onChange={(text)=>formikLogin.setFieldValue("password", text.target.value,false)}
              error={formikLogin.touched.password&&Boolean(formikLogin.errors.password)}
              helperText={formikLogin.touched.password&&formikLogin.errors.password}
              type={showPassword ? 'text' : 'password'}
         />
          {(falsePassword && submited && successRegi)?<p>סיסמא לא תקינה</p>:""}
         <Button  variant="contained"  type="submit" disabled={formikLogin.values.password.length<8}>
          {connect}
         </Button>
         </FormStyled>:""}
         </>:""}
          </Dialog>    
          </>
    );
};
