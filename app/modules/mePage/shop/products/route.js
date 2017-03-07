import _toPairs from 'lodash/toPairs';
import { myShopSelector } from 'modules/data/ducks/selectors';
import { queryToSearch } from './queryUtils';

export default ({ store, injectReducer, injectSagas, loadModule, errorLoading }) => ({
  path: 'products',
  name: 'myShopProducts',
  getComponent: async ({ location: { query } }, cb) => {
    const importModules = Promise.all([
      System.import('./index'),
      System.import('./ducks'),
    ]);
    const renderRoute = loadModule(cb);
    const [component, ducks] = await importModules;
    if (!this.injected) {
      this.injected = true;
      _toPairs(ducks.default).forEach((pair) => {
        injectReducer(pair[0], pair[1]);
      });
      if (ducks.sagas) {
        injectSagas(ducks.sagas);
      }
    }

    const myShop = myShopSelector(store.getState());
    const searchParams = queryToSearch({ shop: { objectId: myShop.objectId }, ...query });

    await new Promise((resolve, reject) => {
      const { actions: { searchProducts }, selectors } = ducks;
      const searchProductsState = selectors.searchProducts(store.getState());
      // if the data has been fetched before, don't wait for the api response. otherwise, wait for it
      if (searchProductsState && searchProductsState.fulfilled) {
        store.dispatch(searchProducts({
          shop: myShop,
          ...searchParams,
          page: 1,
          pageSize: 1000,
        }));
        resolve();
      } else {
        store.dispatch(searchProducts({
          shop: myShop,
          ...searchParams,
          page: 1,
          pageSize: 1000,
          meta: {
            resolve,
            reject,
          },
        }));
      }
    });

    renderRoute(component);
    importModules.catch(errorLoading);
  },
});
