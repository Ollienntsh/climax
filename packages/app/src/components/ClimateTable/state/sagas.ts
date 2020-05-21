import { all, put, select, takeLatest } from 'redux-saga/effects';

import { fetchDataSuccess, fetchDataFail } from './reducer';
import { getReport, showError } from '../../../services';
import { MonthlyAvg } from '../../../types';
import { RootState } from '../../../redux/reducers';

function* fetchData() {
  try {
    const {
      app: { country, measurementType, period },
    }: RootState = yield select();

    const data: MonthlyAvg[] = yield getReport(
      'mavg',
      measurementType,
      period,
      country,
    );

    yield put(fetchDataSuccess(data));
  } catch (error) {
    yield put(fetchDataFail(error.message));
    showError(error.message);
  }
}

function* watchForFetchData() {
  yield takeLatest('climateTable/fetchData', fetchData);
}

export default function* climateTableSagas() {
  yield all([watchForFetchData()]);
}
