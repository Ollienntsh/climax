import { Reducer, combineReducers } from 'redux';

import { reducer as app } from '../components/App';
import { AppState } from '../components/App/state/reducer';

export interface RootState {
  app: AppState;
}

const rootReducer: Reducer<RootState> = combineReducers({
  app,
});

export default rootReducer;
