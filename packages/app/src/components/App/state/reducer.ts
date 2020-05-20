import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Country, MeasurementType, Period } from '../../../types';

export interface AppState {
  country: Country;
  measurementType: MeasurementType;
  period: Period;
}

const initialState: AppState = {
  country: {
    id: 1,
    name: 'Croatia',
    code: 'HRV',
  },
  measurementType: 'tas',
  period: {
    id: 4,
    fromYear: 1980,
    toYear: 1999,
  },
};

const ClimateSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {},
});

const { actions, reducer } = ClimateSlice;
const {} = actions;

export {};
export default reducer;
