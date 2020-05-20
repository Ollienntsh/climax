import { PayloadAction } from '@reduxjs/toolkit';
import { all, put, select, takeLatest } from 'redux-saga/effects';

import { fetchDataSuccess, fetchDataFail } from './reducer';
import { getReport } from '../../../services';
import { MonthlyAvg } from '../../../types';
import { RootState } from '../../../redux/reducers';

function* fetchData({ payload }: PayloadAction<{}>) {
  try {
    const {
      app: { country, measurementType, period },
    }: RootState = yield select();

    const response = yield getReport('mavg', measurementType, period, country);
    const json: MonthlyAvg[] = yield response.json();

    yield put(fetchDataSuccess(json));
  } catch (error) {
    yield put(fetchDataFail(error.message));
  }
}

function* watchForRequestData() {
  yield takeLatest('climateTable/fetchData', fetchData);
}

export default function* climateTableSagas() {
  yield all([watchForRequestData()]);
}