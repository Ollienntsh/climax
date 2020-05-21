import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { AnnualAvg } from '../../../types';

interface DataItem {
  key: string;
  value: number;
}

export interface ClimateBarChartState {
  data?: DataItem[];
  fetching?: boolean;
  error?: string;
}

const initialState: ClimateBarChartState = {};

const ClimateBarChartSlice = createSlice({
  name: 'climateBarChart',
  initialState,
  reducers: {
    addItem(
      state: ClimateBarChartState,
      { payload: dataItem }: PayloadAction<DataItem>,
    ) {
      state.data = [...(state.data || []), dataItem];
    },
    fetchData(state: ClimateBarChartState, _: PayloadAction<{}>) {
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
const { addItem, fetchData, fetchDataFail, fetchDataSuccess } = actions;

export { addItem, fetchData, fetchDataFail, fetchDataSuccess };
export default reducer;
