import { all, call, put, takeEvery } from "redux-saga/effects";
// import backendService from "../../../service/backendService";
import backendService from "../../../service/backendService";
import { SendData, actions } from "./slice";


function* onSetSave(action: ReturnType<typeof actions.onSetSave>): Generator<any, any> {
    try {
        console.log("on save what apend");
        const TempSend: SendData = action.payload;
        const status = yield call(backendService.setSaveUploudFile, TempSend);
        yield put(actions.onSetSaveSuccess(action.payload));
    }

    catch (e) {
        console.log(e);
        console.log("the data not save!!!");
    }
}

function* ongetFails(action:ReturnType<typeof actions.getFiles>){
try
{
  const {data}=yield backendService.getFiles(action.payload.userId);
  console.log(data);
  yield put(actions.onSuccessGetFiles(data));
} catch (error)
 {
    console.log(error);
}
}


export default function* watchUploadFiles() {
    yield all(
        [
            takeEvery(actions.onSetSave, onSetSave),
            takeEvery(actions.getFiles,ongetFails),
        ]);
}
