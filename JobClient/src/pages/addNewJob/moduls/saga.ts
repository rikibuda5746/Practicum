
import { call, put, takeEvery, all } from "redux-saga/effects";
import backendService from "../../../service/backendService";
import { actions } from './slice'
import { NewJob , updateJob } from "./interfaces";
import { Item } from "../../interfaces";

function* onSaveNewJobs(action:ReturnType<typeof actions.onSaveNewJobs>): Generator<any, any> {
    try {      
        const status = yield call(backendService.addNewJob,action.payload);
        yield put(actions.onSaveJobsNewSuccess());
    }

    catch (e) {
        console.log(e);
        console.log("the data not save!!!");
    }
}

function* onUpdateJob(action:ReturnType<typeof actions.onUpdateJob>): Generator<any, any> {
    try {      
        const status = yield call(backendService.jobStock_UPD, action.payload);
        yield put(actions.onUpdateJobSuccess());
    }

    catch (e) {
        debugger
        console.log(e);
        console.log("the data not update!!!");
        debugger
    }
}

export default function* watchInstitutesActions() {
    yield all([
        takeEvery(actions.onSaveNewJobs, onSaveNewJobs),
        takeEvery(actions.onUpdateJob, onUpdateJob),

    ]);
}














// function* GetJobsRequest(): Generator<any, any, { data: any}> {//Item[] 
//     try {
//         const  res  = yield call(backendService.getJobs);
//         var db = JSON.stringify(res.data);
//         var jobs = JSON.parse(db);             
//         yield put(actions.GetJobsRequestSuccess( jobs ));
//     }
//     catch (e) {
//         console.log(e);
//     }
//     console.log("in saga",jobs);

// }


// function* GetJobsRequest(){
//     try{
//         const {data} = yield call(backendService.getJobs);
//         yield put(actions.GetJobsRequestSuccess(data));
//     }
//     catch(e){
//         console.log(e);
//     }
// }

// export default function* watchInstitutesActions() {
//     yield all([
//         takeLatest(actions.GetJobsRequest, GetJobsRequest),
//     ]);
// }




// function* onLogin(action:ReturnType<typeof actions.onLogin>):Generator<any,any,{data:any}> {
//     try {
//         const { username,password }=action.payload;
//         const {data} = yield call(backendService.login,{username:username,password:password});
//         yield put(actions.onLoginSuccess({...data ,role:'user'}));
//     }
//     catch (e) {
//         console.log(e);
//     }
// }

// export default function* watchInstitutesActions() {
//     yield all([
//         takeLatest(actions.onLogin, onLogin),
//     ]);
// }


