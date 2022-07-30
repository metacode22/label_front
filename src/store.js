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

export let { toggleOnOffHistory } = onOffHistory.actions;

export default configureStore({
    reducer: {
        onOffHistory: onOffHistory.reducer
    }
})