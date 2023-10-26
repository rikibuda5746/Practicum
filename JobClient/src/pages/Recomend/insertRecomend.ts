import React, { FC } from "react";
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
//import { validationSchema } from "./modules/constant";
import { actions } from "../../pages/GetJobs/modules/slice";
import { Button } from "@mui/material";
//import { Input } from "";

// interface RecommendDetails {
//     name: string,
//     phone: string,
//     role: string,
//     mail: string,
//     note: string;
//   }
  


//           <form onSubmit={formik.handleSubmit}> 
//           <p>שם</p>           
//             <Input
//               name="name"
//               value={formik.values.name}
//               onBlur={formik.handleBlur}
//               onChange={formik.handleChange}
//               error={formik.touched.name && Boolean(formik.errors.name)}
//               helperText={formik.touched.name && formik.errors.name}
//               fullWidth
//             />
//             <p>תפקיד</p>   
//             <Input
//               name="role"
//               value={formik.values.role}
//               onBlur={formik.handleBlur}
//               onChange={formik.handleChange}
//               error={formik.touched.role && Boolean(formik.errors.role)}
//               helperText={formik.touched.role && formik.errors.role}
//               fullWidth
//             />
//             <p>פלאפון</p>   
//             <Input
//               name="phone"
//               value={formik.values.phone}
//               onBlur={formik.handleBlur}
//               onChange={formik.handleChange}
//               error={formik.touched.phone && Boolean(formik.errors.phone)}
//               helperText={formik.touched.phone && formik.errors.phone}
//               fullWidth
//             />

//              <p>מייל</p>   
//             <Input
//               name="email"
//               value={formik.values.mail}
//               onBlur={formik.handleBlur}
//               onChange={formik.handleChange}
//               error={formik.touched.mail && Boolean(formik.errors.mail)}
//               helperText={formik.touched.mail && formik.errors.mail}
//               fullWidth
//             />
//             <p>הערות</p>   
//             <Input
//               name="note"
//               value={formik.values.note}
//               onBlur={formik.handleBlur}
//               onChange={formik.handleChange}
//               error={formik.touched.note && Boolean(formik.errors.note)}
//               helperText={formik.touched.note && formik.errors.note}
//               fullWidth
//             />
//             <Button type="submit">send</Button>
//           </form>

//           //   <div>
//           //        <h3>הוספת ממליץ למשרה זו:</h3>
//           //   <button onClick={formik.handleSubmit}>send</button>

//           //  </div>        
