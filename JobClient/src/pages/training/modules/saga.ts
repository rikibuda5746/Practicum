import { useSelector } from 'react-redux';
import { actions } from './slice'
import backendService from "../../../service/backendService";
import { all, put, call, takeLatest } from "redux-saga/effects";
import { select } from 'redux-saga/effects';
import { ITraining } from './interfaces';
import { selectors } from '../../../redux/data/user/modules/slice';



function* saveTrainings(action: ReturnType<typeof actions.saveTrainings>): Generator<unknown, void, unknown> {
    try {
        const mySlice: any = yield select((state: any) => state);
        const iUserId=mySlice.data.user.id??1;
        const status = yield* mySlice.data.DATA_TRAINING.trainings.map((training: ITraining) => call(backendService.Training, iUserId , training));
    }
    catch (err) {
        console.log(err);
    }
}
function* getTrainingsById(action:ReturnType<typeof actions.getTrainingsById>):Generator<any,any,{data:any}> {
    try {
        const mySlice: any = yield select((state: any) => state);
        const iUserId=mySlice.data.user.id??1;
        const data = yield call(backendService.getTrainingById, iUserId);
        yield put(actions.getTrainingsByIdSuccess(data));
    }
    catch (e) {
        console.log(e);
    }
}

function* deleteTrainings(action:ReturnType<typeof actions.deleteTrainings>):Generator<any,any,{data:any}> {
    try {
        const mySlice: any = yield select((state: any) => state);
        const iUserId=mySlice.data.user.id;
        yield call(backendService.deleteTrainings, iUserId);
    }
    catch (e) {
        console.log(e);
    }
}


export function* watchTraining() {
    yield all([
        takeLatest(actions.saveTrainings, saveTrainings),
        takeLatest(actions.getTrainingsById, getTrainingsById),
        takeLatest(actions.deleteTrainings, deleteTrainings)
    ]);
} 
