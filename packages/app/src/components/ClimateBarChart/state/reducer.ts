import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { AnnualAvg } from '../../../types';

export interface ClimateBarChartState {
  data?: { key: string; value: number }[];
  fetching?: boolean;
  error?: string;
}

const initialState: ClimateBarChartState = {};

const ClimateBarChartSlice = createSlice({
  name: 'climateBarChart',
  initialState,
  reducers: {
    fetchData(state: ClimateBarChartState, action: PayloadAction<{}>) {
      state.fetching = true;
    },
    fetchDataSuccess(
      state: ClimateBarChartState,
      { payload }: PayloadAction<AnnualAvg[]>,
    ) {
      state.fetching = false;
      state.data = payload.map(({ gcm, annualData: [value] }) => ({
        key: gcm,
        value,
      }));
    },
    fetchDataFail(
      state: ClimateBarChartState,
      { payload: error }: PayloadAction<string>,
    ) {
      state.fetching = false;
      state.error = error;
    },
  },
});

const { actions, reducer } = ClimateBarChartSlice;
const { fetchData, fetchDataFail, fetchDataSuccess } = actions;

export { fetchData, fetchDataFail, fetchDataSuccess };
export default reducer;
