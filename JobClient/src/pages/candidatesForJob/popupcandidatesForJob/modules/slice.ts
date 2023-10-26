import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { date, string } from "yup";
import { format } from "path";
import DATA_STATE_KEY from "../../../../redux/data/constants";
import { CandidateDetails } from "../../modules/candidateDatils";
import { stat } from "fs";

export const POPUP_CANDIDTE_SLICE='POPUP_CANDIDTE_SLICE';

interface CandidteStore {
    candidate: CandidateDetails;
}


const getInitialState = (): CandidteStore=>({
 candidate:{ userId: 1,
    firstName:"string",
    lastName:"string",
    phone:1,
    email:"string",
    city:"string",
    datePublish:"string",
    experienceYears:5,
    iStatusJobRequestId:1,
    sector:"string",
    gender:"string",  
    idJobstock:1,  
    favorite:true,
    recommends:"string",
    trainings:"string",
    educations:"string",
    cv:"string",}
})

const slice=createSlice({
    name:POPUP_CANDIDTE_SLICE,
    initialState: getInitialState(),
    reducers:{
        OnGetCandidateFullDetails(state,action:PayloadAction<{jobStockId: number,userId:number}>){
          
        },
       OnSuccessGetCandidateFullDetails(state,action){
       console.log(action.payload);
       state.candidate=action.payload[0]; 
       state.candidate.favorite=state.candidate.favorite?(state.candidate.favorite.toString()==='0'?false:true):false;
        },
        OnFaildGetCandidateFullDetails(state,action){
         console.log("כשל ברשת!");
        },
        OnChengFavoritePopup(state,action: PayloadAction< {favoriteChange:boolean }>){
        state.candidate.favorite=action.payload.favoriteChange;
        console.log(state.candidate.favorite);
        
        },
        OnChengStatos(state,action: PayloadAction< {newStatusJobRequestId:number }>){
        state.candidate.iStatusJobRequestId = action.payload.newStatusJobRequestId; 
        },

    }
});

const getState=(state:any)=>{    
return state[DATA_STATE_KEY][POPUP_CANDIDTE_SLICE] || getInitialState()
}

export const selectors={
    getCandidateDetails:createSelector( getState,(state) => state.candidate)
}

export const actions={...slice.actions};

const { reducer } = slice;

export default reducer;
