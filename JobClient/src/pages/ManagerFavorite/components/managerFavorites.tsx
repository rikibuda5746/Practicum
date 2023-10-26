import { FC, useEffect, useState } from "react";
import { CandidateDetails } from "../../candidatesForJob/modules/candidateDatils";
import { actions } from "../modules/slice";
import { Button, Card, CardContent, CardHeader, Dialog, DialogTitle, FormControl, InputLabel, Link, MenuItem, Select } from "@mui/material";
import { ButtonMe, DivFlexhigt } from "../../candidatesForJob/components/candidateForJob.styled";
import { AiOutlineClose } from "react-icons/ai";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { DetaylsInLine, DetaylsInLineH4, DetaylsInLineL, InCard, TopLine } from "../../../components/ShowJob/ShowJob.style";


const FavoriteCandidate:FC<{candidate:any}>=(props)=>{

const dispach=useDispatch();
const {userId, firstName, lastName, favorite, idJobstock, phone, email, datePublish,
        experienceYears,sector,gender, iStatusJobRequestId,city, recommends, trainings,cv}=props.candidate;

        const handelChengFavorite = () => {
            dispach(actions.ChengFavorite({ userId,favoriteChange: !favorite,idJobstock }))
          }
          
          let recommendsArr: string[] = recommends ? recommends.split('|') : [];
          let trainingsArr: string[] = trainings ? trainings.split('|') : [];
        
          const op: string[] = ["", "התקבל", "בתהליך", "בבדיקה", "נדחה"];
        
          const [SelectedOption, setSelectedOption] = useState<string>(op[iStatusJobRequestId]);
        
          const handleChange = (event: any) => {
            const IndexOp: number = op.findIndex(Iop => Iop == event.target.value);
            dispach(actions.ChangeStatusJobRequestIdToDB({ userId,newStatusJobRequestId: IndexOp,idJobstock}));
            setSelectedOption(event.target.value as string)
          };


return(
    <>
     <InCard>
        <Card>
          
          <CardContent>
          <CardHeader>
              <TopLine>
                <h1>{firstName+" "+lastName}</h1>
                   <ButtonMe> {favorite ? <FaHeart onClick={() => { handelChengFavorite() }} /> : <FaRegHeart onClick={() => handelChengFavorite()} />}</ButtonMe>
                   <p>{`${experienceYears ? experienceYears : 0}  שנות נסיון`}</p>
                   <p>{datePublish ? datePublish : ''}</p>
                   <p>{email}</p>
                   <p>{phone}</p>
            </TopLine>
        </CardHeader>

            <DetaylsInLine>
              <div>
        <div>
        <p>{city}</p>
        <p>{gender}</p>
        <p>{sector}</p>
        <p><Link underline="none" href={cv}  > קורות חיים </Link></p>
        {recommendsArr.length!=0?(<p>המלצות</p>):''}
        {recommendsArr.map(rec=><div>{`url:${rec}`}</div>)}
        {trainingsArr.length!=0?(<p>השכלה ונסיון</p>):''}
        {trainingsArr.map(traine=><div>{traine}</div>)}
        <FormControl>
          <label>סטטוס</label>
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
      </div>
              </div>
            </DetaylsInLine>
       
        
          </CardContent>
        </Card>
      </InCard>

















    {/* <div>
      <div>
      <div>
        {firstName + " " + lastName}
        <ButtonMe> {favorite ? <FaHeart onClick={() => { handelChengFavorite() }} /> : <FaRegHeart onClick={() => handelChengFavorite()} />}</ButtonMe>
      </div>
      
        <p>{`${experienceYears ? experienceYears : 0}  שנות נסיון`}</p>
        <p>{datePublish ? datePublish : ''}</p>
        <p>{email}</p>
        <p>{phone}</p>
        </div>
        <DivFlexhigt>
        <p>{city}</p>
        <p>{gender}</p>
        <p>{sector}</p>
        <p><Link underline="none" href={cv}  > קורות חיים </Link></p>
        {recommendsArr.length!=0?(<p>המלצות</p>):''}
        {recommendsArr.map(rec=><div>{`url:${rec}`}</div>)}
        {trainingsArr.length!=0?(<p>השכלה ונסיון</p>):''}
        {trainingsArr.map(traine=><div>{traine}</div>)}
        <FormControl>
          <InputLabel>סטטוס</InputLabel>
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
      <div>
        <ButtonMe autoFocus>
          שליחת מייל
        </ButtonMe>
      </div>
    </div> */}
    </>
)

}
export default FavoriteCandidate;

