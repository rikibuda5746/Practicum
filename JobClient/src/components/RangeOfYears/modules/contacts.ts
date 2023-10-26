import * as yup from 'yup';


export const validationSchema = yup.object({
  
    fromYear: yup
        .number()
        .required('שדה חובה')
        .test('check date', 'inva...', (value, ctx) => {
            return value !== undefined && value < ctx.parent.toYear
        }
        ),
    toYear: yup
        .number()
        .required('שדה חובה')
        .test('check date', 'inva...', (value, ctx) =>
            value !== undefined && value > ctx.parent.fromYear
        ),
});
