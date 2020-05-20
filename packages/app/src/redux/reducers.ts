import { Reducer, combineReducers } from 'redux';

import { reducer as app } from '../components/App';
import { reducer as climateTableReducer } from '../components/ClimateTable/';
import { reducer as climateBarChartReducer } from '../components/ClimateBarChart/';
import { AppState } from '../components/App/state/reducer';
import { ClimateTableState } from '../components/ClimateTable/state/reducer';
import { ClimateBarChartState } from '../components/ClimateBarChart/state/reducer';

export interface RootState {
  app: AppState;
  climateTable: ClimateTableState;
  climateBarChart: ClimateBarChartState;
}

const rootReducer: Reducer<RootState> = combineReducers({
  app,
  climateTable: climateTableReducer,
  climateBarChart: climateBarChartReducer,
});

export default rootReducer;
