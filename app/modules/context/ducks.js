import { takeEvery, select, put } from 'redux-saga/effects';
import { isFarmSiteUser } from 'funong-common/lib/appConstants';
import { currentUserSelector } from 'modules/data/ducks/selectors';
const debug = require('debug')('funongweb:modules/context');

const INIT = 'context/init';
const SET_SITE = 'context/set_site';
const SET_CONTEXT = 'context/set_context';

export default {
  context: (state = {}, { type, payload }) => {
    if (type === SET_CONTEXT) {
      return { ...payload };
    }
    return state;
  },
};

export const actions = {
  setSite: ({ main, farm }) => ({ type: SET_SITE, payload: { main, farm } }),
  init: (request, response) => ({ type: INIT, meta: { request, response } }),
};

export const selectors = {
  site: (state) => ({
    main: state.context.site == null,
    farm: state.context.site === 'farm',
  }),
};

const setSiteSaga = function* ({ payload }) {
  if (process.env.browser) {
    const { farm } = payload;
    let site = null;
    if (farm) {
      site = 'farm';
    }
    yield put({ type: SET_CONTEXT, payload: { site } });
    const Cookies = require('js-cookie'); // eslint-disable-line global-require
    const context = yield select((state) => state.context);
    Cookies.set('context', context);
  } else {
    debug('You should only call this method in browser');
  }
};

const initSaga = function* ({ meta }) {
  let context = null;
  if (!process.env.browser) {
    const cookieParser = require('cookie-parser'); // eslint-disable-line global-require
    if (meta.request.cookies.context) {
      context = cookieParser.JSONCookie(meta.request.cookies.context);
    }
  } else {
    debug('You should not call this method in browser');
  }
  if (!context) {
    const currentUser = yield select(currentUserSelector);
    if (currentUser) {
      context = { site: isFarmSiteUser(currentUser) ? 'farm' : null };
    } else {
      context = { site: null };
    }
  }
  yield put({ type: SET_CONTEXT, payload: context });
};

const watcher = function* () {
  yield takeEvery(INIT, initSaga);
  yield takeEvery(SET_SITE, setSiteSaga);
};

export const sagas = [
  watcher,
];
