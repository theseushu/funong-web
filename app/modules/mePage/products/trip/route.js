import _toPairs from 'lodash/toPairs';
import { currentUserSelector } from 'modules/data/ducks/selectors';

export default ({ store, injectReducer, injectSagas, loadModule, errorLoading }) => ({
  path: 'trip',
  name: 'tripProducts',
  getComponent: async (nextState, cb) => {
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
      injectSagas(ducks.sagas);
    }
    const currentUser = currentUserSelector(store.getState());
    await new Promise((resolve, reject) => {
      const { actions: { searchTripProducts }, selectors } = ducks;
      const searchTripProductsState = selectors.searchTripProducts(store.getState());
        // if the data has been fetched before, don't wait for the api response. otherwise, wait for it
      if (searchTripProductsState && searchTripProductsState.fulfilled) {
        store.dispatch(searchTripProducts({
          owner: currentUser,
          page: 1,
          pageSize: 1000,
        }));
        resolve();
      } else {
        store.dispatch(searchTripProducts({
          owner: currentUser,
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
