import { configureStore, createSlice } from '@reduxjs/toolkit';

let onOffHistory = createSlice({
    name: 'onOffHistory',
    initialState: false,
    reducers: {
        toggleOnOffHistory(state) {
            return !state;
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

export let { toggleOnOffHistory } = onOffHistory.actions;
export let { changeCommitInfo } = commitInfo.actions;

export default configureStore({
    reducer: {
        onOffHistory: onOffHistory.reducer,
        commitInfo: commitInfo.reducer
    }
})