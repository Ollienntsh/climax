import { configureStore, EnhancedStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import { all } from 'redux-saga/effects';

import { default as appSagas } from '../components/App/state/sagas';
import rootReducer, { RootState } from './reducers';

function* rootSaga() {
  yield all([appSagas()]);
}

export default (): EnhancedStore => {
  const sagaMiddleware = createSagaMiddleware();

  const store = configureStore<RootState>({
    reducer: rootReducer,
    middleware: [sagaMiddleware],
  });

  /* istanbul ignore next */
  if (process.env.NODE_ENV !== 'production' && module.hot) {
    /* istanbul ignore next */
    module.hot.accept('./reducers', () => store.replaceReducer(rootReducer));
  }

  sagaMiddleware.setContext({ store });
  sagaMiddleware.run(rootSaga);

  return store;
};
