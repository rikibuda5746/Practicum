import { PayloadAction, createSelector, createSlice } from "@reduxjs/toolkit";
import { object } from 'yup';
import { JobsStock } from "../../../components/ShowJob/ShowJob";


export const JOB_STATE_KEY = 'JOBS'

export type JobsSlice = {
    jobs: JobsStock[];
    error: string;
    request: object;
    favorite: object;
    removeC: object;
}

export const INITIAL_STATE: JobsSlice = { jobs: [], error: '', request: object, favorite: object, removeC: object }

export const slice = createSlice({
    name: JOB_STATE_KEY,
    initialState: INITIAL_STATE,
    reducers: {
        onGetJobRequest:(state, action:PayloadAction<{userId?:number,cities?:string,areas?:string,jobs?:string,institutions?:string,ageGroups?:string}>) =>{

        },
        onGetJobSuccess: (state, action) => {
            state.jobs = action.payload;

        },
        onGetJobsFailure: (state, action) => {
            state.error = action.payload.massage;
        },
        onInsertRequest: (state, action: PayloadAction<{ iJobsStockId: number, iUserId: number }>) => {
        },
        onInsertRequestSuccess: (state, action) => {
            state.request = { ...action.payload }
            const index = state.jobs.length > 0 ? state.jobs.findIndex((job) => job.iJobsStockId === action.payload.iJobsStockId) : undefined;
            if (index !== undefined) {
                state.jobs[index].dtDateJobRequest = new Date();
            }
        },
        onInsertRequestFailure: (state, action) => {
            state.error = action.payload.massage;
        },
        onFavoriteRequest: (state, action: PayloadAction<{ iJobsStockId: number, iUserId: number, isFavorite: number }>) => {
        },
        onFavoriteRequestSuccess: (state, action) => {
            state.favorite = { ...action.payload }
            const index = state.jobs.length > 0 ? state.jobs.findIndex((job) => job.iJobsStockId === action.payload.iJobsStockId) : undefined;
            if (index !== undefined) {
                state.jobs[index].favorite == 0 ? state.jobs[index].favorite = 1 : state.jobs[index].favorite = 0;
            }
        },
        onFavoriteRequestFailure: (state, action) => {
            state.error = action.payload.massage;
        },
        onRemoveCandidacy: (state, action: PayloadAction<{ iJobsStockId: number, iUserId: number }>) => {

        },
        onRemoveCandidacySuccess: (state, action) => {
            state.removeC = { ...action.payload }
            const d: string = '1900-01-01 00:00:00.000'
            const index = state.jobs.length > 0 ? state.jobs.findIndex((job) => job.iJobsStockId === action.payload.iJobsStockId && job.iJobsStockId === action.payload.iJobsStockId) : undefined;
            if (index !== undefined) {
                state.jobs[index].dtDateJobRequest = new Date(d);
            }
        },
        onRemoveCandidacyFailure: (state, action) => {
            state.error = action.payload.massage;
        },
        onGetAplyfor(state,action: PayloadAction<{ userId: number }>){
      
        }
    }
}
)

const getState = (state: any) => {
    return state[JOB_STATE_KEY] || INITIAL_STATE;
};

export const selectors = {
    selectJobs: createSelector(getState, (state) => state.jobs)
};

export const actions = { ...slice.actions };

const { reducer } = slice;

export default reducer;