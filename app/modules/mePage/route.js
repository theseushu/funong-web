import _toPairs from 'lodash/toPairs';
import { fetchProfile } from '../api/fetchProfile';
import { createProfile } from '../api/createProfile';
import { currentUserSelector } from '../data/ducks/selectors';
import createCertsRoute from './certs/route';
import createProductsRoute from './products/route';
export default ({ store, injectReducer, injectSagas, loadModule, errorLoading }) => ({ // eslint-disable-line no-unused-vars
  path: '/me',
  name: 'me',
  getComponent(nextState, cb) {
    const importModules = Promise.all([
      System.import('modules/mePage'),
      System.import('modules/mePage/ducks'),
      new Promise((resolve, reject) => {
        const currentUser = currentUserSelector(store.getState());
        if (currentUser) {
          // if currentUser.profile is null, create one before continue
          if (!currentUser.profile) {
            store.dispatch(createProfile({ type: '一般用户', meta: { resolve, reject } }));
          } else {
            resolve();
          }
        } else {
          // if currentUser's not been fetched, fetch it before continue
          // if currentUser.profile is null, create one before continue
          store.dispatch(fetchProfile({
            meta: {
              resolve: (user) => {
                if (!user.profile) {
                  store.dispatch(createProfile({ type: '一般用户', meta: { resolve, reject } }));
                } else {
                  resolve();
                }
              },
              reject,
            },
          }));
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
  indexRoute: { // see /me route's getComponent method. currentUser.profile is guaranteed to be existing
    getComponent(nextState, cb) {
      const importModules = Promise.all([
        System.import('modules/mePage/profile'),
        System.import('modules/mePage/profile/ducks'),
      ]);

      const renderRoute = loadModule(cb);

      importModules.then(([component, ducks]) => {
        _toPairs(ducks.default).forEach((pair) => {
          injectReducer(pair[0], pair[1]);
        });
        renderRoute(component);
      });
      importModules.catch(errorLoading);
    },
  },
  childRoutes: [
    createCertsRoute({ store, injectReducer, injectSagas, loadModule, errorLoading }),
    createProductsRoute({ store, injectReducer, injectSagas, loadModule, errorLoading }),
  ],
});
