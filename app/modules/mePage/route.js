import _toPairs from 'lodash/toPairs';
import { requireAuth } from 'utils/routerUtils';
import createCertsRoute from './certs/route';
import createPublishedRoute from './published/route';
import createShopRoute from './shop/route';
import createOrdersRoute from './orders/route';
import createCartRoute from './cart/route';

export default ({ store, injectReducer, injectSagas, loadModule, errorLoading }) => ({ // eslint-disable-line no-unused-vars
  path: '/me',
  name: 'me',
  onEnter: async ({ location }, replace, callback) => {
    const { login } = await requireAuth(store);
    if (login) {
      callback();
    } else {
      const redirect = `${location.pathname}${location.search}`;
      const message = '请登录';
      replace(`/login?message=${message}&redirect=${redirect}`);
      callback();
    }
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
    createPublishedRoute({ store, injectReducer, injectSagas, loadModule, errorLoading }),
    createShopRoute({ store, injectReducer, injectSagas, loadModule, errorLoading }),
    createOrdersRoute({ store, injectReducer, injectSagas, loadModule, errorLoading }),
    createCartRoute({ store, injectReducer, injectSagas, loadModule, errorLoading }),
  ],
});
