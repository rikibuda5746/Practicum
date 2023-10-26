import { createSlice, createSelector, createAction } from "@reduxjs/toolkit";
import DATA_STATE_KEY from "../../constants";
export const STATE_KEY = "app";

export const INITIAL_STATE = {
    currentYear: null,
    isAppLoading: true,
};

/* eslint-disable no-param-reassign */
export const slice = createSlice({
    name: STATE_KEY,
    initialState: INITIAL_STATE,
    reducers: {
        onAppMountedSuccess: (state, action) => {
            state.currentYear = action.payload;
        },
        onAppLayoutMounted: (state, action) => {
            state.isAppLoading = false; 
        }
    },

});
/* eslint-enable no-param-reassign */

// For saga/reducer-less actions
const extraActions = {
    onAppMounted: createAction(`${STATE_KEY}/onAppMounted`)
};

const getState = (state:any) => {
    return state[DATA_STATE_KEY][STATE_KEY] || INITIAL_STATE;
};

export const selectors = {
    selectIsAppLoading: createSelector(getState, (state) => state.isAppLoading),
    selectCurrentYear: createSelector(getState, (state) => state.currentYear),
};

export const actions = { ...slice.actions, ...extraActions };

const { reducer } = slice;

export default reducer;
