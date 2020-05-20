import { Reducer, combineReducers } from 'redux';

import { reducer as app } from '../components/App';
import { reducer as climateTableReducer } from '../components/ClimateTable/';
import { AppState } from '../components/App/state/reducer';
import { ClimateTableState } from '../components/ClimateTable/state/reducer';

export interface RootState {
  app: AppState;
  climateTable: ClimateTableState;
}

const rootReducer: Reducer<RootState> = combineReducers({
  app,
  climateTable: climateTableReducer,
});

export default rootReducer;
