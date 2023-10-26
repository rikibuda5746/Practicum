import CandidateSForJob from "./candidateSForJob"

const title="רשימת מועמדים"
export const CandidateSForJobWrapper=()=>{
    return(<div>
    <h1 style={{margin:"10px"}}>{title}</h1>
    <hr />
        <CandidateSForJob />
    </div>)

}

