
import { actions }  from './slice';
import { call, takeLatest ,all, put} from 'redux-saga/effects';
import backendService from '../../../service/backendService';


function* GetfavoriteCandidate(action:ReturnType<typeof actions.GetfavoriteCandidate>){
try {
    console.log("gfhfhgfhf");
    const {data} = yield backendService.Get_favoriteCandidate({...action.payload});
    console.log(data);
    yield  put(actions.successGetfavoriteCandidate(data));
} catch (error) {
    yield put(actions.failedGetfavoriteCandidate);
}
}

function* ChengFavorite(action: ReturnType<typeof actions.ChengFavorite>){
try {
    yield  backendService.favoritUPD({...action.payload});
    yield  put(actions.successChengFavorite({ ...action.payload }));
} catch (error) {
    yield put(actions.failedGetfavoriteCandidate);
}
}

function* ChangeStatusJobRequestIdToDB(action:ReturnType<typeof actions.ChangeStatusJobRequestIdToDB>) {
    try {
        console.log("ChangeStatusJobRequestIdToDB",action.payload.newStatusJobRequestId);
        
        backendService.JobRequest_UPD({...action.payload});
        yield put(actions.onSuccessChangeStatusJobRequestId({ ...action.payload }));
    }
    catch {
        yield put(actions.onFaildChangeStatusJobRequestId);
    }
}



export function* SagafavoriteCandidate(){    
   yield all([takeLatest(actions.GetfavoriteCandidate,GetfavoriteCandidate),takeLatest(actions.ChengFavorite,ChengFavorite),takeLatest(actions.ChangeStatusJobRequestIdToDB,ChangeStatusJobRequestIdToDB)]);
}

 