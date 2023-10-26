import { CardActions, CardContent, Collapse, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { MoreLessDetails, CandidatesButton, CircleButton, LightButton, PopupHeader, PopupButtons, PopUp, Header, Card, Button, CardStyle, JobFooter, JobHeader, StyledTypography } from "./ManagerJob.styled";
import { Props } from "../modules/interfaces";
import { CardsWrapper } from "../../../pages/home/components/Home.styled";
import { useDispatch } from "react-redux";
import { actions } from "../modules/slice";
import CandidateSForJob from "../../../pages/candidatesForJob/components/candidateSForJob";
import { MdExpandMore, MdExpandLess, MdOutlineExpandMore } from 'react-icons/md';
import { FcExpand } from 'react-icons/fc';
import { FiEdit } from 'react-icons/fi'
import { FaLockOpen,FaLock } from 'react-icons/fa'



//i need to check every parameter that  he not null ???

export const ManagerJob: React.FC<Props> = (data: Props) => {

    const candidatesForJob = "מועמדים למשרה";
    const jobDescription = "תאור משרה: ";
    const jobs = "משרת";
    const experienceYear = "שנות נסיון";
    const ILS = "ש\"ח";
    const edit = "עריכה"
    const institutionName = "שם מוסד: ";
    const [isModalOpen, setModalOpen] = useState(false);
    const [expanded, setExpanded] = useState(false);
    const [isOpen, setIsOpen]:[boolean,Function] = useState(data.job.IsOpen==='1'?true:false);
    const [isclick, setIsClick] = useState(false);

    const PopUpInfo = `האם אתה בטוח שברצונך ${isOpen ? 'לסגור' : 'לפתוח'} משרה זו ?`;

    const dispatch = useDispatch();

    const handlePopUpOpen = () => {
        console.log("open pop up");
        setModalOpen(true);
    };

    const handlePopUpClose = () => {
        console.log("close pop up");
        setModalOpen(false);
    };

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const handleIsOpen = () => {
        setIsOpen(!isOpen);
        dispatch(actions.onCloseOrOpenJobRequest({ jobID: data.job.JobStockId }));
        handlePopUpClose();
    }
    const moment = require('moment');

    const IsSalaryRange: boolean = (data.job.minSalary != null && data.job.maxSalary != null);
    const fontSize = "150%";


    return (
        <div>
            <Card>
                <CardStyle>
                    <JobHeader>
                        <Typography variant="h5" component="div" paddingRight={"2%"} fontSize={'2rem'}>
                            {data.job.JobName}
                        </Typography>
                    </JobHeader>
                    <Typography variant="caption" component="span" marginRight={"1%"}>
                        <b>תאריך פירסום: </b>{moment(data.job.DatePublish).format('DD/MM/YYYY')}
                    </Typography>
                    <Header>
                        <CircleButton><FiEdit /></CircleButton>
                        <LightButton onClick={handlePopUpOpen} >{isOpen ? <FaLock/> : <FaLockOpen/>} </LightButton>
                    </Header>
                    <Typography marginRight={'10px'} >{/*marginTop={'5px'}>*/}
                        <b style={{ fontSize: '140%' }}>{data.job.AreaName}, {data.job.CityName}</b>
                        <br />
                        <b>{jobDescription}</b> {data.job.JobDescription}
                    </Typography>
                    {isModalOpen && (
                        <PopUp>
                            <PopupHeader>הערה:</PopupHeader>
                            <Typography textAlign={'center'} paddingTop={'27px'}>{PopUpInfo}</Typography>
                            <PopupButtons>
                                <Button onClick={handlePopUpClose}>חזרה</Button>
                                <Button onClick={handleIsOpen}>המשך</Button>
                            </PopupButtons>
                        </PopUp>
                    )}
                    <Collapse color="text.secondary" in={expanded} timeout="auto" unmountOnExit>
                        {/* <CardContent> */}
                        <Typography sx={{ fontWeight: 135 }} variant="body2" color="text.secondary" padding={'6px'} paddingRight={'30px'}>
                            <div>
                                <b>{data.job.DateBegin ? ' תאריך תחילת עבודה: ' + moment(data.job.DateBegin).format('DD/MM/YYYY') : ''}</b><br />
                                <b>{data.job.DateBegin ? ' תאריך סיום עבודה: ' + moment(data.job.DateEnd).format('DD/MM/YYYY') : ''}</b><br />
                                <b>{institutionName}</b> {data.job.InstitutionName}<br />
                                <b>{experienceYear}: </b> {data.job.ExperienYears}<br />
                                <b>{jobs}: </b>{data.job.HoursOfJobsName}<br />
                                {data.job.IsMonthlySalary ? <b>שכר חודשי: </b> : <b> שכר לשעה: </b>}
                                {IsSalaryRange ? data.job.minSalary + ' - ' + data.job.maxSalary : data.job.minSalary ? data.job.minSalary : data.job.maxSalary} {ILS}<br />

                            </div>
                        </Typography>
                        {/* </CardContent> */}
                    </Collapse>

                    {/* <CardActions> */}
                         
                    {/* </CardActions> */}

                    {/* <CardContent> */}
                    <JobFooter>
                        <MoreLessDetails >
                        <div onClick={handleExpandClick}>
                            {expanded ? <MdExpandLess /> : <MdExpandMore />}
                        </div>
                    </MoreLessDetails>
                        <StyledTypography variant="h5">
                            <CandidatesButton><Button onClick={() => {data.setShowJobs(data.job.JobStockId);setIsClick(!isclick);}}>{candidatesForJob}</Button></CandidatesButton>
                            {isclick && data.jobToShow == data.job.JobStockId ? <CandidateSForJob idJobstock={data.job.JobStockId} /> : ''}
                        </StyledTypography>
                    </JobFooter>
                    {/* </CardContent> */}
                </CardStyle>
            </Card>
        </div >
    );
}


//מה עם אפשרות של שכר מול המעסיק


//קישור לפיגמה
// https://www.figma.com/file/8GRtdQTKD3TlZ5MDLaCCl8/%D7%A9%D7%99%D7%A0%D7%95%D7%99%D7%99%D7%9D-w2030?type=design&node-id=253-746
