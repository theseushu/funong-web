import _findIndex from 'lodash/findIndex';
import { routes } from 'funong-common/lib/appConstants';
import { requireAuth, loadAsyncModules } from 'utils/routerUtils';
import { currentUserSelector } from 'modules/data/ducks/selectors';

export default ({ store, injectReducer, injectSagas, loadModule, errorLoading }) => ({ // eslint-disable-line no-unused-vars
  path: routes.page_order,
  name: 'page_order',
  onEnter: async ({ location }, replace, callback) => {
    const { login } = await requireAuth(store);
    if (login) {
      const cartPageDucks = await System.import('../mePage/cart/ducks');
      const itemsSelector = cartPageDucks.selectors.items;
      const items = itemsSelector(store.getState());
      if (items == null || items.length === 0) {
        // TODO uncomment
        replace(routes.page_my_cart);
      }
      callback();
    } else {
      const redirect = `${location.pathname}${location.search}`;
      const message = '请登录';
      replace(`${routes.page_login}?message=${message}&redirect=${redirect}`);
      callback();
    }
  },
  getComponent: async (nextState, cb) => loadAsyncModules({
    store,
    loadModule,
    errorLoading,
    cb,
    routeName: 'page_order',
    componentPromise: System.import('./index'),
    ducksPromise: System.import('./ducks'),
    beforeRender: async (ducks) => {
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
    },
  }),
});
