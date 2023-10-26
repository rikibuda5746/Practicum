import React from 'react';
import * as yup from 'yup';

export const validationSchema = yup.object({
  nvName: yup
    .string()
    .matches(/^[a-zA-Zא-ת ]+$/, "שם חייב להכיל רק אותיות")
    .required('שם שדה חובה'),
    nvPhone: yup
    .string()
    .matches(/^[0-9 ]+$/,"פלאפון חייב להכיל מספרים בלבד")
    .max(50,'פלאפון יכול להכיל מקסימום 50 מספרים')
    .required('פלאפון שדה חובה'),
    nvJob: yup
    .string(),
    nvEmail: yup
    .string()
    .required('מייל שדה חובה'),
    // .email('מייל לא תקין'),
    Note: yup
      .string(), 
  });