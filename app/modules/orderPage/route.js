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
      const cartPageDucks = await System.import('../mePage/cart/ducks');
      const itemsSelector = cartPageDucks.selectors.items;
      const items = itemsSelector(store.getState());
      if (items == null || items.length === 0) {
        // TODO uncomment
        replace('/me/cart');
      }
      callback();
    } else {
      const redirect = `${location.pathname}${location.search}`;
      const message = '请登录';
      replace(`/login?message=${message}&redirect=${redirect}`);
      callback();
    }
  },
  getComponent: async (nextState, cb) => {
    // TODO fetch product
    const importModules = Promise.all([
      System.import('./index'),
      System.import('./ducks'),
    ]);

    const renderRoute = loadModule(cb);

    const [component, ducks] = await importModules;

    _toPairs(ducks.default).forEach((pair) => {
      injectReducer(pair[0], pair[1]);
    });
    // set items and default address selection
    const { actions, selectors } = ducks;
    const { setCartItems, selectAddress } = actions;

    // set items
    const cartPageDucks = await System.import('../mePage/cart/ducks');
    const itemsSelector = cartPageDucks.selectors.items;
    const items = itemsSelector(store.getState());
    store.dispatch(setCartItems(items));

    // set default address
    const user = currentUserSelector(store.getState());
    let addressIndex = selectors.addressIndex(store.getState());
    if (addressIndex == null) {
      addressIndex = _findIndex(user.addresses, (address) => address.default);
    }
    const address = user.addresses[addressIndex];
    store.dispatch(selectAddress(addressIndex, address));

    renderRoute(component);

    importModules.catch(errorLoading);
  },
});
