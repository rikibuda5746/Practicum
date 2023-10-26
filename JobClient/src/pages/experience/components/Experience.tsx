import ExperienceDetails from './ExperienceDetails';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actions, selectors } from '../modules/slice'
import { FormStyled } from "../../auth/components/login.styled";
import { IExperience } from "../modules/interfaces";
import { Button } from '../../../components';
import { DivButtons, DivFormWrapper, Wrapper } from '../../../components/FormStyeld/form.styeld';
import { CircularProgress } from '@mui/material';
import NextPlanOutlined from '@mui/icons-material/NextPlanOutlined'
import ControlPointOutlinedIcon from '@mui/icons-material/ControlPointOutlined';


const Experience = () => {

    const dispatch = useDispatch();

    const saveAndContinueName = "שמור והמשך";
    const addName = "הוספה";
    const title = "נסיון";
    const nextName="דלג"


    const ExperienceInInitialState = [{ placeExperience: '', fromYear: 0, toYear: 0, job: '', description: '' }]
    const [isUpdate, setIsUpdate] = useState(false);
    const [isAllExperienceFilled, setIisAllExperienceFilled] = useState(true);
    const Experiences = useSelector(selectors.getExperiencesById);

    useEffect(() => {
        dispatch(actions.getExperiencesById());
        Experiences == ExperienceInInitialState ? setIsUpdate(false) : setIsUpdate(true);
        console.log({ isUpdate });
    }, []);

    const saveExperiense = () => {
        const isFilled = checkValidetion();
        if (Experiences == ExperienceInInitialState) {
            dispatch(actions.deleteExperiences());
            dispatch(actions.isFillData());
        } else if (isFilled && !isUpdate) {
            dispatch(actions.saveExperiences());
        }
        else if (isFilled && isUpdate) {
            dispatch(actions.deleteExperiences());
            dispatch(actions.saveExperiences());
        }
        dispatch(actions.isFillData());
    };

    const addExperience = () => {
        const isFilled = checkValidetion();
        isFilled && dispatch(actions.addExperience())
    }

    const checkValidetion = () => {
        const isFilled = Experiences.every(
            (experience: IExperience) =>
                experience.placeExperience !== "" &&
                experience.toYear !== 0 &&
                experience.fromYear !== 0 &&
                experience.job !== ''
        );

        setIisAllExperienceFilled(isFilled);
        return isFilled
    }

    const getIsLoading = useSelector(selectors.getIsLoading) as boolean;

    return (<DivFormWrapper>
        <h1>{title}</h1>
        <hr />
        <br />
        {getIsLoading == true ? <div><CircularProgress color="inherit" /></div> : <div>
        <Button style={{ padding: "3px 15px" }}  onClick={()=>dispatch(actions.next())}>{nextName}</Button>
            <FormStyled>
                {Experiences.map((experience: IExperience, index: number) => <ExperienceDetails
                    key={1}
                    experience={experience}
                    index={index}
                    length={Experiences.length}
                    isAllExperienceFilled={isAllExperienceFilled}
                />)}
            </FormStyled>
            <DivButtons>
                <ControlPointOutlinedIcon titleAccess='הוסף ניסיון' fontSize='large' onClick={addExperience} />
                {/* <NextPlanOutlined titleAccess='דלג' fontSize='large' color='inherit' onClick={() => dispatch(actions.next())} /> */}
                <Button style={{ padding: "3px 15px" }} onClick={saveExperiense}>{saveAndContinueName}</Button>
            </DivButtons>
        </div>}
    </DivFormWrapper>)
}

export default Experience;