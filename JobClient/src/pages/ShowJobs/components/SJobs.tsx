
import React from "react"
import Jobs from "../../GetJobs/components/Jobs"
// import {JobsStock} from '../../../components/ShowJob/ShowJob';
// import ShowJob from '../../../components/ShowJob/ShowJob';
import SearchJob from "../../searcJob/searchJob";
import ShowJob, { JobsStock } from '../../../components/ShowJob/ShowJob';
import { WrapperjobsList } from "./SJobs.style";


export interface Props {
    data: [JobsStock]
}
const SJobs: React.FC<Props> = (props) => {
   const jobs:[JobsStock]=props.data   
return (
    <div>
        <SearchJob/>
        {jobs && jobs.map((j: JobsStock, i: any) => <div>
        < ShowJob key={j.iJobsStockId} data={j} /></div>)}
    </div>
    // <WrapperjobsList>
    //     {jobs && jobs.map((j: JobsStock, i: any) => <ShowJob key={j.iJobsStockId} data={j} />)}
    //     {[].map((item)=> <div>{item}</div>)}
    // </WrapperjobsList>
)
}
export default SJobs