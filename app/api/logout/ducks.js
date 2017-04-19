import { call } from 'redux-saga/effects';
import createDucks from '../utils/createDucks';
import rootSelector from '../rootSelector';
import namespace from '../namespace';

const ducks = createDucks({
  key: 'logout',
  apiName: 'logout',
  rootSelector,
  namespace,
  sagas: {
    * api({ logout }) {
      yield call(logout);
      if (process.env.browser) {
        yield call(window.location.href = '/');
      }
    },
  },
});

module.exports = ducks;
