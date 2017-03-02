import _toPairs from 'lodash/toPairs';
import { currentUserSelector } from 'modules/data/ducks/selectors';

export default ({ store, injectReducer, injectSagas, loadModule, errorLoading }) => ({
  path: 'supply',
  name: 'supplyProducts',
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
      const { actions: { searchSupplyProducts }, selectors } = ducks;
      const searchSupplyProductState = selectors.searchSupplyProducts(store.getState());
        // if the data has been fetched before, don't wait for the api response. otherwise, wait for it
      if (searchSupplyProductState && searchSupplyProductState.fulfilled) {
        store.dispatch(searchSupplyProducts({
          ownerId: currentUser.objectId,
          page: 1,
          pageSize: 1000,
        }));
        resolve();
      } else {
        store.dispatch(searchSupplyProducts({
          ownerId: currentUser.objectId,
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
