import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { actions, selectors as ManagerJobsSelectors } from '../moduls/slice';
import { Job } from '../../../components/ManagerJob/modules/interfaces';
import ManagerJob from '../../../components/ManagerJob';


export const ManagerJobs: React.FC<any> = () => {
    const title="משרות שפרסמתי"
    const dispatch = useDispatch();
    const jobs: Job[] = useSelector(ManagerJobsSelectors.getJobs);
    const [jobToShow,setJobToShow] = useState(0);
    useEffect(() => {
        dispatch(actions.onGetJobsRequest({}));
    }, []);    
    

    return (
        <div>
       <h1 style={{margin:"10px"}}>{title}</h1>
            <hr />
            {/* <Cards> */}
                {jobs?.map((job:Job) => (
                    <ManagerJob job={job} jobToShow={jobToShow} setShowJobs={setJobToShow}/>
                ))}
            {/* </Cards> */}
        </div>
    );
};
