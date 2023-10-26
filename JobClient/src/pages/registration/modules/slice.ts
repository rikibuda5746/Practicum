import { createSlice, createSelector, PayloadAction } from "@reduxjs/toolkit";
import DATA_STATE_KEY from "../../../redux/data/constants";


export const STATE_KEY_REGISTERATION = "registerationDetails";

interface RegisterationState {
    username:string,
    email: string,
    firstName: string,
    lastName: string,
    password:string,

}

export const getInitialState = (): RegisterationState => ({
    username:"",
    email: '',
    firstName: '',
    lastName: '',
    password:"",
});

export const slice = createSlice({
    name: STATE_KEY_REGISTERATION,
    initialState: getInitialState(),
    reducers: {     
        onRegisteration: (state, action: PayloadAction<{ username: string, email: string, firstname: string, lastname: string,password:string }>) => {
            state.username=action.payload.username;
            state.email=action.payload.email;
            state.firstName=action.payload.firstname;
            state.lastName=action.payload.lastname;
            state.password=action.payload.password;
        },
    },
       
});
const getState = (state: any) => {
    return state[DATA_STATE_KEY][STATE_KEY_REGISTERATION] || getInitialState();
};

export const selectors = {
    getUsernameRgisteration: createSelector(getState, (state) => state.username),
    getEmailRgisteration: createSelector(getState, (state) => state.email),
    getFirstnameRgisteration: createSelector(getState, (state) => state.firstName),
    getLastnameRgisteration: createSelector(getState, (state) => state.lastName),
    getPasswordRgisteration: createSelector(getState, (state) => state.password),
};
export const actions = { ...slice.actions };

const { reducer } = slice;

export default reducer;
