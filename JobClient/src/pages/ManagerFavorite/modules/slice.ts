import { PayloadAction, createSelector, createSlice } from "@reduxjs/toolkit";
import { CandidateDetails, StatusJobsRequestId } from "../../candidatesForJob/modules/candidateDatils";
import DATA_STATE_KEY from "../../../redux/data/constants";
import { log } from "console";

export const FAVORIT_MANAGER='FAVORIT_MANAGER';





interface CandidteStore {
    favoriteCandidate: CandidateDetails[];
}   


const getInitialState=():CandidteStore=>({
favoriteCandidate:[]
})
const slice=createSlice({
name:FAVORIT_MANAGER,
initialState:getInitialState(),
reducers:{

GetfavoriteCandidate(state,action:PayloadAction<{institution: number}>){
console.log("in slic befor saga");
},

successGetfavoriteCandidate(state,action){
console.log("after saga");
console.log(action.payload);

console.log("action paylod",action.payload);
state.favoriteCandidate=action.payload;
},

failedGetfavoriteCandidate(state,action){
console.log("error");
},

ChengFavorite(state,action:PayloadAction<{userId:number,  favoriteChange:boolean ,idJobstock: number}>){

},

successChengFavorite(state,action: PayloadAction<{userId:number,  favoriteChange:boolean ,idJobstock: number}>){
    const index =state.favoriteCandidate.length>0?state.favoriteCandidate.findIndex((candidate)=> candidate.userId === action.payload.userId && candidate.idJobstock === action.payload.idJobstock):undefined;
    if(index !== undefined){
         state.favoriteCandidate.splice(index,1)
    }   
},
failedChengFavorite(){

},
onSuccessChangeStatusJobRequestId(state,action:PayloadAction<{userId:number, newStatusJobRequestId:StatusJobsRequestId,idJobstock: number,}>){
    const index = state.favoriteCandidate.findIndex((candidate)=> candidate.userId === action.payload.userId && candidate.idJobstock === action.payload.idJobstock);
    if(index !== undefined){
         state.favoriteCandidate[index].iStatusJobRequestId = action.payload.newStatusJobRequestId;
    }
},
ChangeStatusJobRequestIdToDB(state,action:PayloadAction<{userId:number, newStatusJobRequestId:StatusJobsRequestId,idJobstock: number,}>){

},
onFaildChangeStatusJobRequestId(state,action){
    
},
}
})

const getState=(state:any)=>{    
    return state[DATA_STATE_KEY][FAVORIT_MANAGER] || getInitialState()
    }
    
    export const selectors={
        getfavoriteCandidate:createSelector( getState,(state) => state.favoriteCandidate)
    }
    
    export const actions={...slice.actions};
    
    const { reducer } = slice;
    
    export default reducer;
    