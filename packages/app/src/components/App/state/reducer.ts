import { combineReducers } from 'redux';

import { Country, MeasurementType, Period } from '../../../types';
import {
  default as climateTableReducer,
  ClimateTableState,
} from '../../ClimateTable/state/reducer';

export interface AppState {
  climateTable: ClimateTableState;
  filter?: {
    country: Country;
    measurementType: MeasurementType;
    period: Period;
  };
}

export default combineReducers({
  climateTable: climateTableReducer,
});
