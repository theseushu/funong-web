import _toPairs from 'lodash/toPairs';
import { fetchProfile } from '../api/fetchProfile';
import { currentUserSelector } from '../data/ducks/selectors';
export default ({ store, injectReducer, injectSagas, loadModule, errorLoading }) => ({ // eslint-disable-line no-unused-vars
  path: '/profile',
  name: 'profile',
  getComponent(nextState, cb) {
    const importModules = Promise.all([
      System.import('modules/profilePage'),
      System.import('modules/profilePage/ducks'),
      new Promise((resolve, reject) => {
        const currentUser = currentUserSelector(store.getState());
        if (currentUser) {
          store.dispatch(fetchProfile({}));
          resolve();
        } else {
          store.dispatch(fetchProfile({ meta: { resolve, reject } }));
        }
      }),
    ]);

    const renderRoute = loadModule(cb);

    importModules.then(([component, ducks]) => {
      _toPairs(ducks.default).forEach((pair) => {
        injectReducer(pair[0], pair[1]);
      });
    // injectSagas(ducks.sagas);
      renderRoute(component);
    });

    importModules.catch(errorLoading);
  },
});
