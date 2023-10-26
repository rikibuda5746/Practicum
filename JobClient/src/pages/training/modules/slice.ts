import { createSlice, PayloadAction, createSelector } from "@reduxjs/toolkit";
import { Data } from "./interfaces";
import DATA_STATE_KEY from "../../../redux/data/constants";
import { initializeConnect } from "react-redux/es/components/connect";


export const DATA_TRAINING_KEY = 'DATA_TRAINING';

const initialState: Data = ({ trainings: [{ placeTraining: '', fromYear: 0, toYear: 0, typeOfTraining: '', note: '' }], isFillTraining: false, isLoading: false,isNextTraining:false });

const slice = createSlice
    ({
        name: DATA_TRAINING_KEY,
        initialState,
        reducers:
        {
            addTraining(state) {
                state.trainings.push({ placeTraining: '', fromYear: 0, toYear: 0, typeOfTraining: '', note: '' })
            },

            removeObject(state, action: PayloadAction<{ index: number }>) {
                if (state.trainings.length > 1) {
                    return {
                        ...state,
                        trainings: state.trainings.filter((item, index) => index !== action.payload.index)
                    };
                }

                else {
                    return {
                        ...state,
                        trainings: [{ placeTraining: '', fromYear: 0, toYear: 0, typeOfTraining: '', note: '' }]
                    };
                };

            },

            isFillData(state) {
                state.trainings.length==1? state.isFillTraining = true:
                state.trainings.map(index => (index.placeTraining === '' || index.toYear === 0 || index.fromYear === 0 || index.typeOfTraining === '') ?
                    state.isFillTraining = false :
                    state.isFillTraining = true);
            },

            saveDetailsNumber(state, action: PayloadAction<{ index: number, filedName: "fromYear" | "toYear", value: number }>) {
                action.payload.filedName == 'fromYear' ? state.trainings[action.payload.index].fromYear = action.payload.value :
                    state.trainings[action.payload.index].toYear = action.payload.value

            },

            saveDetailsString(state, action: PayloadAction<{ index: number, filedName: "placeTraining" | "typeOfTraining" | "note", value: string }>) {
                console.log("action.payload.value:" + action.payload.value)
                action.payload.filedName == 'placeTraining' ? state.trainings[action.payload.index].placeTraining = action.payload.value :
                    action.payload.filedName == "typeOfTraining" ?
                        state.trainings[action.payload.index].typeOfTraining = action.payload.value :
                        state.trainings[action.payload.index].note = action.payload.value
            },

            getTrainingsById(state) {
                state.isLoading = true;
            },

            getTrainingsByIdSuccess(state, action) {
                state.isLoading=false;
                if (action.payload.data.length != 0) {
                    state.trainings = action.payload.data;
                } else {
                    state.trainings = [{ placeTraining: '', fromYear: 0, toYear: 0, typeOfTraining: '', note: '' }]
                }
            },

            deleteTrainings(state) { },

            saveTrainings(state) { },

            next(state){
                state.isNextTraining=true;
            }
        }
    });

const getState = (state: any) => {
    return state[DATA_STATE_KEY][DATA_TRAINING_KEY] || initialState;
};

export const selectors = {
    getIsLoading: createSelector(getState, (state) => state.isLoading),
    getTraining: createSelector(getState, (state) => state.isFillTraining),
    getTrainingsById: createSelector(getState, (state) => state.trainings),
    getIsNextTraining:createSelector(getState, (state) => state.isNextTraining)
};

export const actions = { ...slice.actions };

export default slice.reducer;

