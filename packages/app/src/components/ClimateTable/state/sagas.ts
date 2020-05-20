import { PayloadAction } from '@reduxjs/toolkit';
import { all } from 'redux-saga/effects';
import { put, takeLatest } from 'redux-saga/effects';

import { fetchDataSuccess, fetchDataFail } from './reducer';
import { getReport } from '../../../services';
import { MonthlyAvg } from '../../../types';

function* fetchData({ payload }: PayloadAction<{}>) {
  try {
    const response = yield getReport();
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
