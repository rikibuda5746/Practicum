import { put, takeLatest, all, call } from "redux-saga/effects"
import { actions } from "./slice"
import backendService from "../../../service/backendService";
import { TypeOf, string } from "yup";
import { error } from "console";



function* onChangeFavoriteToDB(action: ReturnType<typeof actions.onChangeFavoriteToDB>) {
    try {
        yield backendService.favoritUPD({...action.payload});
        yield put(actions.onSuccessChangeFavorite({ ...action.payload }))
    }
    catch {
        yield put(actions.onFaildChangeFavorite)
    }
}

function* ChangeStatusJobRequestIdToDB(action: ReturnType<typeof actions.ChangeStatusJobRequestIdToDB>) {
    try {
        
        backendService.JobRequest_UPD({...action.payload});
        yield put(actions.onSuccessChangeStatusJobRequestId({ ...action.payload }))
    }
    catch {
        yield put(actions.onFaildChangeStatusJobRequestId)
    }
}

function* onGetCandidatesDetailsFromDB(action: ReturnType<typeof actions.onGetCandidatesDetails>){
try{
const {data}=yield backendService.JobRequest_GET({...action.payload});
yield put(actions.onSuccessGetCandidatesDetails(data));
}
catch{
yield put(actions.onFaildGetCandidatesDetails)
}
}

export function* onChangeCandidatesActionsInSaga() { 
    yield all([takeLatest(actions.onChangeFavoriteToDB,onChangeFavoriteToDB),takeLatest(actions.ChangeStatusJobRequestIdToDB,ChangeStatusJobRequestIdToDB)
        ,takeLatest(actions.onGetCandidatesDetails,onGetCandidatesDetailsFromDB)
    ]);
}
 