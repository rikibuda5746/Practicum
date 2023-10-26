import { all, put, call, takeLatest, spawn } from "redux-saga/effects";
import { actions } from "./slice";

function* onAppMounted() {
    try {
        const response = 'test'
        yield put(actions.onAppMountedSuccess(response));
    }
    catch (e) {
        console.log(e);
    }
}

export default function* watchAppActions() {
    yield all([takeLatest(actions.onAppMounted, onAppMounted)]);
}
