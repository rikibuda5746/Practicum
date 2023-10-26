

import { PayloadAction, createSelector, createSlice } from "@reduxjs/toolkit";
import { NewJob, Data, Lists, updateJob } from "./interfaces";
import { Item } from "../../interfaces";
import DATA_STATE_KEY from "../../../redux/data/constants";
import { selectors as userSelectors } from "../../../redux/data/user/index";

export const DATA_NEW_JOB_KEY = 'DATA_NEW_JOB';

const initialState={};

const slice = createSlice({
    name: DATA_NEW_JOB_KEY,
    initialState,
    reducers: {

        // GetJobsRequest: (state, action: PayloadAction<{}>) => {
        // },

        // GetJobsRequestSuccess: (state, action) => {
        //     state.lists.jobsRole = action.payload;
        //     console.log("in slice",state.lists.jobsRole);
            
        // },

        onSaveNewJobs: (state, action: PayloadAction<NewJob>) => {
        },
        
        onSaveJobsNewSuccess: (state) => {

        },

        onUpdateJob:(state,action:PayloadAction<updateJob>)=>{

        },

        onUpdateJobSuccess:(state)=>{

        },

    }
});

// const getState = (state: any) => {
//     return state[DATA_STATE_KEY][DATA_NEW_JOB_KEY] || initialState;
// };

// export const selectors = {
//     getJobsRole: createSelector(getState, (state) => state.lists.jobsRole),
// }

export const actions = { ...slice.actions };

export default slice.reducer;







        // GetJobsRequestSuccess(state, action: PayloadAction<{ jobs:string[] }>) {
        //     state.jobRole = action.payload.jobs;
        //     console.log(state.jobRole);
        // }



        // const initialState: Data = {
//     newJob: {
//         institutionName: "",//ניהולית
//         dateBegin: undefined,
//         dateEnd: undefined,
//         jobRoleId: [],
//         ageGroupId: [],
//         hoursOfJobsId: [],
//         areaId: [],
//         cityId: [],
//         experienYears: 0,
//         isMonthlySalary: false,
//         isPublic: false,
//         isOpen: false,
//         typesOfJobsId: [],
//         datePublish: new Date(),
//         jobDescription: "",
//         iMinSalary: undefined,
//         iMaxSalary: undefined,
//         hoursPerWeek: undefined,
//     }
// };