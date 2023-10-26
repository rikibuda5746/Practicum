import { PayloadAction, createSelector, createSlice } from "@reduxjs/toolkit";
import { Job ,Data} from "../../../components/ManagerJob/modules/interfaces";
import DATA_STATE_KEY from "../../../redux/data/constants";


export const MANAGER_JOBS_STATE_KEY = 'managerJobs';

export const getInitialState = ():Data =>({jobs:[]});

const slice = createSlice({
    name:MANAGER_JOBS_STATE_KEY,
    initialState:getInitialState(),
    reducers:
    {

        onGetJobsRequest(state,action:PayloadAction<{}>){
            console.log("in slice req");
            console.log("i am hereeeeeee");
            
        },
        onGetJobsSuccess(state,action){
           
            console.log(action.payload);
            state.jobs = action.payload.data;
            console.log(" paylod:   "+action.payload);

        },
        onGetJobsFailed(state,action:PayloadAction<{}>){
            console.log("failed!!:(");
            
        }
    }
})

const getState = (state: any) => {
    console.log('state [DATA_STATE_KEY][MANAGER_JOBS_STATE_KEY]',state [DATA_STATE_KEY]);
    
     return state [DATA_STATE_KEY][MANAGER_JOBS_STATE_KEY] || getInitialState();
};

export const selectors = {
    getState: createSelector(getState, (state) => state),
    getJobs: createSelector(getState, (state) => state.jobs),
};


const {reducer} = slice;

export default reducer;

export const actions = {...slice.actions};