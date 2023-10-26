import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";

export const STATE_KEY = "CitiesAndStreets";

export interface CitiesI {
    לשכה: ""
    סמל_ישוב: "0"
    סמל_לשכת_מנא: "0 "
    סמל_מועצה_איזורית: "0 "
    סמל_נפה: "0 "
    שם_ישוב: "לא רשום "
    שם_ישוב_לועזי: " "
    שם_מועצה: null
    שם_נפה: "לא ידוע "
    _id: 1,
   
}

export interface StreetsI{
    rank:0
    סמל_ישוב:""
    סמל_רחוב:""
    שם_ישוב:""
    שם_רחוב:""
    _id:1
}

interface StateType {
    cities: CitiesI[],
    streets:StreetsI[],
}

export const getInitialState = (): StateType => ({cities: [] ,streets:[]});

const slice = createSlice({
    name: STATE_KEY,
    initialState: getInitialState(),
    reducers: {
        onGetCitiesRequested: (state, action: PayloadAction<{}>) => {
            console.log("onGetCitiesRequested",state);         
        },

        onGetCitiesSuccess: (state, action) => {
            state.cities = action.payload.data;
            console.log("dddd",state.cities);
            
        },

        onGetStreetsRequested: (state, action: PayloadAction<{}>) => {
        },

        onGetStreetsSuccess: (state, action) => {
            state.streets = action.payload.data;
        },

        onKeyPressCity: (state, action: PayloadAction<string>) => {

        },

        onKeyPressCitySuccses: () => {
            console.log("the date successfully!!!!");
        }
    },
    extraReducers: builder => {
        // builder.addCase();
    },
});


const getState = (state: any) => {
    return state[STATE_KEY] || getInitialState();
};

export const selectors = {
    getCities: createSelector(getState, (state) => state.cities),
    getStreets: createSelector(getState, (state) => state.streets),
};

export const actions = { ...slice.actions };

const { reducer } = slice;

export default reducer;
