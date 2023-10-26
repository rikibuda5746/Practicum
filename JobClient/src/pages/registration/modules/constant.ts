import * as yup from 'yup';

export const validationSchemaRegisteration=yup.object({
    username:yup
    .string()
    .required('Required'),
    email: yup
    .string()
    .email('Invalid email')
    .required('Required'),
    firstname:yup
    .string()
    .required('Required'),
    lastname:yup
    .string()
    .required('Required'),
  
})