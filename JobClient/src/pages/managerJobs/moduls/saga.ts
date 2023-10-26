import backendService from "../../../service/backendService";
import { put, takeLatest, all, call, select } from "redux-saga/effects"
import { actions } from "./slice"
import { TypeOf, string } from "yup";
import { error } from "console";
import { selectors } from "../../../redux/data/user/modules/slice";

function* onGetJobsRequest():Generator<any, any, { jobs: any }>{
    console.log("in saga req");
    
    try{
        const mySlice:any = yield select((state:any) => state);
        const userId:string=mySlice.data.user.id;
        // const userId = yield select(selectors.getUserId);
        console.log("userDetailes  ",userId);
        
        const data = yield call(backendService.ManagerJobs_GET,userId)//userId); 
        yield put(actions.onGetJobsSuccess(data));
    }
    catch{
        yield put(actions.onGetJobsFailed);
    }
}

export function* ManagerJobsSaga() { 
    yield all([takeLatest(actions.onGetJobsRequest,onGetJobsRequest)]);
}
//468798120