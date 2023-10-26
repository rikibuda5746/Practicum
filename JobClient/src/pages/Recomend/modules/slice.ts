import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import DATA_STATE_KEY from "../../../redux/data/constants";
import { date, number } from "yup";
import { format } from "path";

import { RecomendStore, RecommendAllDetails } from "../modules/interface"

export const getInitialState = ():RecomendStore => ({
    recomends:[],
    isFillRecomend:false,
    isLoading: false,
    deletedRecomends:[],
    isNextRecomend:false
});

export const RECOMEND ='RECOMEND';

const slice=createSlice({
    name:RECOMEND,
    initialState:getInitialState(),
    reducers:{

        onAddRecomend(state) {
            state.recomends.push({iRecommenId: 0,
                nvName:"",
                nvJob:"",
                Note:"",
                nvPhone:"",
                nvEmail:"",
                iUserId:0,
                iJobsStockId:0});
        },

        onRemoveRecomend(state,action:PayloadAction<{index:number,recomend:RecommendAllDetails}>){
            console.log("onRemoveRecomend")
            if(state.recomends.length==1){
            state.recomends=[{iRecommenId: 0,
                nvName:"",
                nvJob:"",
                Note:"",
                nvPhone:"",
                nvEmail:"",
                iUserId:0,
                iJobsStockId:0}];}
            else if(state.recomends.length > 1){
                state.recomends.splice(action.payload.index,1);
            }
            if(action.payload.recomend.iRecommenId!=0){
            console.log("the irecomend !=0");
            state.deletedRecomends.push(action.payload.recomend);}
            console.log("onRemoveRecomend_end");
        },

        isFill(state){
            console.log("onisFill")
            state.recomends.map(recomend=>(recomend.nvEmail===""||recomend.nvName===""||recomend.nvPhone===""?
            state.isFillRecomend=false:
            state.isFillRecomend=true))
            console.log(" state.isFillRecomend", state.isFillRecomend);
        },

        saveDetails(state,action:PayloadAction<{index:number, filedName:"nvName"|"nvJob"|"Note"|"nvPhone"|"nvEmail",value:string}>){
            action.payload.filedName=="nvName" ? state.recomends[action.payload.index].nvName=action.payload.value:
            action.payload.filedName=="nvJob" ? state.recomends[action.payload.index].nvJob=action.payload.value:
            action.payload.filedName=="Note" ? state.recomends[action.payload.index].Note=action.payload.value:
            action.payload.filedName=="nvEmail" ? state.recomends[action.payload.index].nvEmail=action.payload.value:
            state.recomends[action.payload.index].nvPhone=action.payload.value;
        },

        onInsertRecomend(state){
        },

        OnDeleteRecomend(state){            
        },

        next(state){
            console.log("next");
            state.isNextRecomend=true;            
            console.log("isNextRecomend",state.isNextRecomend);

        },

        getRecomendById(state){
            state.isLoading=true;
        },

        getRecomendByIdSuccess(state,action)
        {
            state.isLoading=false;
            state.recomends = action.payload.data;
            if(action.payload.data.length!=0){
                state.recomends=action.payload.data;
            }
            else{
                state.recomends=[{iRecommenId: 0,
                    nvName:"",
                    nvJob:"",
                    Note:"",
                    nvPhone:"",
                    nvEmail:"",
                    iUserId:0,
                    iJobsStockId:0}];
            }
        }
        
    }
});
const getState = (state:any) => {
    // console.log(state[DATA_STATE_KEY][RECOMEND])
    return state[DATA_STATE_KEY][RECOMEND] || getInitialState()
};
export const selectors={
    getIsFillRecomend:createSelector(getState,(state) => state.isFillRecomend),
    getRecomendsById:createSelector(getState,(state) => state.recomends),
    getIsLoading:createSelector(getState,(state) => state.isLoading),
    getRecomendsDeleted:createSelector(getState,(state)=> state.deletedRecomends),
    getIsNextRecomend:createSelector(getState,(state) => state.isNextRecomend),
}

export const actions={...slice.actions};

const { reducer } = slice;

export default reducer;

 
