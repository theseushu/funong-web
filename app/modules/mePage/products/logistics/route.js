import _toPairs from 'lodash/toPairs';
import { currentUserSelector } from 'modules/data/ducks/selectors';

export default ({ store, injectReducer, injectSagas, loadModule, errorLoading }) => ({
  path: 'logistics',
  name: 'logisticsProducts',
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
      const { actions: { searchLogisticsProducts }, selectors } = ducks;
      const searchLogisticsProductState = selectors.searchLogisticsProducts(store.getState());
        // if the data has been fetched before, don't wait for the api response. otherwise, wait for it
      if (searchLogisticsProductState && searchLogisticsProductState.fulfilled) {
        store.dispatch(searchLogisticsProducts({
          ownerId: currentUser.objectId,
        }));
        resolve();
      } else {
        store.dispatch(searchLogisticsProducts({
          ownerId: currentUser.objectId,
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
