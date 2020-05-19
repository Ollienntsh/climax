import { combineReducers, Reducer } from 'redux';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { MonthlyAvg } from '../../../types';

export interface ClimateState {
  response?: MonthlyAvg[];
  fetching?: boolean;
  error?: string;
}

export interface AppState {
  climate: ClimateState;
}

const initialState: ClimateState = {};

const ClimateSlice = createSlice({
  name: 'climate',
  initialState,
  reducers: {
    fetchData(state: ClimateState, action: PayloadAction<{}>) {
      state.fetching = true;
    },
    fetchDataSuccess(
      state: ClimateState,
      { payload: response }: PayloadAction<MonthlyAvg[]>,
    ) {
      state.fetching = false;
      state.response = response;
    },
    fetchDataFail(
      state: ClimateState,
      { payload: error }: PayloadAction<string>,
    ) {
      state.fetching = false;
      state.error = error;
    },
  },
});

const { actions, reducer } = ClimateSlice;
const { fetchData, fetchDataFail, fetchDataSuccess } = actions;

const AppReducer: Reducer<AppState> = combineReducers({
  climate: reducer,
});
export { fetchData, fetchDataFail, fetchDataSuccess };
export default AppReducer;
