import { put, takeLatest, all, call } from "redux-saga/effects"
import { actions } from "./slice"
import backendService from "../../../service/backendService";
import { TypeOf, string } from "yup";
import { error, log } from "console";

function* onInsertRecomend(action: ReturnType<typeof actions.onInsertRecomend>) {
    try {
        console.log("onInsertRecomendInSaga")
        backendService.UserRecommends_INS({...action.payload});
        yield put(actions.onSuccessInsertRecomend({ ...action.payload }))
    }
    catch {
        console.log("onInsertRecomend_catchInSaga")
        yield put(actions.onFaildInsertRecomend)
    }
}

export function* onInsertRecomendInSaga() { 
    yield all([takeLatest(actions.onInsertRecomend,onInsertRecomend)
    ]);
}
