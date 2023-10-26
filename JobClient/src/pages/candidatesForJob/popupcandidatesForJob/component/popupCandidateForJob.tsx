import React, { FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actions, selectors } from "../modules/slice";
import { Button, Dialog, DialogActions, DialogTitle, FormControl, InputLabel, Link, MenuItem, Select } from "@mui/material";
import { ButtonMe, DivFlexhigt } from "../../components/candidateForJob.styled";
import { FaHeart, FaRegHeart} from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai"

const PopupCandidat: FC<{ jobStatosInt: number, jobsId: number, iuserId: number, onClose: any, isOpen: boolean, hendlChengFavorit: any, hendelChengStatos: any }> = (props) => {
  const status="סטטוס"
  const jobStockId = props.jobsId;
  const userId = props.iuserId;
  const jobStatosInt = props.jobStatosInt;
  let value = useSelector(selectors.getCandidateDetails);
  const { firstName, lastName, favorite, idJobstock, phone, email, datePublish,
  experienceYears,sector,gender, iStatusJobRequestId,city, recommends, trainings,cv } = value;
  const dispach = useDispatch();
  useEffect(() => {
    dispach(actions.OnGetCandidateFullDetails({ jobStockId, userId }));
  }, []);
  const handelChengFavorite = () => {
    console.log("in func");
    props.hendlChengFavorit();
    console.log("in funci");
    dispach(actions.OnChengFavoritePopup({ favoriteChange: !favorite }))
  }
  let recommendsArr: string[] = recommends ? recommends.split('|') : [];
  let trainingsArr: string[] = trainings ? trainings.split('|') : [];


  const op: string[] = ["", "התקבל", "בתהליך", "בבדיקה", "נדחה"];

  const [SelectedOption, setSelectedOption] = useState<string>(op[jobStatosInt]);

  const handleChange = (event: any) => {
    props.hendelChengStatos(event as any);
    const IndexOp: number = op.findIndex(Iop => Iop == event.target.value);
    dispach(actions.OnChengStatos({ newStatusJobRequestId: IndexOp }))
    setSelectedOption(event.target.value as string)
  };

  return (
    <Dialog open={props.isOpen} onClose={props.onClose}>
      <DialogTitle>
        {firstName + " " + lastName}
        <ButtonMe> {favorite ? <FaHeart onClick={() => { handelChengFavorite() }} /> : <FaRegHeart onClick={() => handelChengFavorite()} />}</ButtonMe>
      </DialogTitle>
      <Button style={{ color: '#08737d', position: 'absolute', top: 20, left: 10 }} onClick={props.onClose}> <AiOutlineClose /></Button>
      <DivFlexhigt>
        <p>{`${experienceYears ? experienceYears : 0}  שנות נסיון`}</p>
        <p>{datePublish ? datePublish : ''}</p>
        <p>{email}</p>
        <p>{phone}</p>
        <p>{city}</p>
        <p>{gender}</p>
        <p>{sector}</p>
        <p><Link underline="none" href={cv}  > קורות חיים </Link></p>
        {recommendsArr.length!=0?(<p>המלצות</p>):''}
        {recommendsArr.map(rec=><div>{`url:${rec}`}</div>)}
        {trainingsArr.length!=0?(<p>השכלה ונסיון</p>):''}
        {trainingsArr.map(traine=><div>{traine}</div>)}
        <FormControl>
          <label>{status}</label>
          <Select value={SelectedOption} onChange={(event) => {
            handleChange(event as any);
          }}>
            {op.map((option, index) => (
              <MenuItem key={index} value={option}>
                {option}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </DivFlexhigt>
      <DialogActions>
        <ButtonMe autoFocus>
          שליחת מייל
        </ButtonMe>
      </DialogActions>
    </Dialog>
  )
}
export default PopupCandidat;