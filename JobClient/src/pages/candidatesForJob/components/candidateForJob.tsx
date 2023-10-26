import { FC, useState } from 'react';
import { useDispatch } from 'react-redux';
import { actions } from '../modules/slice';
import { CandidateLessDetails, StatusJobsRequestId } from '../modules/candidateDatils';
import {  FaHeart, FaRegHeart } from "react-icons/fa";
import {  FormControl, MenuItem, Select, InputLabel, TableRow } from '@mui/material';
import {  ButtonMe, TableCellMe } from './candidateForJob.styled';
import PopupCandidat from '../popupcandidatesForJob/component/popupCandidateForJob';


const CandidateForJob: FC<{ candidate: CandidateLessDetails }> = (props) => {
  const status="סטטוס"
   
  const dispach = useDispatch();
  const [isFullDatils, setisFullDatils] = useState<boolean>(false)
  const { userId, firstName, lastName, phone, email,  experienceYears, datePublish,
  idJobstock, favorite, iStatusJobRequestId } = props.candidate;

  const FuncFavoriteChange = () => {
    dispach(actions.onChangeFavoriteToDB({ userId, favoriteChange: !favorite, idJobstock }))
  }

  const FuncChangeStatusJobRequestId = (e: number) => {
    const newStatusJobRequestId: StatusJobsRequestId = e;
    dispach(actions.ChangeStatusJobRequestIdToDB({ userId, newStatusJobRequestId, idJobstock }))
  }

  const op: string[] = ["", "התקבל", "בתהליך", "בבדיקה", "נדחה"];
  const [SelectedOption, setSelectedOption] = useState<string>(op[iStatusJobRequestId]);
  const handleChange = (event: any) => {
    const IndexOp = op.findIndex(Iop => Iop == event.target.value);
    FuncChangeStatusJobRequestId(IndexOp);
    setSelectedOption(event.target.value as string)
  };

  return (<>
            <TableRow key={idJobstock}>
              <TableCellMe align="right" component="th" scope="row">
             { <ButtonMe> {favorite ? <FaHeart onClick={FuncFavoriteChange} /> : <FaRegHeart onClick={FuncFavoriteChange} />}</ButtonMe>}
              </TableCellMe>
              <TableCellMe align="right">{firstName+" "+lastName}</TableCellMe>
              <TableCellMe align="right">{"experienceYears"}</TableCellMe>
              <TableCellMe align="right">{phone}</TableCellMe>
              <TableCellMe align="right">{email}</TableCellMe>
              <TableCellMe align="right">{
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
          </FormControl>}</TableCellMe>
              <TableCellMe  align="right">{datePublish}</TableCellMe>
           <TableCellMe  align="right" onClick={()=>{setisFullDatils(true)}}> <ButtonMe>{"פרטים מלאים"}</ButtonMe> </TableCellMe>
            </TableRow>
             { isFullDatils?<PopupCandidat jobStatosInt={iStatusJobRequestId} hendelChengStatos={handleChange} hendlChengFavorit={FuncFavoriteChange} jobsId={idJobstock} iuserId={userId} isOpen={isFullDatils} onClose={()=>setisFullDatils(false)} />:''}
  </>)
}
export default CandidateForJob;