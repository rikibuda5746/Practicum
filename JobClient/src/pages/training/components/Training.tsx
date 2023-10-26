import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { actions, selectors } from "../modules/slice";
import { ITraining } from "../modules/interfaces";
import TrainingDetails from "./TrainingDetails";
import { FormStyled, DivButtons, DivFormWrapper } from "../../../components/FormStyeld/form.styeld";
import { Button } from "../../../components";
import { Box, CircularProgress } from "@mui/material";
import NextPlanOutlined from '@mui/icons-material/NextPlanOutlined'
import ControlPointOutlinedIcon from '@mui/icons-material/ControlPointOutlined';

const TrainingPage: React.FC = () => {

  const dispatch = useDispatch();

  const saveAndContinueName = "שמור והמשך";
  const addName = "הוספה";
  const title = "הכשרה";
  const nextName="דלג"
  const TrainingInInitialState = [{ placeTraining: '', fromYear: 0, toYear: 0, typeOfTraining: '', note: '' }]
  const [isUpdate, setIsUpdate] = useState(false)
  const [isAllTrainingsFilled, setIsAllTrainingsFilled]: [boolean, Function] = useState(true);
  const trainings = useSelector(selectors.getTrainingsById);
  const getIsLoading = useSelector(selectors.getIsLoading) as boolean;

  useEffect(() => {
    dispatch(actions.getTrainingsById());
    trainings == TrainingInInitialState ? setIsUpdate(false) : setIsUpdate(true);
    console.log({ isUpdate });
  }, []);

  const saveTraining = () => {

    const isFilled = checkValidetion()
    if(trainings==TrainingInInitialState){
      dispatch(actions.deleteTrainings());
      dispatch(actions.isFillData());
    } else if (isFilled && !isUpdate) {
      dispatch(actions.saveTrainings());
    }
    else if (isFilled && isUpdate) {
      dispatch(actions.deleteTrainings());
      dispatch(actions.saveTrainings());
    }
    dispatch(actions.isFillData());
  };

  const addTraining = () => {
    const isFilled = checkValidetion();
    isFilled && dispatch(actions.addTraining())
  }

  const checkValidetion = () => {
    const isFilled = trainings.every(
      (training: ITraining) =>
        training.placeTraining !== "" &&
        training.toYear !== 0 &&
        training.fromYear !== 0 &&
        training.typeOfTraining !== ''
    );
    setIsAllTrainingsFilled(isFilled);
    return isFilled
  }

  return (<DivFormWrapper >
    <h1>{title}</h1>
    <hr />
    <br />
    {getIsLoading == true ? <div><CircularProgress color="inherit" /></div> : <div>
    <Button style={{ padding: "3px 15px" }}  onClick={()=>dispatch(actions.next())}>{nextName}</Button>
      <FormStyled>
        {trainings.map((training: ITraining, index: number) => (
          <TrainingDetails key={index} training={training} index={index} isAllTrainingsFilled={isAllTrainingsFilled} />
        ))}
      </FormStyled>
      <DivButtons>
        <ControlPointOutlinedIcon titleAccess='הוסף ניסיון' fontSize='large' onClick={addTraining} />
        {/* <NextPlanOutlined titleAccess='דלג' fontSize='large' color='inherit' onClick={() => dispatch(actions.next())} /> */}
        <Button style={{ padding: "3px 15px" }} onClick={saveTraining}>{saveAndContinueName}</Button>
      </DivButtons>
    </div>}
  </DivFormWrapper>
  );
};

export default TrainingPage;