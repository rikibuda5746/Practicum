import { PayloadAction, createSelector, createSlice } from "@reduxjs/toolkit";
import DATA_STATE_KEY from "../../../redux/data/constants";
import { Data } from "./interfaces";

export const DATA_EXPERIENCE_KEY = "EXPERIENCES";

 const initialState: Data = {experiences: [{ placeExperience: "", fromYear: 0,job: "",toYear: 0,description: "" } ],IsFillExperience: false,isLoading:false,isNextExperience:false};

export const slice = createSlice({
    name: DATA_EXPERIENCE_KEY,
    initialState,
    reducers: 
    {

        addExperience(state) {
         state.experiences.push({ placeExperience: "", fromYear: 0, job: "", toYear: 0, description: "" })
        },

        removeExperience(state, action: PayloadAction<{ index: number }>) {
            if (state.experiences.length == 1) {
                state.experiences = [{ placeExperience: "", fromYear: 0, job: "", toYear: 0, description: "" }];

            }
            else if (state.experiences.length > 1) {
                state.experiences.splice(action.payload.index, 1)
            }
        },

        isFillData(state) {
            state.experiences.length==1?state.IsFillExperience = true:
            state.experiences.map(index => (index.placeExperience === '' || index.toYear === 0 || index.fromYear === 0 || index.job === '') ?
                state.IsFillExperience = false :
                state.IsFillExperience = true);
        },

        saveDetailsNumber(state, action: PayloadAction<{ index: number, filedName: "fromYear" | "toYear", value: number }>) {
            action.payload.filedName == 'fromYear' ? state.experiences[action.payload.index].fromYear = action.payload.value :
                state.experiences[action.payload.index].toYear = action.payload.value
        },

        saveDetailsString(state, action: PayloadAction<{ index: number, filedName: "placeExperience" | "job" | "description", value: string }>) {
            action.payload.filedName == 'placeExperience' ? state.experiences[action.payload.index].placeExperience = action.payload.value :
                action.payload.filedName == "job" ? state.experiences[action.payload.index].job = action.payload.value :
                    state.experiences[action.payload.index].description = action.payload.value;
        },

        getExperiencesById(state){
            state.isLoading=true;
        },

        getExperiencesByIdSuccess(state, action){
            state.isLoading=false;
            state.experiences = action.payload.data
            if(action.payload.data.length!=0){ 
              state.experiences = action.payload.data;
            }
            else{
                state.experiences=[{ placeExperience: "", fromYear: 0,job: "",toYear: 0,description: "" } ]
            }
        },

        deleteExperiences(state){},

        saveExperiences(state) { },

        next(state){
            state.isNextExperience=true;            
        }
    }
});

const getState = (state:any) => {
    return state[DATA_STATE_KEY][DATA_EXPERIENCE_KEY] || initialState;
};

export const selectors = {
    getIsLoading:createSelector(getState, (state)=>state.isLoading),
    getExperience: createSelector(getState, (state) => state.IsFillExperience),
    getExperiencesById: createSelector(getState, (state) => state.experiences),
    getIsNextExperience:createSelector(getState, (state) => state.isNextExperience),
};

export const actions = { ...slice.actions };

export default slice.reducer;
