import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { FormRow, FormStyled, PersonalDetailsWrapper } from "./PersonalDetails.styled"
import { useDispatch, useSelector } from "react-redux";
import { Input ,Button} from "../../../components";
import { validationSchema } from "../modules/constant";
import { PersonalDetailsFormValues, Props } from "../modules/interfaces"
import Select from "../../../components/Select";
import { FormControl, Card, FormControlLabel, MenuItem, Radio, RadioGroup, FilterOptionsState, TextField, Autocomplete } from "@mui/material";
import { selectors as personalDetailsSelectors, actions as actionsPersonalDetails } from '../modules/slice';
import { selectors as CitiesAndStreetsSelector, actions as actionsCitiesAndStreets, CitiesI, StreetsI } from '../../slice';
import Box from '@mui/material/Box';
import backendService from "../../../service/backendService";
import { Item } from "../../interfaces";
import { DivButtons, DivFormWrapper } from "../../../components/FormStyeld/form.styeld";
import { selectors } from "../../registration/modules/slice";
import { selectors as userSelector } from "../../../redux/data/user/modules/slice";
import { actions } from "../../../redux/data/user";

const title = "פרטים אישיים"
const Namecity = "עיר"
const NamefirstName = "שם פרטי"
const NamelastName = "שם משפחה"
const Nameid = "תעודת זהות"
const Nameaddress = "רחוב"
const Namepelephon = "טלפון/פלאפון"
const Namesector = "מגזר"
const NamebornDate = "תאריך לידה"
const Nameemail = "מייל"
const NamecountrySource = "מדינת מקור"
const NamemaritalStatus = "מצב משפחתי"
const NameanonimQuestion = "האם ברצונך להיות משתמש אנונימי?"
const Namesave = "שמור"
const NamesaveAndContinue = "שמור והמשך"
const Namegender = "מין"
const nextName="דלג"


