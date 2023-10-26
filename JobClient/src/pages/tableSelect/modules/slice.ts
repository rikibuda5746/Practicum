import { createSlice, createSelector, PayloadAction } from '@reduxjs/toolkit';
import { State, Item } from '../../interfaces'
import DATA_STATE_KEY from '../../../redux/data/constants';
import { log } from 'console';

export const ALL_SELECT_DATA = 'table';

const initialState: State = {
    data: [],
    loading: false,
    error: null,
};

const slice = createSlice({
    name: ALL_SELECT_DATA,
    initialState,
    reducers: {
        onTableDataRequest(state, action) {
            state.loading = true;
            state.error = null;
        },
        onDataSuccess(state, action) {
            state.data = action.payload;
            console.log('action in slice',action.payload);
            console.log('state in slice',state.data);
            state.loading = false;
            state.error = null;
        },
    },
});

const getState = (state: any) => {
    return state[DATA_STATE_KEY][ALL_SELECT_DATA] || initialState;
}

export const selectors = {
    getTable: createSelector(getState, (state) =>  state.data)    
}

export const actions = { ...slice.actions };

export default slice.reducer;

// export const  { onDataStart, onDataSuccess, onDataFailure } = tableSlice.actions;
// export default tableSlice.reducer;