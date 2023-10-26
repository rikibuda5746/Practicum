import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CandidateLessDetails,StatusJobsRequestId } from "./candidateDatils";
import DATA_STATE_KEY from "../../../redux/data/constants";

export const CANDIDTES_SLICE='CANDIDTES_SLICE';

interface CandidteStore {
    candidates: CandidateLessDetails[];
}

const getInitialState = (): CandidteStore=>({
 candidates: []
})

const slice=createSlice({
    name:CANDIDTES_SLICE,
    initialState: getInitialState(),
    reducers:{
        onGetCandidatesDetails(state,action:PayloadAction<{idJobstock?: number}>){
        },
        onSuccessGetCandidatesDetails(state,action){
           console.log("in slice",action.payload);
           state.candidates=action.payload;
           state.candidates?.map(c=> {
           c.favorite=c.favorite?(c.favorite.toString()==='0'?false:true):false});
        },
        onFaildGetCandidatesDetails(state,action){
         alert("כשל ברשת!!!!!!!!!!!!!!!!");
        },

        onSuccessChangeFavorite(state,action: PayloadAction<{userId:number,  favoriteChange:boolean ,idJobstock: number}> ){
            const index =state.candidates.length>0?state.candidates.findIndex((candidate)=> candidate.userId === action.payload.userId && candidate.idJobstock === action.payload.idJobstock):undefined;
            if(index !== undefined){
                 state.candidates[index].favorite=action.payload.favoriteChange;
            }            
        },
        onChangeFavoriteToDB(state,action:PayloadAction<{userId:number,  favoriteChange:boolean ,idJobstock: number}>){
       
        },
        onFaildChangeFavorite(state,action){
            alert("כשל ברשת!");
        },
        onSuccessChangeStatusJobRequestId(state,action:PayloadAction<{userId:number, newStatusJobRequestId:StatusJobsRequestId,idJobstock: number,}>){
            const index = state.candidates.findIndex((candidate)=> candidate.userId === action.payload.userId && candidate.idJobstock === action.payload.idJobstock);
            if(index !== undefined){
                 state.candidates[index].iStatusJobRequestId = action.payload.newStatusJobRequestId;
            }
        },
        ChangeStatusJobRequestIdToDB(state,action:PayloadAction<{userId:number, newStatusJobRequestId:StatusJobsRequestId,idJobstock: number,}>){
        
        },
        onFaildChangeStatusJobRequestId(state,action){
            
        },
    }
});

const getState=(state:any)=>{    
return state[DATA_STATE_KEY][CANDIDTES_SLICE] || getInitialState()
}

export const selectors={
    getCandidates:createSelector( getState,(state) => state.candidates)
}

export const actions={...slice.actions};

const { reducer } = slice;

export default reducer;
