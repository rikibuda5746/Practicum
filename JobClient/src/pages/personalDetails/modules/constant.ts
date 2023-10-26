 import * as yup from 'yup';

function is_israeli_id_number(ID:number|undefined):boolean {
    if(ID != undefined){
         let id:string = String(ID).trim();
    if (id.length > 9 || isNaN(ID)) return false;
    id = id.length < 9 ? ("00000000" + id).slice(-9) : id;
        return Array.from(id, Number).reduce((counter, digit, i) => {
            const step = digit * ((i % 2) + 1);
            return counter + (step > 9 ? step - 9 : step);
        }) % 10 === 0;
    }
   return false
}


export const validationSchema = yup.object({ 
    FirstName:yup
    .string()
    .required('שם פרטי שדה חובה')
    .matches(/^[a-zA-Zא-ת]+$/, "שם פרטי חייב להכיל אותיות בלבד"),
    LastName:yup
    .string()
    .required("שם משפחה שדה חובה")
    .matches(/^[a-zA-Zא-ת]+$/, "שם משפחה חייב להכיל אותיות בלבד"),
    Id:yup
    .string()
    .required("תעודת זהות שדה חובה")
    .matches(/^[0-9]+$/,"תעודת זהות חייבת להכיל מספרים בלבד")
    .test("test name", "תעודת זהות לא תקינה" , 
    (id)=> is_israeli_id_number(Number(id))
    ),
    Email:yup
    .string()
    .required('מייל שדה חובה')
    .email('מייל לא תקין'),
    Pelephone:yup
    .string()
    .matches(/^0[0-9]/,"מספר הטלפון/הפלאפון לא תקין")
    .required("טלפון/פלאפון שדה חובה")
    .min(9,"מספר הטלפון/הפלאפון לא תקין")
    .max(10,"מספר הטלפון/הפלאפון לא תקין"),
    BornDate:yup
    .date()
    .required("תאריך לידה שדה חובה")
    .max(new Date(Date.now() - 18 * 364 * 24 * 60 * 60 * 1000), "תאריך לידה לא תקין, הגיל המינמום בשביל להרשם לאתר הוא 18")
    ,
    StreetId:yup
    .string()
    .required("כתובת שדה חובה"),
    Gender:yup
    .string()
    .required("מין שדה חובה"),
    Sector:yup
    .string()
    .required("מגזר שדה חובה"),
    CountrySource:yup
    .string()
    .required("מדינת מקור שדה חובה"),
    MaritalStatus:yup
    .string()
    .required("מצב משפחתי שדה חובה"),
    CityId:yup
    .string()
    .required("עיר שדה חובה")
});