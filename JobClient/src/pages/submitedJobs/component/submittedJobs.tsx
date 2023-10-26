import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ShowJob, { Data, JobsStock } from "../../../components/ShowJob/ShowJob";
import { actions, selectors as submittedJobsSelectors } from "../moduls/slice";
import { WrapperjobsList } from "../../ShowJobs/components/SJobs.style";
import { Job } from "../../../components/ManagerJob/modules/interfaces";


export const SubmittedJobs: React.FC<any> = () => {
    const dispatch = useDispatch();

    const jobs: JobsStock[] = useSelector(submittedJobsSelectors.getJobs);
    console.log(jobs,"==jobs");
    
    useEffect(() => {
        console.log("in component");
        dispatch(actions.onGetJobsRequest({}))
    }, []);

    
    // const [ifRelowd,setIfRelowd]=useState(false);
    // ifRelowd? dispatch(actions.onGetJobsRequest({})):null;
     

    return (
        <WrapperjobsList>
            {jobs && jobs.map((j: JobsStock, i: any) => <ShowJob key={j.iJobsStockId} data={j} />)}
        </WrapperjobsList>
    );
}