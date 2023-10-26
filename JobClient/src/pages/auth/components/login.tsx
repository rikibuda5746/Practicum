
import React, { useEffect, useState } from "react";
import Card from '@material-ui/core/Card';
import { makeStyles } from '@material-ui/core/styles';
import {Input} from "../../../components";
import {CardActions,Dialog} from "@mui/material";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "../../../components";
import { validationSchemaLogin } from "../modules/constant";
import { loginFormValues } from "../modules/interfaces";
import { actions, selectors } from "../../../redux/data/user/modules/slice";
import { FormStyled, Label, LoginWrapper, LoginWrapperInputs } from "./login.styled";
import { AiOutlineClose } from "react-icons/ai"

const useStyles = makeStyles({
  root: {
    minWidth: 350,
    maxWidth:400,
    minHeight:400,
    display:'flex',
    justifyContent: 'center',
  },
});

const Login: React.FC<{open: boolean,onClose:any}> = (props) => {
  const [falsePassword,setFalsePassword]=useState(false)
  const [showPassword, setShowPassword] = useState(false);
  const [submited, setsubmited] = useState(false);
  const success =useSelector(selectors.getSuccessLogin)
  const dispatch = useDispatch();
  const entering="כניסה"
  const connect=" התחבר"

  const formik = useFormik<loginFormValues>({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: validationSchemaLogin,
    onSubmit: (values) => { 
    dispatch(actions.onLogin(values));
    dispatch(actions.onLoginToDB(values)) 
  }});

  useEffect(()=>{
    success?
    LoginSuccess()
    :
    LoginNoSuccess()
  },[success])
  const LoginNoSuccess =()=>{
    console.log("LoginNoExist")
    setFalsePassword(true);
    // לרוקן את שדה סיסמא
    formik.setFieldValue("password","",false)
    formik.setFieldValue("username","",false)
  }

  const LoginSuccess =()=>{
    console.log("LoginSuccess")
    setsubmited(true);
    closeScreen();
    setFalsePassword(false)
  }

  const closeScreen=()=>{
    props.onClose()
  }

  const classes=useStyles()
  return (
<Dialog open={props.open}>
    <LoginWrapper>
      <AiOutlineClose onClick={()=>closeScreen()}/>
      <FormStyled onSubmit={formik.handleSubmit}>
        <Card className={classes.root}>
           <CardActions>
            <LoginWrapperInputs>
              <Label>{entering}</Label>
              <Input    
                name="username"
                onChange={formik.handleChange}
                error={formik.touched.password && Boolean(formik.errors.username)}
                helperText={formik.touched.password && formik.errors.username}
                placeholder="שם משתמש"
                value={formik.values.username}
              />
              <Input 
                name="password"
                onChange={(text)=>formik.setFieldValue("password", text.target.value,false)}
                error={formik.touched.password && Boolean(formik.errors.password)}
                helperText={formik.touched.password && formik.errors.password}
                placeholder="סיסמא"
                type={showPassword ? 'text' : 'password'}
                value={formik.values.password}

              />
              {(falsePassword && submited)?<p>  נתון שגוי</p>:""}
              <Button variant="contained" type="submit" >{connect}</Button>        
            </LoginWrapperInputs>
          </CardActions>
        </Card>
      </FormStyled>
     
    </LoginWrapper>
    </Dialog>
  );
};

export default Login

