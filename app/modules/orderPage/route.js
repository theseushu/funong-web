import _toPairs from 'lodash/toPairs';
import _findIndex from 'lodash/findIndex';
import { requireAuth } from 'utils/routerUtils';
import { currentUserSelector } from 'modules/data/ducks/selectors';

export default ({ store, injectReducer, injectSagas, loadModule, errorLoading }) => ({ // eslint-disable-line no-unused-vars
  path: '/order',
  name: 'order',
  onEnter: async ({ location }, replace, callback) => {
    const { login } = await requireAuth(store);
    if (login) {
      const cartPageDucks = await System.import('../cartPage/ducks');
      const itemsSelector = cartPageDucks.selectors.items;
      const items = itemsSelector(store.getState());
      if (items == null || items.length === 0) {
        // TODO uncomment
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
      // set default address selection
      const { actions, selectors } = ducks;
      const { selectAddress, createOrders } = actions;
      const user = currentUserSelector(store.getState());
      let addressIndex = selectors.addressIndex(store.getState());
      if (addressIndex == null) {
        addressIndex = _findIndex(user.addresses, (address) => address.default);
      }
      store.dispatch(selectAddress(addressIndex));
      const address = user.addresses[addressIndex];
      System.import('../cartPage/ducks').then((cartPageDucks) => {
        const itemsSelector = cartPageDucks.selectors.items;
        const items = itemsSelector(store.getState());
        // const items = require('./items').default; // eslint-disable-line
        store.dispatch(createOrders(items, address));
        renderRoute(component);
      });
    });

    importModules.catch(errorLoading);
  },
});
