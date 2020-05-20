import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Country, MeasurementType, Period } from '../../../types';
import { Countries, Periods } from '../../../constants';

export interface AppState {
  country: Country;
  measurementType: MeasurementType;
  period: Period;
}

const initialState: AppState = {
  country: Countries[0],
  measurementType: 'tas',
  period: Periods[3],
};

const ClimateSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setFilters(
      state: AppState,
      {
        payload: { country, measurementType, period },
      }: PayloadAction<Partial<AppState>>,
    ) {
      if (country) {
        state.country = country;
      }

      if (measurementType) {
        state.measurementType = measurementType;
      }

      if (period) {
        state.period = period;
      }
    },
  },
});

const { actions, reducer } = ClimateSlice;
const { setFilters } = actions;

export { setFilters };
export default reducer;
