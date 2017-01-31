import _toPairs from 'lodash/toPairs';
import { ensureProfile } from '../../utils/routerUtils';
import createCertsRoute from './certs/route';
import createProductsRoute from './products/route';
export default ({ store, injectReducer, injectSagas, loadModule, errorLoading }) => ({ // eslint-disable-line no-unused-vars
  path: '/me',
  name: 'me',
  indexRoute: { // see /me route's getComponent method. currentUser.profile is guaranteed to be existing
    getComponent(nextState, cb) {
      const importModules = Promise.all([
        System.import('modules/mePage/profile'),
        System.import('modules/mePage/profile/ducks'),
        ensureProfile(store),
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
