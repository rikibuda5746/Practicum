 import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PersonalDetailsFormValues } from "./interfaces";

export const STATE_KEY = "personalDitails";

  
export interface Data {
    form: PersonalDetailsFormValues,
    userNameProps: string,
    passwordProps: string,
    IdUser:number|null,
}
export interface Item {
    id: number,
    name: string,
}


interface StateType {
    IsFillPersonalDetails:boolean,
    GetUserById:PersonalDetailsFormValues,
    isNextDetails:boolean
}

export const getInitialState = (): StateType => ({IsFillPersonalDetails:false,
    GetUserById:{FirstName: "",
                LastName: "",
                Id: "",
                Email: "",
                Pelephone: "",
                StreetId: "",
                StreetName:"",
                BornDate: undefined,
                Sector: "",
                CountrySource: "",
                MaritalStatus: "",
                Gender: "",
                IsPublic: true,
                CityId: "",
                CityName:""},isNextDetails:false});

const slice = createSlice({
    name: STATE_KEY,
    initialState: getInitialState(),
    reducers: {

        onSetSave: (state, action: PayloadAction<Data>) => {

        },

        onSetSaveSuccess: () => {
            console.log("the date save successfully!!!!");
        },

        getPersonalDetails: (state, action: PayloadAction<PersonalDetailsFormValues>) => {
            console.log('get jkjljkl');
            action.payload.BornDate==undefined || action.payload.CityId==""||action.payload.CityName==""||action.payload.CountrySource==""||action.payload.Email==""||action.payload.FirstName==""||
            action.payload.Gender==""||!action.payload.Id||action.payload.Id==""||action.payload.LastName==""||action.payload.MaritalStatus==""||action.payload.Pelephone==""?
            state.IsFillPersonalDetails=false :
            state.IsFillPersonalDetails=true;
           
            
        },

        onGetUserById: (state, action: PayloadAction<number>) => {
        },

        onGetUserByIdSuccess: (state, action) => {
            state.GetUserById = action.payload.data;
        },
        next(state){
            console.log("next");
            state.isNextDetails=true;            
            console.log("isNextDetails",state.isNextDetails);

        },
    },
    extraReducers: builder => {
        // builder.addCase();
    },
});


const getState = (state: any) => {
    return state[STATE_KEY] || getInitialState();
};

export const selectors = {
    getState: createSelector(getState, (state) => state),
    getPersonalDetails: createSelector(getState,(state)=>state.IsFillPersonalDetails),
    getUserById: createSelector(getState,(state)=>state.GetUserById),
    getIsNextDetails:createSelector(getState,(state)=>state.isNextDetails)
};

export const actions = { ...slice.actions };

const { reducer } = slice;

export default reducer;
