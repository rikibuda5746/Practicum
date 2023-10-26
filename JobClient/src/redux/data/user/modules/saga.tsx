import { all, put, call, takeLatest } from "redux-saga/effects";
import backendService from "../../../../service/backendService";
import { actions } from "./slice";
import { log } from "console";

function* onLogin(action: ReturnType<typeof actions.onLogin>): Generator<any, any, { data: any }> {
    try {
        const { username, password } = action.payload;
        const { data } = yield call(backendService.login, { username, password });
        if (data=="NotAuthorizedException")
            yield put(actions.onLoginFaild(null));
        else
            yield put(actions.onLoginSuccess());
    }
    catch (e) {
        console.log(e);
    }
}

function* onLoginToDB(action: ReturnType<typeof actions.onLoginToDB>): Generator<any, any, { data: any }> {
    try {
        const { username, password } = action.payload;
        const { data } = yield call(backendService.loginDB, { username, password });
        yield put(actions.onLoginSuccessFromDB({ ...data, role: 'user' }))
    }
    catch (e) {
        console.log(e);
    }
}


function* onRegisteration(action: ReturnType<typeof actions.onRegisteration>): Generator<any, any, { data: any }> {
    try {
        const { username, email, firstname, lastname } = action.payload;
        const{ data }=yield call(backendService.registeration, { username, email, firstname, lastname });
        if(data=="User successfully created!"){
            console.log("User successfully created!")
            yield put(actions.onRegisterationSuccess());
        }
        if(data=="UsernameExistsException"){
            yield put(actions.registerationExist())
        }
    }
    catch (e) {
        console.log(e);
    }
}

function* onUploudSite(action: ReturnType<typeof actions.onUploudSite>): Generator<any, any, { data: any }> {
    try {
        yield put(actions.onUploudSiteAftersaga())
    }
    catch (e) {
        console.log(e);
    }
}

export default function* LoginSaga() {
    yield all([
        takeLatest(actions.onLogin, onLogin), takeLatest(actions.onRegisteration, onRegisteration), takeLatest(actions.onLoginToDB, onLoginToDB),
        takeLatest(actions.onUploudSite,onUploudSite)
    ]);
}
