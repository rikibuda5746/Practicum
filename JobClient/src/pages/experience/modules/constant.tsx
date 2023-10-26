import * as yup from 'yup';


export const validationSchema = yup.object({
    placeExperience: yup
        .string()
        .required("שדה חובה"),
    institute: yup
        .string()
        .required(),
    fromYear: yup
        .number()
        .required('Year is required'),
    toYear: yup
        .number()
        .required('Year is required'),
    job: yup
        .string()
        .required('שדה חובה'),
    description: yup
        .string()
});

