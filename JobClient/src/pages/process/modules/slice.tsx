import { createSlice } from "@reduxjs/toolkit";
import DATA_STATE_KEY from "../../../redux/data/constants";
export const STATE_KEY = "details";

interface FillDetailsState {
    isFill: boolean
}

export const getInitialState = (): FillDetailsState => ({
    isFill: false,
});

/* eslint-disable no-param-reassign */
export const slice = createSlice({
    name: STATE_KEY,
    initialState: getInitialState(),
    reducers: {
        onFillDetails: (state, action) => {
        },
        onFillDetailsSuccess: (state, action) => {
            state.isFill = true;
        },
        onFillDetailsFailed: (state) => {
            state = getInitialState();
        },

    },
    extraReducers: builder => {
    },
});


export const actions = { ...slice.actions };

const getState = (state: any) => {
    return state[DATA_STATE_KEY][STATE_KEY] || getInitialState();
}

export const selectors = {

    //example to Details

    // getDetails:createSelector( getState,(state) => state.isFill) 
}

const { reducer } = slice;

export default reducer;