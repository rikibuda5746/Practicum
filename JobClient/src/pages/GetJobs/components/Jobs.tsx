import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actions, JobsSlice, selectors } from "../modules/slice";
import SJobs from "../../ShowJobs/components/SJobs"
import { string } from "yup";
const Jobs = () => {
    const dispatch = useDispatch();
    const userId=1
    const jobs = useSelector(selectors.selectJobs)
    useEffect(() => {
        dispatch(actions.onGetJobRequest({userId}))
    }, [])    
    return (
        <div>            
           <SJobs data={jobs}></SJobs>
        </div>
    )
}
export default Jobs