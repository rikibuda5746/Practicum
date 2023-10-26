import { Action, PayloadAction, createSelector, createSlice } from "@reduxjs/toolkit";

export const MANAGER_JOB_STATE_KEY = 'manager_job';

export const getInitialState = ():any =>({});

const slice = createSlice({
    name:MANAGER_JOB_STATE_KEY,
    initialState:getInitialState(),
    reducers:
    {
        onCloseOrOpenJobRequest(state,action:PayloadAction<{jobID:number}>){
            console.log("in req");
        },

        onCloseOrOpenJobResponse(state,action){
            console.log(action.payload);
        },
        
        onCloseOrOpenJobFailed(state){
            console.log("failed...");
        },

    }

});

const getState = (state: any) => {
    return state [MANAGER_JOB_STATE_KEY] || getInitialState();
};

export const actions = {...slice.actions};

const { reducer } = slice;

export default reducer;