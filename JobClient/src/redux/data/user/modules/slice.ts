import { createSlice, createSelector, createAction, PayloadAction } from "@reduxjs/toolkit";
import DATA_STATE_KEY from "../../constants";
import { actions as loginActions } from '../../../../pages/auth/modules/slice';
import { Role } from "../../../../routes/modules/constants";

export const STATE_KEY = "user";

interface UserState {
    id: number,
    firstName: string,
    lastName: string,
    lastLogin: Date,
    email: string,
    role: string,
    successLogin: undefined|boolean,
    successRegisteration: boolean
}

export const getInitialState = (): UserState => ({
    id: 0,
    firstName: '',
    lastName: '',
    lastLogin: new Date("0000-00-00 00:00:00"),
    email: '',
    role: '',
    successLogin: undefined,
    successRegisteration: false
});
const changeCurrentuserInLocalStorage = (value: UserState) => {
    window.localStorage.setItem('currentuser', JSON.stringify(value));
}

const removeCurrentuserFromLocalStorage = () => {

    window.localStorage.removeItem('currentuser');
}
export const slice = createSlice({
    name: STATE_KEY,
    initialState: JSON.parse(window.localStorage.getItem("currentuser") || "{}"),
    // initialState: getInitialState(),
    reducers: {
        onLogin: (state, action: PayloadAction<{ username: string, password: string }>) => {
        },
        onLoginToDB: (state, action: PayloadAction<{ username: string, password: string }>) => {
        },
        onLoginFaild: (state, action) => {
            alert("סיסמא לא תקינה")
            state.id=0
            state.firstName=''
            state.lastName=''
            state.lastLogin=new Date("0000-00-00 00:00:00")
            state.email=''
            state.role=''
            state.successLogin =false
            console.log("onLoginFaild"+state.successLogin)
        },
        onLoginSuccess: (state) => {
            console.log("onLoginSuccess")
            state.successLogin = true;
            console.log("onLoginSuccess"+state)
        },
        onLoginSuccessFromDB: (state, action) => {
            state = action.payload;
            changeCurrentuserInLocalStorage(state)
            console.log("sssssssssssss")
        },
        onRegisteration: (state, action: PayloadAction<{ username: string, email: string, firstname: string, lastname: string }>) => {

        },
        onRegisterationSuccess: (state) => {
            console.log("onRegisterationSuccess")
            state.successRegisteration = true;
        },
        registerationExist: (state) => {
           alert("משתמש קיים")
           state.successRegisteration = false;
        },
        onLogout: (state) => {
            state.id=0
            state.firstName=''
            state.lastName=''
            state.lastLogin=new Date("0000-00-00 00:00:00")
            state.email=''
            state.role=''
            state.successLogin = false
            state.successRegisteration=false
            removeCurrentuserFromLocalStorage();
        },

        onUploudSite: (state) => {

        },
        onUploudSiteAftersaga: (state) => {
            console.log("onUploudSiteAftersaga")
           state = JSON.parse(window.localStorage.getItem("currentuser") || "{}");
            console.log(state)
        },
    },
    extraReducers: builder => {
        builder.addCase(loginActions.onLoginSuccess, (state, action) => {
            return state = action.payload;
        });
        builder.addCase(loginActions.onLogout, (state) => {
            return getInitialState();
        });
    },
});
const getState = (state: any) => {
    // console.log('state, ', state[DATA_STATE_KEY][STATE_KEY]);
    
    return state[DATA_STATE_KEY][STATE_KEY] || getInitialState();
};

export const selectors = {
    getUserDetails: createSelector(getState, (state) => state),
    getUserId: createSelector(getState, (state) => state.id),
    getUserRole: createSelector(getState, (state) => state.role),
    getSuccessLogin: createSelector(getState, (state) => state.successLogin),
    getSuccessRegisteration: createSelector(getState, (state) => state.successRegisteration)
};
export const actions = { ...slice.actions };

const { reducer } = slice;

export default reducer;
