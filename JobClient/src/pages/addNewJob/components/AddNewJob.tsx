import { Button, Card, Checkbox, FormControl, FormControlLabel, MenuItem, Radio, RadioGroup, TextareaAutosize } from "@mui/material";
import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Input, Select } from "../../../components";
import backendService from '../../../service/backendService';
import { Item } from "../../interfaces";
import { BStyeld, DivAddNewJobStyled, DivStyled, FormStyled } from "../components/AddNewJob.styled";
import { validationSchema } from '../moduls/constant';
import { NewJob } from '../moduls/interfaces';
import { actions } from '../moduls/slice';
import { width } from "@mui/system";
import { is } from "immer/dist/internal";
import { elementType } from "prop-types";
import { boolean } from "yargs";
import { DivFormWrapper } from "../../../components/FormStyeld/form.styeld";


const AddJob = "הוסף משרה";
const HoursPerWeek = "מס שעות שבועיות";
const InstitutionName = "שם מוסד";
const JobRole = "תפקיד משרה";
const JobType = "סוג משרה";
const Temporarily = "זמני";
const Constant = "קבועה";
const IsPublicJob = "הגדרת הרשאת צפיה ";
const Requirements = "דרישות התפקיד";
const IsOpenJob = "האם המשרה פתוחה";
const DateBegin = "תאריך התחלה";
const DateEnd = "תאריך סיום";
const ExperienYears = "שנות ניסיון";
const IsMonthlySalary = "משכורת חודשית או שעתית";
const Hourly = "שעתי";
const Monthly = "חודשי";
const MaxSalary = "סכום מקסימאלי";
const MinSalary = "סכום מינימאלי";
const Area = "אזור";
const TypesOfJobs = "סוג משרה";
const AgeGroup = "קבוצת גיל";
const HoursOfJobs = "שעות עבודה";

interface Props {
    oldJobID?: number;
}

