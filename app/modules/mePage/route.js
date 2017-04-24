import { routes } from 'funong-common/lib/appConstants';
import { loadAsyncModules, requireAuth } from 'utils/routerUtils';
import createCertsRoute from './certs/route';
import createPublishedRoute from './published/route';
import createShopRoute from './shop/route';
import createOrdersRoute from './orders/route';
import createCartRoute from './cart/route';

export default ({ store, injectReducer, injectSagas, loadModule, errorLoading }) => ({ // eslint-disable-line no-unused-vars
  path: routes.page_me,
  name: 'page_me',
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
    getComponent: async (nextState, cb) => await loadAsyncModules({
      store,
      loadModule,
      errorLoading,
      cb,
      routeName: 'certs',
      componentPromise: System.import('modules/mePage/profile'),
    }),
  },
  childRoutes: [
    createCertsRoute({ store, injectReducer, injectSagas, loadModule, errorLoading }),
    createPublishedRoute({ store, injectReducer, injectSagas, loadModule, errorLoading }),
    createShopRoute({ store, injectReducer, injectSagas, loadModule, errorLoading }),
    createOrdersRoute({ store, injectReducer, injectSagas, loadModule, errorLoading }),
    createCartRoute({ store, injectReducer, injectSagas, loadModule, errorLoading }),
  ],
});
