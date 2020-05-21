import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { MonthlyAvg } from '../../../types';

export interface ClimateTableState {
  data?: MonthlyAvg[];
  fetching?: boolean;
  error?: string;
}

const initialState: ClimateTableState = {};

const ClimateTableSlice = createSlice({
  name: 'climateTable',
  initialState,
  reducers: {
    addItem(
      state: ClimateTableState,
      { payload: dataItem }: PayloadAction<MonthlyAvg>,
    ) {
      state.data = [...(state.data || []), dataItem];
    },
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

const { actions, reducer } = ClimateTableSlice;
const { addItem, fetchData, fetchDataFail, fetchDataSuccess } = actions;

export { addItem, fetchData, fetchDataFail, fetchDataSuccess };
export default reducer;
