import React, { FC, ReactNode } from "react";
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { actions } from "../modules/slice";
import { validationSchema } from "../../Recomend/modules/constant";
import { All } from "./InsertRecomend.styled";
import { Form } from "./InsertRecomend.styled";
import { RecommendAllDetails } from "../modules/interface";
import { BStyeld, DivDetailsStyled, DivStyled } from "../../../components/FormStyeld/form.styeld";
import { number } from "yup";
import { selectors as selectorsRecomends} from "../modules/slice"
import { Button, Input, Select } from "../../../components";
import backendService from "../../../service/backendService";
import { Item } from '../../interface';
import { FormControl, MenuItem, SelectChangeEvent } from "@mui/material";
import { RiDeleteBin6Line } from "react-icons/ri";


interface Props{
  index:number,
  recomend: RecommendAllDetails,
  length: number,
  isFill:boolean,
  initialValues: RecommendAllDetails
}

  const InsertRecommend = ({index,recomend,length,isFill, initialValues}: Props): JSX.Element => {

 const dispatch = useDispatch();

 const nameName="שם";
 const phoneName="פלאפון";
 const roleName="תפקיד";
 const mailName="מייל";
 const noteName="הערות";


 const [jobs, setJobs]: [Item[], Function] = useState([]);

 useEffect(() => {
     const fetchData = async () => {
         try {
             setJobs((await (backendService.getSelect({ tableName: "dbo.Jobs", idColumnName: "iJobId", valueColumnName: "nvJobName" }))).data);

         } catch (error) {
             console.error(error);
         }
     };
     fetchData();
 }, []);

 
  const formik = useFormik<RecommendAllDetails>({
    initialValues: {
      iJobsStockId:recomend.iJobsStockId ?? "",
      nvName: recomend.nvName ?? "",
      nvPhone: recomend.nvPhone ?? "",
      nvJob: recomend.nvJob ?? "",
      nvEmail: recomend.nvEmail ?? "",
      Note: recomend.Note ?? "",
      iRecommenId: recomend.iRecommenId ?? "",
      iUserId: recomend.iUserId ?? ""
    },
    validationSchema: validationSchema,
    onSubmit: (values): void => {
      alert("submit")
      dispatch(actions.onAddRecomend());
    },
  })

  useEffect(()=>{
    formik.setFieldValue('nvName',recomend.nvName?? "",false)
    formik.setFieldValue('nvPhone',recomend.nvPhone?? "",false)
    formik.setFieldValue('nvJob', recomend.nvJob?? "",false)
    formik.setFieldValue('nvEmail',recomend.nvEmail?? "",false)
    formik.setFieldValue('Note',recomend.Note?? "",false)
  },[recomend])

  const setName=(e:string)=>{
    console.log("e",e);
    formik.handleBlur(e);
    // formik.handleChange(e);
    // formik.setFieldValue('nvName', e.target.value);
    // dispatch(actions.saveDetails({"index":index,"filedName":"nvName","value":formik.values.nvName}));
    // console.log("formik.values.nvName",formik.values.nvName)
    dispatch(actions.saveDetails({"index":index,"filedName":"nvName","value":formik.values.nvName}));

  }
  const setPhone=(e:any)=>{
    formik.handleBlur(e);
    formik.setFieldValue('nvPhone', e.target.value);
    dispatch(actions.saveDetails({"index":index,"filedName":"nvPhone","value":formik.values.nvPhone}));
  }
  // const setRole=(e:any)=>{
  //   formik.handleBlur(e);
  //   formik.setFieldValue('nvJob', e.target.value);
  //   dispatch(actions.saveDetails({"index":index,"filedName":"nvJob","value":formik.values.nvJob}));
  // }

  const setRole = (e: SelectChangeEvent<unknown>) => {
    formik.handleChange(e)
    formik.setFieldValue('nvJob', e.target.value, false)
    dispatch(actions.saveDetails({ 'index': index, "filedName": "nvJob", "value": e.target.value as string }))
}

  const setMail=(e:any)=>{
    formik.handleBlur(e);
    formik.setFieldValue('nvEmail', e.target.value);
    dispatch(actions.saveDetails({"index":index,"filedName":"nvEmail","value":formik.values.nvEmail}));
  }
  const setNote=(e:any)=>{
    formik.handleBlur(e);
    formik.setFieldValue('Note', e.target.value);
    dispatch(actions.saveDetails({"index":index,"filedName":"Note","value":formik.values.Note}));
  }

  return (
   <div>
            <form onSubmit={formik.handleSubmit}>
            <DivDetailsStyled>
            <DivStyled>
            <BStyeld>{nameName}
            <Input 
            name="nvName"
            value={formik.values.nvName}
            onBlur={(e: any) => setName(e)} 
            onChange={formik.handleChange}
            error={Boolean(formik.errors.nvName)}
            helperText={formik.errors.nvName}
            // error={formik.touched.nvName && Boolean(formik.errors.nvName)}
            // helperText={formik.touched.nvName && formik.errors.nvName}
            // fullWidth
            />
            </BStyeld>
            </DivStyled>

            <DivStyled>
            <BStyeld>{phoneName}
            <Input 
            name="nvPhone"
            value={formik.values.nvPhone}
            onBlur={(e: any) => setPhone(e)} 
            onChange={formik.handleChange}
            error={formik.touched.nvPhone && Boolean(formik.errors.nvPhone)}
            helperText={formik.touched.nvPhone && formik.errors.nvPhone}
            fullWidth
            />
            </BStyeld>
            </DivStyled>

            {/* <DivStyled>
            <BStyeld>{roleName}
            <Input 
            name="nvJob"
            value={formik.values.nvJob}
            onBlur={(e: any) => setRole(e)}
            onChange={formik.handleChange}
            error={formik.touched.nvJob && Boolean(formik.errors.nvJob)}
            helperText={formik.touched.nvJob && formik.errors.nvJob}
            fullWidth
            />
            </BStyeld>
            </DivStyled> */}


            <DivStyled><BStyeld>{roleName}
                        <FormControl sx={{ m: 1, minWidth: 214 }}>
                            <Select
                                name="job"
                                value={formik.values.nvJob}
                                onChange={(e: SelectChangeEvent<unknown>, child: ReactNode) => setRole(e)}
                                onBlur={formik.handleBlur}
                                error={Boolean(formik.errors.nvJob)}
                                helperText={formik.errors.nvJob ? "" + formik.errors.nvJob : ""}
                            >
                                {jobs.map((job: Item) => (
                                    <MenuItem value={job.id}>{job.value}</MenuItem>
                                ))}

                            </Select>
                        </FormControl>
                    </BStyeld>
                    </DivStyled>


            <DivStyled>
            <BStyeld>{mailName}
            <Input 
            name="nvEmail"
            value={formik.values.nvEmail}
            onBlur={(e: any) => setMail(e)} 
            onChange={formik.handleChange}
            error={formik.touched.nvEmail && Boolean(formik.errors.nvEmail)}
            helperText={formik.touched.nvEmail && formik.errors.nvEmail}
            fullWidth
            />
            </BStyeld>
            </DivStyled>

            <DivStyled>
            <BStyeld>{noteName}
            <Input 
            name="Note"
            value={formik.values.Note}
            onBlur={(e: any) => setNote(e)} 
            onChange={formik.handleChange}
            error={formik.touched.Note && Boolean(formik.errors.Note)}
            helperText={formik.touched.Note && formik.errors.Note}
            fullWidth
            />
            </BStyeld>
            </DivStyled>
            {/* <Button onClick={() => dispatch(actions.onRemoveRecomend({index :index, recomend:recomend}))}>{deleteName}</Button> */}
            <RiDeleteBin6Line title='מחיקה' fontSize="80px" style={{marginRight:"1vw"}} onClick={() => dispatch(actions.onRemoveRecomend({ index :index, recomend:recomend }))}/>
            </DivDetailsStyled>
            </form>
            </div>
  )
}
export default InsertRecommend;





