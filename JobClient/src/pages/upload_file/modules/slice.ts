import { PayloadAction, createSelector, createSlice, current } from "@reduxjs/toolkit";

export const UPLOAD_FILE_STATE_KEY = "upload_file_state_key"

export interface FileState {
    file?: File,
    fileType?: string,
}
export interface prevFaile {
    nameFile: string,
    DocumentType: number,
    Respons: string
}

export interface Data {
    files: FileState[],
    IsFillUploadFile: boolean,
    isNextUploadFile:boolean,
    prevFails: prevFaile[],
}

export const getInitialState = (): Data => ({
    files: [],
    IsFillUploadFile: false,
    isNextUploadFile:false,
    prevFails:[]
})

export interface SendData {
    nameFile: string,
    UserId: number,
    DocumentType: string,
    Respons: string
}


export const slice = createSlice({
    name: UPLOAD_FILE_STATE_KEY,
    initialState: getInitialState(),
    reducers: {
        onUploadFile: (state, action: PayloadAction<{ File: any, index: number, fileType: string }>) => {
            console.log("index: ", action.payload.index);
            state.files.push({
                file: action.payload.File,
                fileType: action.payload.fileType,
            });
            state.IsFillUploadFile = true
            console.log("state", current(state).files);
        },
        onChangeFiletype: (state, action: PayloadAction<{ index: number, fileType: string }>) => {
            state.files[action.payload.index].fileType = action.payload.fileType;

            console.log("state", current(state).files);
        },
        onRemoveFile: (state, action) => {
            console.log(action.payload);
            state.files.splice(action.payload, 1)
            console.log("state", current(state.files));
        },
        next(state){
            state.isNextUploadFile=true;
        },
        onSetSave: (state, action: PayloadAction<SendData>) => {

        },

        onSetSaveSuccess: (state, action) => {
            console.log("the date save successfully!!!!");
            state.prevFails.push(action.payload);
        },
        getFiles: (state, action: PayloadAction<{ userId: number }>) => {

        },
        onSuccessGetFiles: (state, action) => {
            state.prevFails = action.payload;
        }
    }
})

const getState = (state: any) => {
    return state[UPLOAD_FILE_STATE_KEY] || getInitialState();
};

export const selectors = {
    getFiles: createSelector(getState, (state) => state.files),
    getUploadFile: createSelector(getState, (state) => state.files.IsFillUploadFile),
    getIsNextUploadFile:createSelector(getState, (state) => state.files.isNextUploadFile),
    getPrevFails: createSelector(getState, (state) => state.prevFails),
};

export const actions = { ...slice.actions };

const { reducer } = slice;

export default reducer;
