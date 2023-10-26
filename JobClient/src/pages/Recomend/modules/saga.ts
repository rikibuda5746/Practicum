import { put, takeLatest, all, call, select } from "redux-saga/effects"
import { actions, selectors } from "./slice"
import backendService from "../../../service/backendService";
import { TypeOf, string } from "yup";
import { error, log } from "console";
// import { RecommendDetails } from "./interface";
import { RecommendAllDetails } from "./interface";
import { useSelector } from "react-redux";




function* onInsertRecomend(action: ReturnType<typeof actions.onInsertRecomend>):Generator {
    try {
        const recomendSlice:any = yield select((state:any) => state);
        const statusInsert =yield* recomendSlice.data.RECOMEND.recomends.map((rec: RecommendAllDetails) =>call(backendService.UserRecommends_INS,rec));
        }
    catch (err) {
        console.log("onInsertRecomend_catchInSaga")
    }
}

function* OnDeleteRecomend(action:ReturnType<typeof actions.OnDeleteRecomend>):Generator{      
    console.log("in OnDeleteRecomend")
    try{ 
        const recomendSlice:any = yield select((state:any) => state);
        const statusDelete =yield* recomendSlice.data.RECOMEND.deletedRecomends.map((rec: RecommendAllDetails) =>call(backendService.deleteRecomend,rec.iRecommenId));
    }
    catch(e){
        console.log(e);
    }
}

function* getRecomendById(action:ReturnType<typeof actions.getRecomendById>):Generator<any,any,{data:any}>{
     try{ 
        const recomendSlice:any = yield select((state:any) => state);
        const iUserId:string=recomendSlice.data.user.id??1;
        const data =yield call(backendService.getRecomendById,iUserId);
        yield put(actions.getRecomendByIdSuccess(data));
    }
    catch(e){
        console.log(e)
    }
}

export function* watchRecomend() { 
    yield all([
        takeLatest(actions.onInsertRecomend,onInsertRecomend),
        takeLatest(actions.OnDeleteRecomend,OnDeleteRecomend),
        takeLatest(actions.getRecomendById,getRecomendById)
    ]);
}
