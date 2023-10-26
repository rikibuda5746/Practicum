import { all, call, put, takeEvery } from "redux-saga/effects";
import backendService from "../../../service/backendService";
import { actions, Data } from "./slice";

let CityTemp: string = "";

function* onSetSave(action: ReturnType<typeof actions.onSetSave>): Generator<any, any> {
    try {
        const TempSend: Data = action.payload;
        const status = yield call(backendService.setData, TempSend);
        yield put(actions.onSetSaveSuccess());
    }

    catch (e) {
        console.log(e);
        console.log("the data not save!!!");
    }
}

function* onGetUserById(action: ReturnType<typeof actions.onGetUserById>): Generator<any, any, { PersonalDetailsFormValues: any }> {
    const userId: number = action.payload;
    try {
        const GetUserById = yield call(backendService.getUserById, { userId: userId });
        yield put(actions.onGetUserByIdSuccess({ ...GetUserById }));
    }

    catch (e) {
        console.log(e);
    }
}

export default function* watchInstitutesActions() {
    yield all(
        [
            takeEvery(actions.onSetSave, onSetSave),
            takeEvery(actions.onGetUserById, onGetUserById),
        ]);
}
