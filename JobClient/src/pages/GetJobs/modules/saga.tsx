import React from 'react';
import { all, call, put, takeLatest,takeEvery } from 'redux-saga/effects';
import { actions } from "./slice";
import { JobsStock } from "../../../components/ShowJob/ShowJob";
import backendService from '../../../service/backendService';
import { number } from 'yup/lib/locale';
import { log } from 'console';


function* onGetJobRequest(action:ReturnType<typeof actions.onGetJobRequest>){
    try {
        // const {data}= yield backendService.getJobs({...action.payload});
        const {data}=yield backendService.getJobs({...action.payload})
        console.log("onGetJobRequest jobs    ",data);
        yield put(actions.onGetJobSuccess(data));
    } catch (error){
        yield put(actions.onGetJobsFailure(error));
    }
}

// function* onGetAplyfor(action:ReturnType<typeof actions.onGetAplyfor>){
//     try {
//         const {data}=yield backendService.getJobsByApplyFor({...action.payload})
//         yield put(actions.onGetJobSuccess(data));
//     } catch (error) {
        
//     }
// }

export function* watchGetJobs() {
    yield all([
        takeLatest(actions.onGetJobRequest, onGetJobRequest),takeLatest(actions.onInsertRequest, onInsertRequest),takeLatest(actions.onRemoveCandidacy,onRemoveCandidacy)
        ,takeLatest(actions.onFavoriteRequest, onFavoriteRequest)
    ]) 
}
function* onInsertRequest(action:ReturnType<typeof actions.onInsertRequest>) {
    try {
        const {iJobsStockId, iUserId} = action.payload
        const s=backendService.insertRequest({iJobsStockId,iUserId})
        yield put(actions.onInsertRequestSuccess({iJobsStockId,iUserId}))
    } catch (error) {
        yield put(actions.onInsertRequestFailure(error))
    }
}
function* onRemoveCandidacy(action:ReturnType<typeof actions.onRemoveCandidacy>) {
    try {
        const {iJobsStockId, iUserId} = action.payload
        const r=backendService.removeCandidacy({iJobsStockId,iUserId})
        yield put(actions.onRemoveCandidacySuccess({iJobsStockId,iUserId}))
    } catch (error) {
        yield put(actions.onRemoveCandidacyFailure(error))
    }
}
function* onFavoriteRequest(action:ReturnType<typeof actions.onFavoriteRequest>) {
    try {
        const {iJobsStockId,iUserId,isFavorite} = action.payload
        const f=backendService.favorite_upd({iJobsStockId,iUserId,isFavorite})
        yield put(actions.onFavoriteRequestSuccess({iJobsStockId,iUserId,isFavorite}))
    } catch (error) {
        yield put(actions.onFavoriteRequestFailure(error))
    }
}

