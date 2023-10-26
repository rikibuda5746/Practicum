import { all,call, put, select, takeLatest } from "redux-saga/effects";
import { actions } from "./slice";
import backendService from "../../../service/backendService";
import { selectors } from "../../../redux/data/user/modules/slice";
// import { all } from "axios";
 
function* onGetJobsRequest(action:ReturnType<typeof actions.onGetJobsRequest>):Generator<any,any,{jobs:any}>{
    console.log('in try->saga');
    try{
        // const userId = yield select(selectors.getUserId);
        const mySlice:any = yield select((state:any) => state);
        const userId:string=mySlice.data.user.id;
        const data = yield call(backendService.submittedJobs_slct,userId)//userId);
        yield put(actions.onGetJobsSuccess({...data}))
    }
    catch{
        yield put(actions.onGetJobsFailed)
    }
}

export function* submittedJobsSaga(){
    yield all([takeLatest(actions.onGetJobsRequest,onGetJobsRequest)]);
}
