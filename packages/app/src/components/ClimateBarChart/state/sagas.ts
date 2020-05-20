import { PayloadAction } from '@reduxjs/toolkit';
import { all, put, select, takeLatest } from 'redux-saga/effects';

import { fetchDataSuccess, fetchDataFail } from './reducer';
import { getReport } from '../../../services';
import { AnnualAvg } from '../../../types';
import { RootState } from '../../../redux/reducers';

function* fetchData({ payload }: PayloadAction<{}>) {
  try {
    const {
      app: { country, measurementType, period },
    }: RootState = yield select();

    const response = yield getReport('mavg', measurementType, period, country);
    const json: AnnualAvg[] = yield response.json();

    yield put(fetchDataSuccess(json));
  } catch (error) {
    yield put(fetchDataFail(error.message));
  }
}

function* watchForFetchData() {
  yield takeLatest('climateBarChart/fetchData', fetchData);
}

export default function* climateBarChartSagas() {
  yield all([watchForFetchData()]);
}
