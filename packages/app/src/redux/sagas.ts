import { PayloadAction } from '@reduxjs/toolkit';
import { all } from 'redux-saga/effects';
import { put, takeLatest } from 'redux-saga/effects';

import {
  fetchDataSuccess,
  fetchDataFail,
} from '../components/App/state/reducer';
import { MonthlyAvg } from '../types';

function* fetchData({ payload }: PayloadAction<{}>) {
  try {
    const response = yield fetch(process.env.REACT_APP_ENDPOINT || '');
    const json: MonthlyAvg[] = yield response.json();

    yield put(fetchDataSuccess(json));
  } catch (error) {
    yield put(fetchDataFail(error.message));
  }
}

function* watchForRequestData() {
  yield takeLatest('climate/fetchData', fetchData);
}

export default function* appSaga() {
  yield all([watchForRequestData()]);
}
