import * as yup from 'yup';

export const validationSchema = yup.object({
    institutionName: yup
        .string()
        .required("שדה זה חובה"),

    dateBegin: yup
        .date()
        .max(new Date(), "תאריך לא חוקי")
        .when('dateEnd', (dateEnd, schema) => {
            return dateEnd ? schema.max(dateEnd, 'תאריך התחלה קודם תאריך סיום') : schema;
        }),

    dateEnd: yup
        .date()
        .min(yup.ref('dateBegin'), 'תאריך סיום אינו קודם לאחר תאריך התחלה'),

    jobRoleId: yup
        .string()
        .required("שדה  זה חובה"),

    ageGroupId: yup
        .string(),

    hoursOfJobsId: yup
        .string(),

    areaId: yup
        .string(),

    cityId: yup
        .string(),

    experienYears: yup
        .number(),

    isMonthlySalary: yup
        .number(),

    isPublic: yup
        .boolean()
        .required("שדה זה חובה"),

    isOpen: yup
        .boolean()
        .required("שדה זה חובה"),

    typesOfJobsId: yup
        .string(),

    datePublish: yup
        .date()
        .required("שדה זה חובה"),

    jobDescription: yup
        .string(),

    minSalary: yup
        .number()
        .min(29.12, "שכר מינימום 29.12"),

    maxSalary: yup
        .number()
        .min(29.12, "שכר מינימום 29.12"),

    hoursPerWeek: yup
        .number()
        .min(0),
})




