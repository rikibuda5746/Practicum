import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actions, selectors } from "../../pages/GetJobs/modules/slice";
import { Button } from "@mui/material";
import { FaHeart } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import { FiCheckSquare } from "react-icons/fi"
import { BsClipboard2X } from "react-icons/bs"
import { BsClipboard2Check } from "react-icons/bs"
import { AiOutlinePlusCircle } from "react-icons/ai"
import { AiOutlineMinusCircle } from "react-icons/ai"
import { DetaylsInLine, TextHe } from "./ShowJob.style"
import { DetaylsInLineH4 } from "./ShowJob.style"
import { DetaylsInLineL } from "./ShowJob.style"
import { FavoriteButton } from "./ShowJob.style"
import { ApplyForN } from "./ShowJob.style"
import { ApplyFor } from "./ShowJob.style"
import { InCard } from "./ShowJob.style"
import { TopLine } from "./ShowJob.style"
import { ApplyDate } from "./ShowJob.style"
import Card from "../Card";
// import {selectors as userSelector} from '../../redux/data/user/modules/slice';


export interface JobsStock {
  iJobsStockId: number,
  iLnstitution: number,      //מניהולית(לא ברור בדיוק איזה סוג)
  dtDateBegin: Date,
  dtDateEnd: Date,
  nvJobName: string,
  iAgeGroupId: number,
  iHoursOfJobsId: number,
  nvAreaName: string,
  nvCityName: string,
  iExperienYears: number,
  blsPublic: boolean,
  blsOpen: boolean,
  nvTypesOfJobsName: string,
  dtDatePublish: Date,
  statusJobRequestId: number,
  nvJobDescription: string,
  favorite: number,
  dtDateJobRequest: Date;
  iMinSalary:number;
  iMaxSalary:number;
  bIsMonthlySalary:number;
}

export interface Data {
  jobs:JobsStock[]
}

export interface Props {
  data: JobsStock
}

const JobPresentation: React.FC<Props> = (props) => {
  const { data } = props;
  const dispatch = useDispatch();
  const [showDetails, setShowDetails] = useState<boolean>(false);
  const login = true; //אם המשתמש רשום או לא אמור להתקבל מהרידקס
  const jobs = useSelector(selectors.selectJobs)
  const iJobsStockId: number = props.data.iJobsStockId
  const iUserId=1;
  // const iUserId=useSelector(userSelector.getUserId);
  // console.log(iUserId);

  const dd = new Date(props.data.dtDateJobRequest)
  const cahngeFavorite = () => {
    var isFavorite: number = data.favorite;
    isFavorite == 1 ? isFavorite = 0 : isFavorite = 1;
    dispatch(actions.onFavoriteRequest({ iJobsStockId, iUserId, isFavorite }))
  }
  return (
    <div>
      <br />
      <InCard>
        <Card
          content=
          {<div>
              <TopLine>
              <h1>{props.data.nvJobName}</h1>
              <div>
                {props.data.favorite == 0 ? <FavoriteButton disabled={login ? false : true}>
                  <FaRegHeart onClick={() => cahngeFavorite()} />
                </FavoriteButton> : <FavoriteButton disabled={login ? false : true}>
                  <FaHeart onClick={() => cahngeFavorite()} /></FavoriteButton>}
                {new Date(props.data.dtDateJobRequest).getFullYear().toString() == '1900' ?
                  <Button onClick={() => dispatch(actions.onInsertRequest({ iJobsStockId, iUserId }))}>
                    <ApplyFor><BsClipboard2Check/>להגשת מועמדות</ApplyFor></Button> :
                  login ? <span><Button onClick={() => dispatch(actions.onRemoveCandidacy({ iJobsStockId, iUserId }))}>
                    <ApplyForN><BsClipboard2X/>להסרת המועמדות</ApplyForN></Button>
                    </span> :
                    <p>אינך רשום במערכת להגשת מועמדות יש להרשם!!!</p>}
              </div>
              </TopLine>
                {new Date(props.data.dtDateJobRequest).getFullYear().toString() == '1900' ?"":<ApplyDate> <FiCheckSquare/>הוגשה מועמדות ב-{dd.toLocaleDateString("en-GB")} </ApplyDate>}    
            <DetaylsInLine>
              <div>
                <DetaylsInLineH4>{props.data.nvAreaName}</DetaylsInLineH4>
                <DetaylsInLineL>|</DetaylsInLineL>
                <DetaylsInLineH4>{props.data.nvCityName}</DetaylsInLineH4>
                <DetaylsInLineL>|</DetaylsInLineL>
                {/* <DetaylsInLineH4>{props.data.iLnstitution}</DetaylsInLineH4>
          <DetaylsInLineL>|</DetaylsInLineL>*/}
                <DetaylsInLineH4>פורסמה ב- {props.data.dtDatePublish?.toString()}</DetaylsInLineH4>
              </div>
            </DetaylsInLine>
            {showDetails?<p>{props.data.nvJobDescription}</p>:<TextHe >{props.data.nvJobDescription}</TextHe>}           
            {showDetails ? <Button onClick={() => setShowDetails(!showDetails)}><AiOutlineMinusCircle></AiOutlineMinusCircle> להסתרת פרטי משרה</Button> : <Button onClick={() => (setShowDetails(!showDetails))} >  <AiOutlinePlusCircle></AiOutlinePlusCircle>לצפיה בפרטי המשרה</Button>}
            {showDetails &&
              (
                <div>
                  <p>דרישות התפקיד:</p>
                  {props.data.bIsMonthlySalary?
                  <p>שכר שעתי: {props.data.iMinSalary}-{props.data.iMaxSalary}</p>
                  :<p>שכר חודשי: {props.data.iMinSalary}-{props.data.iMaxSalary}</p>}
                  <p>תאריך תחילת עבודה: {props.data.dtDateBegin?.toString()}</p>
                  <p>תאריך סיום עבודה: {props.data.dtDateEnd?.toString()}</p>
                </div>
              )
            }
          </div>}>
        </Card>
      </InCard>
    </div>
  )
}
export default JobPresentation;