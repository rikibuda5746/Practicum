import { actions, selectors } from '../modules/slice'
import { useSelector, useDispatch } from 'react-redux';
import CandidateForJob from './candidateForJob';
import { CardsWrapper } from "../../home/components/Home.styled";
import { FC, useEffect } from 'react';
import { type } from 'os';
import { types } from 'util';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { TableCellMe } from './candidateForJob.styled';
import { DivFormWrapper } from '../../../components/FormStyeld/form.styeld';

const noData="לא נמצאו נתונים"
const addToFavorite = "הוסף למועדפים"
const name = "שם"
const experience = "נסיון"
const phone = "טלפון"
const email = "מייל"
const status = "סטטוס"
const fullDetails="פרטים מלאים"
const dateCandidate="תאריך הגשת מועמדות"

const CandidateSForJob: FC<{ idJobstock?: number }> = (props) => {

  const title = "רשימת מועמדים"
  let value = useSelector(selectors.getCandidates);
  const dispach = useDispatch();

  const { idJobstock } = props;

  useEffect(() => {
    dispach(actions.onGetCandidatesDetails({ idJobstock }))
  }, []);

  return (<div>
    {value.length > 0 ? <TableContainer style={{ marginTop: '5%', }} component={Paper}>
      <Table style={{ minWidth: '100%', position: 'relative', overflow: 'scroll' }} aria-label="candidate table">
        <TableHead>
          <TableRow>
            <TableCellMe align="right">{addToFavorite}</TableCellMe>
            <TableCellMe align="right"> {name}</TableCellMe>
            <TableCellMe align="right">{experience}</TableCellMe>
            <TableCellMe align="right">{phone}</TableCellMe>
            <TableCellMe align="right">{email}</TableCellMe>
            <TableCellMe align="right">{status}</TableCellMe>
            <TableCellMe align="right">{dateCandidate}</TableCellMe>
            <TableCellMe align="right"> {fullDetails}</TableCellMe>
          </TableRow>
        </TableHead>
        <TableBody>
          {value ? value.map((candidate: any, i: number) => <CandidateForJob candidate={candidate} key={i} />) : ""}
        </TableBody>
      </Table>
    </TableContainer>:<h3>{noData}</h3>}

  </div>)
}
export default CandidateSForJob;