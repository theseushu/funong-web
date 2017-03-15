import _toPairs from 'lodash/toPairs';
import { currentUserSelector } from 'modules/data/ducks/selectors';
import { actions } from 'api/profile';
import nextRoute from './nextRoute';

const fetchProfile = actions.fetch;
export default ({ store, injectReducer, injectSagas, loadModule, errorLoading }) => ({ // eslint-disable-line no-unused-vars
  path: '/welcome',
  name: 'welcome',
  onEnter: async (nextState, replace, callback) => {
    const proceed = (user) => {
      if (user.type) {
        replace(nextRoute(user.type));
        callback();
      } else {
        callback();
      }
    };
    const currentUser = currentUserSelector(store.getState());
    if (!currentUser) {
      store.dispatch(fetchProfile({ meta: { resolve: proceed, errorLoading } }));
    } else {
      proceed(currentUser);
    }
  },
  getComponent(nextState, cb) {
    const importModules = Promise.all([
      System.import('./index'),
      System.import('./ducks'),
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
