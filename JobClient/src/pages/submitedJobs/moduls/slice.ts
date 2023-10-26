import { PayloadAction, createSelector, createSlice } from "@reduxjs/toolkit";
import {JobsStock , Data} from '../../../components/ShowJob/ShowJob'
import DATA_STATE_KEY from "../../../redux/data/constants";
export const SUBMITTED_JOBS_STATE_NAME = 'submittedJobs'

export const getInitialState = ():Data =>({jobs:[]});

const slice = createSlice({
    name: SUBMITTED_JOBS_STATE_NAME,
    initialState:getInitialState(),
    reducers:
    {
        onGetJobsRequest(state,action:PayloadAction<{}>){
            console.log("in slice req");
        },
        onGetJobsSuccess(state,action){
            state.jobs = Object.values(action.payload.data);
            console.log(" paylod:   "+action.payload);
            console.log(" submitted job success is work!!");
            // debugger
        },
        onGetJobsFailed(state,action:PayloadAction<{}>){
            console.log("failed!!:(");
        }
    }

})

const getState = (state: any) => {
    return state [DATA_STATE_KEY][SUBMITTED_JOBS_STATE_NAME] || getInitialState();
};

export const selectors = {
   getState: createSelector(getState, (state) => state),
   getJobs: createSelector(getState, (state) => state.jobs),
};

const {reducer} = slice;

export default reducer;

export const actions = {...slice.actions};