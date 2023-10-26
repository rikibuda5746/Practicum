import { ReactNode, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { ITraining } from "../modules/interfaces"
import { validationSchema } from '../modules/constant';
import { useFormik } from "formik";
import { Input, Button, RangeOfYears } from '../../../components';
import { DivDetailsStyled, BStyeld, DivStyled } from '../../../components/FormStyeld/form.styeld'
import { actions } from "../modules/slice";
import TextareaAutosize from '@mui/base/TextareaAutosize';
import { FormControl, MenuItem, SelectChangeEvent, TextField } from "@mui/material";
import Select from "../../../components/Select";
import { Item } from "../../interface";
import backendService from "../../../service/backendService";
import { RiDeleteBin6Line } from 'react-icons/ri'


interface Props {
  key: number;
  training: ITraining;
  index: number;
  isAllTrainingsFilled: boolean;
}

const placeTrainingName = "מקום הכשרה";
const typeOfTrainingName = "סוג ההכשרה";
const noteName = "הערות";
const removeName = "מחיקה";

const TrainingDetails = ({ key, training, index, isAllTrainingsFilled }: Props): JSX.Element => {

  const [errorFromYear, setErrorFromYear]: [boolean, Function] = useState(false);
  const [errorToYear, setErrorToYear]: [boolean, Function] = useState(false);
  const [typeOfTrainings, setTypeOfTrainings]: [Item[], Function] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setTypeOfTrainings((await (backendService.getSelect({ tableName: "dbo.TypesOfTraining", idColumnName: "iTypesOfTrainingId", valueColumnName: "nvTypesOfTrainingName" }))).data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();

  }, []);

  const dispatch = useDispatch();

  const formik = useFormik<ITraining>({
    initialValues: {
      placeTraining: training.placeTraining ?? "",
      fromYear: training.fromYear ?? new Date().getFullYear() - 50,
      toYear: training.toYear ?? new Date().getFullYear(),
      typeOfTraining: training.typeOfTraining ?? "",
      note: training.note ?? "",
    },
    validationSchema: validationSchema,
    onSubmit: () => { },
  });

  useEffect(() => {
    if (!isAllTrainingsFilled) {
      formik.values.fromYear == 0 ? setErrorFromYear(true) : setErrorFromYear(false);
      formik.values.toYear == 0 ? setErrorToYear(true) : setErrorToYear(false);
      console.log('here');
      formik.validateForm(formik.values);
      console.log('72');
    }
    else {
      setErrorFromYear(false);
      setErrorToYear(false);
    }
  }, [isAllTrainingsFilled])

  useEffect(() => {
    formik.setFieldValue('placeTraining', training.placeTraining ?? "", false);
    formik.setFieldValue('fromYear', training.fromYear ?? new Date().getFullYear() - 50, false);
    formik.setFieldValue('toYear', training.toYear ?? new Date().getFullYear(), false);
    formik.setFieldValue('typeOfTraining', training.typeOfTraining ?? "", false);
    formik.setFieldValue('note', training.note ?? "", false);
  }, [training]);

  const setFromYear = (value: number) => {
    formik.setFieldValue('fromYear', value, false)
    dispatch(actions.saveDetailsNumber({ "index": index, "filedName": "fromYear", "value": value }))
  }

  const setToYear = (value: number) => {
    formik.setFieldValue('toYear', value, false)
    dispatch(actions.saveDetailsNumber({ "index": index, "filedName": "toYear", "value": value }))
  }

  const saveTypeOfTraining = (e: SelectChangeEvent<unknown>) => {
    formik.handleChange(e)
    formik.setFieldValue('typeOfTraining', e.target.value, false)
    dispatch(actions.saveDetailsString({ 'index': index, "filedName": "typeOfTraining", "value": e.target.value as string }))
  }

  const savePlaceTraining = (e: string) => {
    formik.handleBlur(e)
    dispatch(actions.saveDetailsString({ "index": index, "filedName": "placeTraining", "value": formik.values.placeTraining }))
  }
  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <DivDetailsStyled >
          <DivStyled>
            <BStyeld>{placeTrainingName}
              <Input
                id="outlined-basic"
                name="placeTraining"
                value={formik.values.placeTraining}
                onChange={formik.handleChange}
                error={Boolean(formik.errors.placeTraining)}
                helperText={formik.errors.placeTraining}
                onBlur={(e: any) => savePlaceTraining(e)}
              /> </BStyeld>
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

          <DivStyled>
            <BStyeld>{typeOfTrainingName}
              <FormControl sx={{ m: 1, minWidth: 214 }}>
                <Select
                  name="typeOfTraining"
                  value={formik.values.typeOfTraining}
                  onChange={(e: SelectChangeEvent<unknown>, child: ReactNode) => saveTypeOfTraining(e)}
                  onBlur={formik.handleBlur}
                  error={Boolean(formik.errors.typeOfTraining)}
                  helperText={formik.errors.typeOfTraining ? "" + formik.errors.typeOfTraining : ""}
                >
                  {typeOfTrainings.map((typeOfTraining: Item) => (
                    <MenuItem key={typeOfTraining.id} value={typeOfTraining.id}>{typeOfTraining.value}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </BStyeld>
          </DivStyled>

          <DivStyled>
            <BStyeld>{noteName}
              <TextField multiline variant='outlined'
                id="outlined-basic"
                name="note"
                value={formik.values.note}
                onChange={formik.handleChange}
                onBlur={() => dispatch(actions.saveDetailsString({ "index": index, "filedName": "note", "value": formik.values.note }))}
                minRows={1} maxRows={3}
              /> </BStyeld>
          </DivStyled>
          <RiDeleteBin6Line title='מחיקה' fontSize="80px" onClick={() => dispatch(actions.removeObject({ index: index }))}/>
        </DivDetailsStyled>
      </form>
    </div>
  );
}
export default TrainingDetails;