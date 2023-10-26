import TextareaAutosize from '@mui/base/TextareaAutosize';
import { FormControl, MenuItem, SelectChangeEvent, TextField } from "@mui/material";
import { useFormik } from "formik";
import { ReactNode, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Button, Input, Select } from "../../../components";
import { BStyeld, DivDetailsStyled, DivFormWrapper, DivStyled } from "../../../components/FormStyeld/form.styeld";
import RangeOfYears from "../../../components/RangeOfYears/index";
import { validationSchema } from "../modules/constant";
import { IExperience } from '../modules/interfaces';
import { actions } from '../modules/slice';
import { Item } from '../../interface';
import backendService from '../../../service/backendService';
import { RiDeleteBin6Line } from 'react-icons/ri'

interface Props {
    index: number,
    experience: IExperience,
    length: number,
    isAllExperienceFilled: boolean,
}


const ExperienceDetails = ({ experience, index, length, isAllExperienceFilled }: Props): JSX.Element => {

    const dispatch = useDispatch();
    const placeExperienceName = "מקום נסיון";
    const jobName = "תפקיד"
    const noteName = "הערות"
    const addName = "הוספה";
    const removeName = "מחיקה";

    const [errorFromYear, setErrorFromYear]: [boolean, Function] = useState(false);
    const [errorToYear, setErrorToYear]: [boolean, Function] = useState(false);

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

    const formik = useFormik<IExperience>({
        initialValues: {
            placeExperience: experience.placeExperience ?? "",
            fromYear: experience.fromYear ?? new Date().getFullYear() - 50,
            toYear: experience.toYear ?? new Date().getFullYear(),
            job: experience.job ?? "",
            description: experience.description ?? "",
        },

        validationSchema: validationSchema,
        onSubmit: (values) => {
        },
    });

    useEffect(() => {
        if (!isAllExperienceFilled) {
            formik.values.fromYear == 0 ? setErrorFromYear(true) : setErrorFromYear(false);
            formik.values.toYear == 0 ? setErrorToYear(true) : setErrorToYear(false)
            formik.validateForm(formik.values);
        }
        else {
            setErrorFromYear(false);
            setErrorToYear(false);
        }
    }, [isAllExperienceFilled])

    useEffect(() => {
        formik.setFieldValue('placeExperience', experience.placeExperience ?? "", false)
        formik.setFieldValue('fromYear', experience.fromYear ?? new Date().getFullYear() - 50, false)
        formik.setFieldValue('toYear', experience.toYear ?? new Date().getFullYear(), false)
        formik.setFieldValue('job', experience.job ?? "", false)
        formik.setFieldValue('description', experience.description ?? "", false)
    }, [experience])

    const setFromYear = (value: number) => {
        formik.setFieldValue('fromYear', value)
        dispatch(actions.saveDetailsNumber({ "index": index, "filedName": "fromYear", "value": value }))
    }

    const setToYear = (value: number) => {
        formik.setFieldValue('toYear', value)
        dispatch(actions.saveDetailsNumber({ "index": index, "filedName": "toYear", "value": value }))
    }

    const savePlaceExperience = (e: string) => {
        formik.handleBlur(e)
        dispatch(actions.saveDetailsString({ "index": index, "filedName": "placeExperience", "value": formik.values.placeExperience }))
    }

    const saveJob = (e: SelectChangeEvent<unknown>) => {
        formik.handleChange(e)
        formik.setFieldValue('job', e.target.value, false)
        dispatch(actions.saveDetailsString({ 'index': index, "filedName": "job", "value": e.target.value as string }))
    }
    return (
        <div>
            <form onSubmit={formik.handleSubmit}>
                <DivDetailsStyled>
                    <DivStyled>
                        <BStyeld>{placeExperienceName}
                            <Input
                                value={formik.values.placeExperience}
                                name="placeExperience"
                                onChange={formik.handleChange}
                                onBlur={(e: any) => savePlaceExperience(e)}
                                error={Boolean(formik.errors.placeExperience)}
                                helperText={formik.errors.placeExperience}
                                type="text"
                            /></BStyeld>
                    </DivStyled>

                    <RangeOfYears
                        fromYear={formik.values.fromYear}
                        toYear={formik.values.toYear}
                        setFromYear={(value: number) => setFromYear(value)}
                        setToYear={(value: number) => setToYear(value)}
                        errorFromYear={errorFromYear}
                        errorToYear={errorToYear}
                        setErrorFromYear={setErrorFromYear}
                        setErrorToYear={setErrorToYear}

                    />
                    <DivStyled><BStyeld>{jobName}
                        <FormControl sx={{ m: 1, minWidth: 214 }}>
                            <Select
                                name="job"
                                value={formik.values.job}
                                onChange={(e: SelectChangeEvent<unknown>, child: ReactNode) => saveJob(e)}
                                onBlur={formik.handleBlur}
                                error={Boolean(formik.errors.job)}
                                helperText={formik.errors.job ? "" + formik.errors.job : ""}
                            >
                                {jobs.map((job: Item) => (
                                    <MenuItem value={job.id}>{job.value}</MenuItem>
                                ))}

                            </Select>
                        </FormControl>
                    </BStyeld>
                    </DivStyled>

                    <DivStyled>
                        <BStyeld>{noteName}
                            <TextField multiline variant='outlined' id="outlined-basic"
                                name="description"
                                value={formik.values.description}
                                onChange={formik.handleChange}
                                onBlur={() => dispatch(actions.saveDetailsString({ "index": index, "filedName": "description", "value": formik.values.description }))}
                                minRows={1} maxRows={3}
                            /> </BStyeld>
                    </DivStyled>
                    <RiDeleteBin6Line title='מחיקה' fontSize="80px" onClick={() => dispatch(actions.removeExperience({ index: index }))}/>
                </DivDetailsStyled>
            </form>
        </div>);
}
export default ExperienceDetails;