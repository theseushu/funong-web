import _toPairs from 'lodash/toPairs';
import { requireAuth } from 'utils/routerUtils';

export default ({ store, injectReducer, injectSagas, loadModule, errorLoading }) => ({ // eslint-disable-line no-unused-vars
  path: '/order',
  name: 'order',
  onEnter: async ({ location }, replace, callback) => {
    const { login } = await requireAuth(store);
    if (login) {
      const cartPageDucks = await System.import('../cartPage/ducks');
      const itemsSelector = cartPageDucks.selectors.items;
      if (itemsSelector(store.getState()) == null) {
        replace('/cart');
      }
      callback();
    } else {
      const redirect = `${location.pathname}${location.search}`;
      const message = '请登录';
      replace(`/login?message=${message}&redirect=${redirect}`);
      callback();
    }
  },
  getComponent(nextState, cb) {
    // TODO fetch product
    const importModules = Promise.all([
      System.import('./index'),
      System.import('./ducks'),
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
});
