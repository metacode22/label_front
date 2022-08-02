import { configureStore, createSlice } from '@reduxjs/toolkit';

let onOffHistory = createSlice({
    name: 'onOffHistory',
    initialState: false,
    reducers: {
        toggleOnHistory(state) {
            return true;
        },
        toggleOffHistory(state){
            return false;
        }
    }
})

let commitInfo = createSlice({
    name: 'commitInfo',
    initialState: [],
    reducers: {
        changeCommitInfo(state, action) {
            return [...action.payload];
        }
    }
})

export let { toggleOnHistory, toggleOffHistory } = onOffHistory.actions;
export let { changeCommitInfo } = commitInfo.actions;

export default configureStore({
    reducer: {
        onOffHistory: onOffHistory.reducer,
        commitInfo: commitInfo.reducer
    }
})