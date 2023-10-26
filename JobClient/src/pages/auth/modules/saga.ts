
import { all, takeLatest } from "redux-saga/effects";
import { actions } from "./slice";

function* onLogin(action:ReturnType<typeof actions.onLogin>):Generator<any,any,{data:any}> {
    try {
        const { username,password }=action.payload;
    }
    catch (e) {
        console.log(e);
    }
}

export default function* watchInstitutesActions() {
    yield all([
        takeLatest(actions.onLogin, onLogin),
    ]);
}