const AddNewJob = ({ oldJobID }: Props): JSX.Element => {

    const dispatch = useDispatch();

    const [isMon, setIsMon]: [number | undefined, Function] = useState(undefined);

    const handleResetIsMon = (e: number | undefined) => {
        setIsMon(e);
        formik.setFieldValue("minSalary", undefined);
        formik.setFieldValue("maxSalary", undefined);
    }

    const [oldJob, setOldJob]: [NewJob, Function] = useState({
        institutionName: 0,//ניהולית
        jobRoleId: 0,
        isPublic: false,
        isOpen: true,
        datePublish: new Date(),
    });

    useEffect(() => {
        setIsMon(oldJob.isMonthlySalary);
        // oldJob.isPublic == true && formik.setFieldValue("isOpen", true);
        formik.setFieldValue("isMonthlySalary", oldJob.isMonthlySalary);
        formik.setFieldValue("isOpen", oldJob.isPublic);
        formik.setValues(oldJob);
    }, [oldJob])

    const [institutionName, setInstitutionName]: [Item[], Function] = useState([]);
    const [jobsRole, setJobsRole]: [Item[], Function] = useState([]);
    const [areas, setAreas]: [Item[], Function] = useState([]);
    const [typesOfJobs, setTypesOfJobs]: [Item[], Function] = useState([]);
    const [hoursOfJobs, setHoursOfJobs]: [Item[], Function] = useState([]);
    const [ageGroup, setAgeGroup]: [Item[], Function] = useState([]);
    const [addNewJobSuccess, setAddNewJobSuccess]:[boolean, Function]=useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                oldJobID && setOldJob((await (backendService.getJobById(oldJobID))).data[0]);
                setInstitutionName((await (backendService.getSelect({ tableName: "dbo.Institution", idColumnName: "iInstitutionId", valueColumnName: "nvInstitutionName" }))).data);
                setJobsRole((await (backendService.getSelect({ tableName: "dbo.Jobs", idColumnName: "iJobId", valueColumnName: "nvJobName" }))).data);
                setAreas((await backendService.getSelect({ tableName: "dbo.Area", idColumnName: "iAreaId", valueColumnName: "nvAreaName" })).data);
                setTypesOfJobs((await backendService.getSelect({ tableName: "dbo.TypesOfJobs", idColumnName: "iTypesOfJobsId", valueColumnName: "nvTypesOfJobsName" })).data);
                setHoursOfJobs((await backendService.getSelect({ tableName: "dbo.HoursOfJobs", idColumnName: "iHoursOfJobsId", valueColumnName: "nvHoursOfJobsName" })).data);
                setAgeGroup((await backendService.getSelect({ tableName: "dbo.AgeGroup", idColumnName: "iAgeGroupId", valueColumnName: "nvAgeGroupName" })).data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, []);

    const formik = useFormik<NewJob>({
        initialValues: {
            institutionName: oldJob.institutionName ?? 0,//,//ניהולית
            dateBegin: oldJob?.dateBegin ?? undefined,
            dateEnd: oldJob?.dateEnd ?? undefined ,
            jobRoleId:  oldJob?.jobRoleId ?? 0,
            ageGroupId: oldJob?.ageGroupId ?? "",
            hoursOfJobsId:  oldJob?.hoursOfJobsId ?? "",
            areaId: oldJob?.areaId ?? "",
            cityId: oldJob?.cityId ?? "",
            experienYears:oldJob?.experienYears ?? 0 ,
            isMonthlySalary: oldJob?.isMonthlySalary ?? undefined,
            isPublic: oldJob?.isPublic ?? false,
            isOpen: oldJob?.isOpen ?? true,
            typesOfJobsId: oldJob?.typesOfJobsId ?? "",
            datePublish: oldJob?.datePublish ?? new Date(),
            jobDescription:oldJob?.jobDescription?? "",
            minSalary:oldJob?.minSalary ?? undefined,
            maxSalary:oldJob?.maxSalary ?? undefined,
            hoursPerWeek:oldJob?.hoursPerWeek ?? 0,
        },

        validationSchema: validationSchema,

        onSubmit: () => {
            oldJobID!==undefined? dispatch(actions.onUpdateJob({oldJobID:oldJobID, job:formik.values})): dispatch(actions.onSaveNewJobs(formik.values))&&
            setAddNewJobSuccess(true);
        },
    })


    return (<div>
  
    { !addNewJobSuccess&&   <div> 
          <h1>הוספת משרה חדשה</h1>
    <hr /><FormStyled onSubmit={formik.handleSubmit}>  
   
            <Card >
                <BStyeld>{AddJob}</BStyeld>

                <DivAddNewJobStyled>

                    <DivStyled>
                        <BStyeld>{InstitutionName}
                            <FormControl>
                                <Select
                                    sx={{ m: 1, minWidth: 214 }}
                                    name="institutionName"
                                    value={formik.values.institutionName}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.institutionName && Boolean(formik.errors.institutionName)}
                                    helperText={formik.touched.institutionName && formik.errors.institutionName ? "" + formik.errors.institutionName : ""}
                                >
                                    {institutionName?.map((item: Item) => (
                                        <MenuItem key={item.id} value={item.id}>{item.value}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </BStyeld>
                    </DivStyled>

                    <DivStyled>
                        <BStyeld >{DateBegin}
                            <FormControl sx={{ m: 1, minWidth: 214 }}>
                                <Input sx={{ m: 1, minWidth: 214 }}
                                    type="date"
                                    name="dateBegin"
                                    value={formik.values.dateBegin}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.dateBegin && Boolean(formik.errors.dateBegin)}
                                    helperText={formik.touched.dateBegin && formik.errors.dateBegin ? "" + formik.errors.dateBegin : ""}
                                >
                                </Input>
                            </FormControl>
                        </BStyeld>
                    </DivStyled>

                    <DivStyled>
                        <BStyeld >{DateEnd}
                            <FormControl sx={{ m: 1, minWidth: 214 }}>
                                <Input sx={{ m: 1, minWidth: 214 }}
                                    type="date"
                                    name="dateEnd"
                                    value={formik.values.dateEnd}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.dateEnd && Boolean(formik.errors.dateEnd)}
                                    helperText={formik.touched.dateEnd && formik.errors.dateEnd ? "" + formik.errors.dateEnd : ""}
                                >
                                </Input>
                            </FormControl>
                        </BStyeld>
                    </DivStyled>

                    <DivStyled>
                        <BStyeld >{HoursPerWeek}
                            <FormControl sx={{ m: 1, minWidth: 214 }}>
                                <Input sx={{ m: 1, minWidth: 214 }}
                                    id="outlined-basic"
                                    variant="outlined"
                                    name="hoursPerWeek"
                                    value={formik.values.hoursPerWeek}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.hoursPerWeek && Boolean(formik.errors.hoursPerWeek)}
                                    type="number"
                                />
                            </FormControl>
                        </BStyeld>
                    </DivStyled>

                    <DivStyled>
                        <BStyeld >{ExperienYears}
                            <FormControl sx={{ m: 1, minWidth: 214 }}>
                                <Input sx={{ m: 1, minWidth: 214 }}
                                    id="outlined-basic"
                                    variant="outlined"
                                    name="experienYears"
                                    value={formik.values.experienYears}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.experienYears && Boolean(formik.errors.experienYears)}
                                    type="number"
                                />
                            </FormControl>
                        </BStyeld>
                    </DivStyled>
                </DivAddNewJobStyled>

                <DivAddNewJobStyled>
                    <DivStyled>
                        <BStyeld >{JobRole}
                            <FormControl sx={{ m: 1, minWidth: 214 }}>
                                <Select sx={{ m: 1, minWidth: 214 }}
                                    name="jobRoleId"
                                    value={formik.values.jobRoleId}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.jobRoleId && Boolean(formik.errors.jobRoleId)}
                                    helperText={formik.touched.jobRoleId && formik.errors.jobRoleId ? "" + formik.errors.jobRoleId : ""}
                                >
                                    {jobsRole?.map((job: Item) => (
                                        <MenuItem key={job.id} value={job.id}>{job.value}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </BStyeld>
                    </DivStyled>

                    <DivStyled>
                        <BStyeld >{Area}
                            <FormControl sx={{ m: 1, minWidth: 214 }}>
                                <Select sx={{ m: 1, minWidth: 214 }}
                                    name="areaId"
                                    value={formik.values.areaId}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.areaId && Boolean(formik.errors.areaId)}
                                    helperText={formik.touched.areaId && formik.errors.areaId ? "" + formik.errors.areaId : ""}
                                >
                                    {areas?.map((area: Item) => (
                                        <MenuItem key={area.id} value={area.id}>{area.value}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </BStyeld>
                    </DivStyled>

                    <DivStyled>
                        <BStyeld >{TypesOfJobs}
                            <FormControl sx={{ m: 1, minWidth: 214 }}>
                                <Select sx={{ m: 1, minWidth: 214 }}
                                    name="typesOfJobsId"
                                    value={formik.values.typesOfJobsId}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.typesOfJobsId && Boolean(formik.errors.typesOfJobsId)}
                                    helperText={formik.touched.typesOfJobsId && formik.errors.typesOfJobsId ? "" + formik.errors.typesOfJobsId : ""}
                                >
                                    {typesOfJobs?.map((item: Item) => (
                                        <MenuItem key={item.id} value={item.id}>{item.value}</MenuItem>
                                    ))}

                                </Select>
                            </FormControl>
                        </BStyeld>
                    </DivStyled>

                    <DivStyled>
                        <BStyeld >{HoursOfJobs}
                            <FormControl sx={{ m: 1, minWidth: 214 }}>
                                <Select sx={{ m: 1, minWidth: 214 }}
                                    name="hoursOfJobsId"
                                    value={formik.values.hoursOfJobsId}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.hoursOfJobsId && Boolean(formik.errors.hoursOfJobsId)}
                                    helperText={formik.touched.hoursOfJobsId && formik.errors.hoursOfJobsId ? "" + formik.errors.hoursOfJobsId : ""}
                                >
                                    {hoursOfJobs?.map((item: Item) => (
                                        <MenuItem key={item.id} value={item.id}>{item.value}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </BStyeld>
                    </DivStyled>

                    <DivStyled>
                        <BStyeld >{AgeGroup}
                            <FormControl >
                                <Select sx={{ m: 1, minWidth: 214 }}
                                    name="ageGroupId"
                                    value={formik.values.ageGroupId}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.ageGroupId && Boolean(formik.errors.ageGroupId)}
                                    helperText={formik.touched.ageGroupId && formik.errors.ageGroupId ? "" + formik.errors.ageGroupId : ""}
                                >
                                    {ageGroup?.map((item: Item) => (
                                        <MenuItem key={item.id} value={item.id}>{item.value}</MenuItem>
                                    ))}

                                </Select>
                            </FormControl>
                        </BStyeld>
                    </DivStyled>
                </DivAddNewJobStyled>

                <DivAddNewJobStyled>

                    <DivStyled>
                        <BStyeld>{IsMonthlySalary}
                            <FormControl>
                                <RadioGroup sx={{ m: 1, minWidth: 214 }}
                                    row
                                    value={formik.values.isMonthlySalary}
                                    aria-labelledby="demo-row-radio-buttons-group-label"
                                    name="isMonthlySalary"
                                    onBlur={formik.handleBlur}
                                    onChange={(event) => {
                                        setIsMon(event.target.value);
                                    }}
                                >
                                    <FormControlLabel checked={isMon === "1"} value="1" control={<Radio />} label={Monthly} />
                                    <FormControlLabel checked={isMon === "0"} value="0" control={<Radio />} label={Hourly} />

                                    {isMon &&
                                        // <DivStyled>
                                        <BStyeld >{MaxSalary}
                                            <FormControl>
                                                <Input style={{ width: "120px" }}
                                                    id="outlined-basic"
                                                    variant="outlined"
                                                    name="maxSalary"
                                                    value={formik.values.maxSalary}
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                    error={formik.touched.maxSalary && Boolean(formik.errors.maxSalary)}
                                                    type="number"
                                                    helperText={formik.touched.maxSalary && formik.errors.maxSalary ? "" + formik.errors.maxSalary : ""}
                                                />
                                            </FormControl>
                                        </BStyeld>
                                        // </DivStyled>
                                    }

                                    {isMon &&
                                        // <DivStyled>
                                        <BStyeld >{MinSalary}
                                            {/* <FormControl> */}
                                            <Input style={{ width: "120px" }}
                                                id="outlined-basic"
                                                variant="outlined"
                                                name="minSalary"
                                                value={formik.values.minSalary}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                error={formik.touched.minSalary && Boolean(formik.errors.minSalary)}
                                                helperText={formik.touched.minSalary && formik.errors.minSalary ? "" + formik.errors.minSalary : ""}
                                                type="number"
                                            />
                                            {/* </FormControl> */}
                                        </BStyeld>
                                        // </DivStyled>
                                    }

                                    {isMon && <Button
                                        type="reset"
                                        onClick={() => handleResetIsMon(undefined)}
                                    >reset</Button>}

                                </RadioGroup>
                            </FormControl>
                        </BStyeld>
                    </DivStyled>

                    <DivStyled>
                        <BStyeld>{IsPublicJob}
                            <FormControl>
                                <Checkbox
                                    name="isPublic"
                                    checked={formik.values.isPublic == false || 0 ? false : true}
                                    onChange={formik.handleChange}

                                />
                            </FormControl>
                        </BStyeld>
                    </DivStyled>

                    <DivStyled>
                        <BStyeld>{Requirements}
                            <FormControl>
                                <TextareaAutosize
                                    name="jobDescription"
                                    value={formik.values.jobDescription}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    minRows={3}
                                    style={{ width: 200 }}
                                />
                            </FormControl>
                        </BStyeld>
                    </DivStyled>
                </DivAddNewJobStyled>

                <Button type="submit" >סיום</Button>

            </Card >
        </FormStyled>
        </div>}
        {addNewJobSuccess&&<p style={{fontSize:"50px"}}>המשרה נוספה בהצלחה</p>}
    </div >);
}
export default AddNewJob;
























{/* <DivStyled>
<BStyeld>{JobType}
    <RadioGroup sx={{ m: 1, minWidth: 214 }}
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
    >
        <FormControlLabel  value="true" control={<Radio />} label={Constant} />
        <FormControlLabel value="false" control={<Radio />} label={Temporarily} />
    </RadioGroup>
</BStyeld>
</DivStyled> */}
