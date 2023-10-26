import { call, put, takeEvery, all } from "redux-saga/effects";
import backendService from "../../../service/backendService";
import { actions } from './slice';
import { PayloadAction } from "@reduxjs/toolkit";
import { tableParams } from "../../interfaces";

export let table:tableParams;

function* onTableDataRequest(action: PayloadAction<tableParams>): Generator<any, any, { data: tableParams }> {
    try {
        // yield put(actions.onTableDataRequest(action));
        const res = yield call(backendService.getSelect, action.payload);
        table = res.data;
        // const res = yield call(backendService.getSelect, action.payload.tableName, action.payload.idColumnName, action.payload.valueColumnName)
        console.log("res in saga", res);
        var db = JSON.stringify(res.data);
        console.log("db in saga", db);
        var response = JSON.parse(db);
        yield put(actions.onDataSuccess(response));
        console.log("response in saga", response);
    } catch (e) {
        console.log(e);
    }
}
export default function* watchonTableData() {
    yield all([
        takeEvery(actions.onTableDataRequest.type, onTableDataRequest),
    ]);
}

