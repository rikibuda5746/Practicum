import * as yup from 'yup';

export const validationSchema = yup.object({
    fromYear: yup
        .number()
        .test('check date', 'invalid', (value, ctx) => {
            return value !== undefined && value < ctx.parent.toYear
        }
        ),
    toYear: yup
        .number()
        .test('check date', 'inva...', (value, ctx) =>
            value !== undefined && value > ctx.parent.fromYear
        ),
});
