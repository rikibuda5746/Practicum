import { createSlice, PayloadAction } from "@reduxjs/toolkit";
export const STATE_KEY = "auth";

interface AuthState {
    isLoading:boolean
}

export const getInitialState = ():AuthState=> ({
   isLoading:false,
});

/* eslint-disable no-param-reassign */
export const slice = createSlice({
    name: STATE_KEY,
    initialState: getInitialState(),
    reducers: {
        onLogin: (state, action:PayloadAction<{username:string,password:string}> ) => {
            state.isLoading=true;
        },
        onLoginSuccess:(state,action)=>{
            state.isLoading=false;
        },
        onLogout: (state) => {
            state = getInitialState();
        },
     
    },
    extraReducers: builder => {
        // builder.addCase();
    },
});
/* eslint-enable no-param-reassign */

// For saga/reducer-less actions

export const actions = { ...slice.actions };

const { reducer } = slice;

export default reducer;