const PersonalInfo: React.FC<any> = () => {

    const [IdUser, setIdUser]: [number | null, Function] = useState(null);
    const [sectors, setsecctors]: [Item[], Function] = useState([]);
    const [genders, setgenders]: [Item[], Function] = useState([]);
    const [maritalStatuses, setmaritalStatuses]: [Item[], Function] = useState([]);
    const [sourceCountries, setsourceCountries]: [Item[], Function] = useState([]);
    const user = useSelector(userSelector.getUserDetails)

    // const userNameProps =useSelector(selectors.getUsernameRgisteration)
    // const passwordProps =useSelector(selectors.getPasswordRgisteration)
    // const firstNameProps = useSelector(selectors.getFirstnameRgisteration)
    // const lastNameProps =useSelector(selectors.getLastnameRgisteration)
    // const emailProps = useSelector(selectors.getEmailRgisteration)
    const userNameProps:string =useSelector(selectors.getUsernameRgisteration)
    const passwordProps:string =useSelector(selectors.getPasswordRgisteration)
    const firstNameProps = useSelector(selectors.getFirstnameRgisteration)
    const lastNameProps =useSelector(selectors.getLastnameRgisteration)
    const emailProps = useSelector(selectors.getEmailRgisteration)

    useEffect(() => {
        const fetchData = async () => {
            try {
                backendService.getSelect({ tableName: "dbo.Sector", idColumnName: "iSectorId", valueColumnName: "nvSectorName" })
                    .then(x => setsecctors(x.data))
                backendService.getSelect({ tableName: "dbo.Gender", idColumnName: "iGenderId", valueColumnName: "nvGenderName" })
                    .then(x => setgenders(x.data));
                backendService.getSelect({ tableName: "dbo.FamilyStatus", idColumnName: "iFamilyStatusId", valueColumnName: "nvFamilyStatusName" })
                    .then(x => setmaritalStatuses(x.data));
                backendService.getSelect({ tableName: "dbo.SourceCountry", idColumnName: "iSourceCountryId", valueColumnName: "nvSourceCountryName" })
                    .then(x => setsourceCountries(x.data));
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, []);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(actionsCitiesAndStreets.onGetCitiesRequested({}));
        dispatch(actionsCitiesAndStreets.onGetStreetsRequested({}));
        if (user.id) {
            dispatch(actionsPersonalDetails.onGetUserById(user.id));
        }
    }, [])
    const cities = useSelector(CitiesAndStreetsSelector.getCities)
    const streets = useSelector(CitiesAndStreetsSelector.getStreets)
    const UserByIdForUpdet: PersonalDetailsFormValues = useSelector(personalDetailsSelectors.getUserById)


    const cities2: CitiesI[] = cities?.result?.records;
    const [cityValue, setCityValue]: [CitiesI | null, Function] = useState(null)
    const [streetValue, setStreetValue]: [StreetsI | null, Function] = useState(null)

    const streets3: StreetsI[] = [];
    let streets2: StreetsI[] = streets?.result?.records;
    //בדיקות תקינות לרחובות
    streets2 && streets2.filter(x => {

        return !(x.שם_רחוב.trim().startsWith("שכ ") || x.שם_רחוב.trim().startsWith("שכונת ") || x.שם_רחוב.trim().startsWith("שכונה ") || x.שם_רחוב.includes("שכונה") || x.שם_רחוב.includes("שכ "))
    })

    {
        streets2?.map(x => {
            if (!(x.שם_רחוב.trim().startsWith("שכ ") || x.שם_רחוב.trim().startsWith("שכונת ") || x.שם_רחוב.trim().startsWith("שכונה ") || x.שם_רחוב.includes("שכונה") || x.שם_רחוב.includes("שכ "))) {
                streets3.push(x);
            }
        })
    }

    const [cityQuery, setCityQuery]: [string, Function] = useState('');
    const [StreetDisable, setStreetDisable]: [boolean, Function] = useState(true);


    useEffect(() => {
        dispatch(actionsCitiesAndStreets.onKeyPressCity(cityQuery));
        dispatch(actionsCitiesAndStreets.onGetStreetsRequested({}));
    }, [cityQuery])

    useEffect(() => {
        formik.setValues(UserByIdForUpdet);
        UserByIdForUpdet.IsPublic == true ? formik.setFieldValue("IsPublic", true) : formik.setFieldValue("IsPublic", false);
        if (IdUser == null) {
            formik.setFieldValue('FirstName', firstNameProps)
            formik.setFieldValue('LastName',lastNameProps)
            formik.setFieldValue('Email',emailProps)
        }
        cities2?.forEach(x => {
            if (x.שם_ישוב == UserByIdForUpdet.CityName) {
                setCityValue(x);
                return;
            }
        })
        if (IdUser) {
            setStreetDisable(false);
            setCityQuery(UserByIdForUpdet.CityName);
        }
        streets2?.forEach(x => {
            if (x.שם_רחוב == UserByIdForUpdet.StreetName) {
                setStreetValue(x);
                return;
            }
        })

    }, [UserByIdForUpdet])
    const formik = useFormik<PersonalDetailsFormValues>({
        initialValues: {
            FirstName: "",
            LastName: "",
            Id: UserByIdForUpdet ? UserByIdForUpdet.Id : "",
            Email: "",
            Pelephone: "",
            StreetId: "",
            StreetName: "",
            BornDate: undefined,
            Sector: "",
            CountrySource: "",
            MaritalStatus: "",
            Gender: "",
            IsPublic: true,
            CityId: "",
            CityName: ""
        },
        validationSchema: validationSchema,
        onSubmit: () => {
            dispatch(actionsPersonalDetails.onSetSave({ form: formik.values, userNameProps, passwordProps, IdUser }))
            const username:string=userNameProps
            const password:string=passwordProps;
            dispatch(actions.onLoginToDB({username,password}));
            dispatch(actionsPersonalDetails.getPersonalDetails(formik.values))
        },
    });

    const handleCityChange = (event: any, value: CitiesI | null) => {
        formik.setFieldValue('CityId', value?._id)
        formik.setFieldValue("CityName", value?.שם_ישוב)
        setStreetDisable(false);
        setCityQuery(value?.שם_ישוב);
        formik.setFieldValue("StreetName", "");
        formik.setFieldValue("StreetId", "");
        setCityValue(value);
    };
    const handleStreetChange = (event: any, value: StreetsI | null) => {
        formik.setFieldValue('StreetId', value?._id)
        formik.setFieldValue("StreetName", value?.שם_רחוב);
        setStreetValue(value)
    };

    return (
    <DivFormWrapper>
        <h1>{title}</h1>
        <hr />
        <br />        
        <Button style={{ padding: "3px 15px" }} onClick={()=>dispatch(actionsPersonalDetails.next())}>{nextName}</Button>
        <PersonalDetailsWrapper>

            <FormStyled onSubmit={formik.handleSubmit}>
                <FormRow>
                    <b>{NamefirstName}
                        <br />
                        <Input
                            name="FirstName"
                            value={formik.values.FirstName}
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            error={formik.touched.FirstName
                                && Boolean(formik.errors.FirstName)
                            }
                            helperText={formik.touched.FirstName && formik.errors.FirstName}
                            // disabled={true}
                        />
                    </b>
                </FormRow>
                <FormRow>
                    <b>{NamelastName}
                        <br />
                        <Input
                            name="LastName"
                            value={formik.values.LastName}
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            error={formik.touched.LastName && Boolean(formik.errors.LastName)}
                            helperText={formik.touched.LastName && formik.errors.LastName}
                            // disabled={true}
                        />
                    </b>
                </FormRow>
                <FormRow>
                    <b>{Nameemail}
                        <br />
                        <Input
                            name="Email"
                            value={formik.values.Email}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.Email && Boolean(formik.errors.Email)}
                            helperText={formik.touched.Email && formik.errors.Email}
                            disabled={true}
                        />
                    </b>
                </FormRow>

                <FormRow>
                    <b>{Nameid}
                        <br />
                        <Input
                            name="Id"
                            value={formik.values.Id}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.Id && Boolean(formik.errors.Id)}
                            helperText={formik.touched.Id && formik.errors.Id}
                        />
                    </b>
                </FormRow>
                <FormRow>
                    <b>{Namepelephon}
                        <br />
                        <Input
                            name="Pelephone"
                            value={formik.values.Pelephone}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.Pelephone && Boolean(formik.errors.Pelephone)}
                            helperText={formik.touched.Pelephone && formik.errors.Pelephone}
                        />
                    </b>
                </FormRow>

                <FormRow>
                    <b>{NamebornDate}
                        <br />
                        <Input
                            type="date"
                            name="BornDate"
                            value={formik.values.BornDate}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.BornDate && Boolean(formik.errors.BornDate)}
                            helperText={formik.touched.BornDate && formik.errors.BornDate ? "" + formik.errors.BornDate : ""}
                        />
                    </b>
                </FormRow>

                
                <FormRow>
                    <b>{Namecity}
                        <Autocomplete
                            value={cityValue}
                            sx={{ m: 1, minWidth: 214 }}
                            options={cities2}
                            autoHighlight
                            getOptionLabel={(option) => option.שם_ישוב}
                            renderOption={(props, option) => (
                                <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }}{...props}>
                                    {option.שם_ישוב}
                                </Box>
                            )}
                            renderInput={(params) => (
                                <TextField
                                    {...params}

                                    error={formik.touched.CityId && Boolean(formik.errors.CityId)}
                                    helperText={formik.touched.CityId && formik.errors.CityId}
                                    // onChange={()=>console.log(params.inputProps.value="מודיעין עילית")}
                                    inputProps={{
                                        ...params.inputProps,
                                        autoComplete: 'new-password',
                                    }}
                                />
                            )}
                            onChange={handleCityChange}
                        />
                    </b>
                </FormRow>
                <FormRow>
                    <b>{Nameaddress}
                        <br />
                        <Autocomplete
                            value={streetValue}
                            sx={{ m: 1, minWidth: 214 }}
                            options={streets3}
                            autoHighlight
                            getOptionLabel={(option) => option.שם_רחוב}
                            renderOption={(props, option) => (
                                <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }}{...props}>
                                    {option.שם_רחוב}
                                </Box>
                            )}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.StreetId && Boolean(formik.errors.StreetId)}
                                    helperText={formik.touched.StreetId && formik.errors.StreetId}
                                    inputProps={{
                                        ...params.inputProps,
                                        autoComplete: 'new-password',
                                    }}
                                />
                            )}
                            onChange={handleStreetChange}
                            disabled={StreetDisable}
                        />
                    </b>
                </FormRow>
                <FormRow>
                    <b>{Namesector}
                        <br />
                        <FormControl
                        >
                            <Select
                                name="Sector"
                                value={formik.values.Sector}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.Sector && Boolean(formik.errors.Sector)}
                                helperText={formik.touched.Sector && formik.errors.Sector ? "" + formik.errors.Sector : ""}
                            >
                                {sectors.map((sector: Item) => (
                                    <MenuItem value={sector.id}>{sector.value}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </b>
                </FormRow>
                <FormRow>
                    <b>{NamecountrySource}
                        <br />
                        <FormControl
                        >
                            <Select
                                name="CountrySource"
                                value={formik.values.CountrySource}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.CountrySource && Boolean(formik.errors.CountrySource)}
                                helperText={formik.touched.CountrySource && formik.errors.CountrySource ? "" + formik.errors.CountrySource : ""}
                            >
                                {sourceCountries.map((sourceCountry: Item) => (
                                    <MenuItem value={sourceCountry.id}>{sourceCountry.value}</MenuItem>
                                ))}

                            </Select>
                        </FormControl>
                    </b>
                </FormRow>
                <FormRow>
                    <b>{NamemaritalStatus}
                        <br />
                        <FormControl
                        >
                            <Select
                                name="MaritalStatus"
                                value={formik.values.MaritalStatus}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.MaritalStatus && Boolean(formik.errors.MaritalStatus)}
                                helperText={formik.touched.MaritalStatus && formik.errors.MaritalStatus ? "" + formik.errors.MaritalStatus : ""}                                >
                                {maritalStatuses.map((maritalStatus: Item) => (
                                    <MenuItem value={maritalStatus.id}>{maritalStatus.value}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </b>
                </FormRow>
                <FormRow>
                    <b>{Namegender}
                        <br />
                        <FormControl
                        >
                            <Select
                                name="Gender"
                                value={formik.values.Gender}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.Gender && Boolean(formik.errors.Gender)}
                                helperText={formik.touched.Gender && formik.errors.Gender ? "" + formik.errors.Gender : ""}
                            >
                                {genders.map((gender: Item) => (
                                    <MenuItem value={gender.id}>{gender.value}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </b>
                </FormRow>
                <div>
                    <FormRow>
                        <FormControl>
                            <b>{NameanonimQuestion}
                                <br />
                                <RadioGroup style={{ "marginRight": "17%" }}

                                    name="IsPublic"
                                    value={formik.values.IsPublic}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    row
                                    aria-labelledby="demo-row-radio-buttons-group-label"
                                >
                                    <FormControlLabel value="true" control={<Radio  color="default" />} label="כן" />
                                    <FormControlLabel value="false" control={<Radio color="default" />} label="לא" />
                                </RadioGroup>
                            </b>
                        </FormControl>
                    </FormRow>
                    <DivButtons>
                    <Button style={{ padding: "3px 15px" }} type="submit"
                    >{Namesave}</Button>
                    <Button style={{ padding: "3px 15px" }} type="submit"
                    >{NamesaveAndContinue}</Button>
                    </DivButtons>
                </div>
            </FormStyled>
        </PersonalDetailsWrapper>
    </DivFormWrapper>
    )

}

export default PersonalInfo;
