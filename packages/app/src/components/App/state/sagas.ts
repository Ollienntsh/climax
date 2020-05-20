import { all } from 'redux-saga/effects';

import { default as climateTableSagas } from '../../ClimateTable/state/sagas';

export default function* appSaga() {
  yield all([climateTableSagas()]);
}
