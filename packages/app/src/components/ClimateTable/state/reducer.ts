import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { MonthlyAvg } from '../../../types';

export interface ClimateTableState {
  data?: MonthlyAvg[];
  fetching?: boolean;
  error?: string;
}

const initialState: ClimateTableState = {};

const ClimateSlice = createSlice({
  name: 'climateTable',
  initialState,
  reducers: {
    fetchData(state: ClimateTableState, action: PayloadAction<{}>) {
      state.fetching = true;
    },
    fetchDataSuccess(
      state: ClimateTableState,
      { payload: data }: PayloadAction<MonthlyAvg[]>,
    ) {
      state.fetching = false;
      state.data = data;
    },
    fetchDataFail(
      state: ClimateTableState,
      { payload: error }: PayloadAction<string>,
    ) {
      state.fetching = false;
      state.error = error;
    },
  },
});

const { actions, reducer } = ClimateSlice;
const { fetchData, fetchDataFail, fetchDataSuccess } = actions;

export { fetchData, fetchDataFail, fetchDataSuccess };
export default reducer;
