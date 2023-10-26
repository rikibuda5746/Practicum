import { actions } from './slice'
import backendService  from "../../../service/backendService";
import { all, call,put,takeLatest } from "redux-saga/effects";
import { select } from 'redux-saga/effects';
import { IExperience } from './interfaces';
import { useSelector } from 'react-redux';
import { selectors } from '../../../redux/data/user/modules/slice';

function* saveExperiences(action: ReturnType<typeof actions.saveExperiences>): Generator<unknown, void, unknown> {
    try {
        const mySlice:any = yield select((state:any) => state);
        const userId:string=mySlice.data.user.id;
        const status =yield* mySlice.data.EXPERIENCES.experiences.map((experience: IExperience) => call(backendService.Experience,userId, experience))
    }
     catch (err) {
         console.log(err);
    }
}

function* getExperiencesById(action:ReturnType<typeof actions.getExperiencesById>):Generator<any,any,{data:any}> {
    try {
        const mySlice:any = yield select((state:any) => state);
        const iUserId=mySlice.data.user.id??1;
        const data = yield call(backendService.getExperiencesById, iUserId);
        yield put(actions.getExperiencesByIdSuccess(data));
    }
    catch (e) {
        console.log(e);
    }
}

function* deleteExperiences(action:ReturnType<typeof actions.deleteExperiences>):Generator<any,any,{data:any}> {    
    try {
        const mySlice:any = yield select((state:any) => state);
        const iUserId=mySlice.data.user.id??1;
        yield call(backendService.deleteExperiences, iUserId);
    }
    catch (e) {
        console.log(e);
    }
}


export function* watchExperience() {
    yield all([
        takeLatest(actions.saveExperiences, saveExperiences),
        takeLatest(actions.getExperiencesById, getExperiencesById),
        takeLatest(actions.deleteExperiences, deleteExperiences)
    ]);
} 
