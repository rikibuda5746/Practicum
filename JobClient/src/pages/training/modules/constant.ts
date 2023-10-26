import * as yup from 'yup';
import { ITraining } from './interfaces';
import { FormikErrors, FormikValues } from 'formik';

export const validationSchema = yup.object({
    
    placeTraining: yup
        .string()
        .required("שדה חובה"),

    fromYear: yup
        .number()
        .required("שדה חובה"),
    toYear: yup
        .number()
        .required("שדה חובה"),
        

    typeOfTraining: yup
        .string()
        .required("שדה חובה")
    ,

    note: yup
        .string()
        .required("")
    ,
});