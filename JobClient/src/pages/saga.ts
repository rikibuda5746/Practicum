import { all, call, put, takeEvery } from "redux-saga/effects";
import backendService from "../service/backendService";
import { actions} from "./slice";


let CityTemp:string="";

function* onGetCitiesRequested(): Generator<any, any, { cities: any }> {
    try {
        console.log("onGetCitiesRequested");
        
        const cities = yield call(backendService.getData, { path:`https://data.gov.il/api/3/action/datastore_search?resource_id=d4901968-dad3-4845-a9b0-a57d027f11ab&limit=1500&q=` 
     });
        yield put(actions.onGetCitiesSuccess({ ...cities }));
    }

    catch (e) {
        console.log(e);
    }
}


function* onGetStreetsRequested(): Generator<any, any, { streets: any }> {
    try {
        const streets = yield call(backendService.getData, { path:`https://data.gov.il/api/3/action/datastore_search?resource_id=9ad3862c-8391-4b2f-84a4-2d4c68625f4b&limit=7000&q=${CityTemp}` 
     });
        yield put(actions.onGetStreetsSuccess({ ...streets }));
    }

    catch (e) {
        console.log(e);
    }
}


function* onKeyPressCity(action:ReturnType<typeof actions.onKeyPressCity>):Generator<any, any>{
    try {
        CityTemp=action.payload.trim();
    }

    catch (e) {

        console.log(e);
        console.log("the data not suucses!!!");

    }
}

export default function* watchInstitutesActions() {
    yield all(
        [
            takeEvery(actions.onGetCitiesRequested, onGetCitiesRequested),
            takeEvery(actions.onGetStreetsRequested, onGetStreetsRequested),
            takeEvery(actions.onKeyPressCity,onKeyPressCity)
        ]);
}