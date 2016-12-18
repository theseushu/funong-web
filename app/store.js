/**
 * Create the store with asynchronously loaded reducers
 */

import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import createSagaMiddleware from 'redux-saga';
import createReducer from './reducers';
import sagas from './sagas';

const sagaMiddleware = createSagaMiddleware();

export default function configureStore(initialState = {}, history, api) {
  // Create the store with two middlewares
  // 1. sagaMiddleware: Makes redux-sagas work
  // 2. routerMiddleware: Syncs the location/URL path to the state
  const middlewares = [
    sagaMiddleware,
    routerMiddleware(history),
  ];

  const enhancers = [
    applyMiddleware(...middlewares),
  ];

  if (process.env.NODE_ENV !== 'production' && typeof window === 'object') {
    const DevTools = require('./DevTools').default; // eslint-disable-line global-require
    const devtoolsExt = DevTools.instrument();
    enhancers.push(devtoolsExt);
  }

  const store = createStore(
    createReducer(),
    initialState,
    compose(...enhancers)
  );

  // saga
  store.runSaga = (saga) => sagaMiddleware.run(saga, { api });
  sagas.map(store.runSaga);

  store.asyncReducers = {}; // Async reducer registry

  // Make reducers hot reloadable, see http://mxs.is/googmo
  /* istanbul ignore next */
  if (module.hot) {
    module.hot.accept('./reducers', () => {
      System.import('./reducers').then((reducerModule) => {
        const createReducers = reducerModule.default;
        const nextReducers = createReducers(store.asyncReducers);

        store.replaceReducer(nextReducers);
      });
    });
  }

  return store;
}
