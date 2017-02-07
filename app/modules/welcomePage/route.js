import _toPairs from 'lodash/toPairs';
import { currentUserSelector } from 'modules/data/ducks/selectors';
import { actions } from 'api/profile';

const fetchProfile = actions.fetch;
export default ({ store, injectReducer, injectSagas, loadModule, errorLoading }) => ({ // eslint-disable-line no-unused-vars
  path: '/welcome',
  name: 'welcome',
  getComponent(nextState, cb) {
    const importModules = Promise.all([
      System.import('./index'),
      System.import('./ducks'),
      new Promise((resolve, reject) => {
        const proceed = (user) => {
          if (user.type) {
            // todo redirect since there's no need to welcome user anymore
            resolve();
            console.log('TODO: redirect'); // eslint-disable-line
          } else {
            resolve();
          }
        };
        const currentUser = currentUserSelector(store.getState());
        if (!currentUser) {
          store.dispatch(fetchProfile({ meta: { resolve: proceed, reject } }));
        } else {
          proceed(currentUser);
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
