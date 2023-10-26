
import backendService from "../../../../service/backendService";
import { actions } from "./slice";
import { put, takeLatest, all } from "redux-saga/effects"

function* GetCandidate(action: ReturnType<typeof actions.OnGetCandidateFullDetails>){
    try{
        const {data}=yield backendService.GetCandidate({...action.payload});
        yield put(actions.OnSuccessGetCandidateFullDetails(data));
        }
        catch{
        yield put(actions.OnFaildGetCandidateFullDetails)
        }
}

export function* PopupCandidateInSaga(){
yield all([takeLatest(actions.OnGetCandidateFullDetails,GetCandidate)]);
}

