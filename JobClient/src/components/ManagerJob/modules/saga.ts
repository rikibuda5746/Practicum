import backendService from "../../../service/backendService";
import { actions } from "./slice";
import { put, takeLatest, all, call } from "redux-saga/effects"


function* onCloseOrOpenJob(action: ReturnType<typeof actions.onCloseOrOpenJobRequest>){
    try{
        const {res} = yield backendService.ManagerJob_POST({...action.payload});
        yield put(actions.onCloseOrOpenJobResponse({res}))
    }
    catch{
        yield put(actions.onCloseOrOpenJobFailed())
    }

}
    
    export function* ManagerJobSaga() { 
        yield all([takeLatest(actions.onCloseOrOpenJobRequest,onCloseOrOpenJob)
        ]);
    }