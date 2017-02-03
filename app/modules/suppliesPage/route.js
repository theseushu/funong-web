import _toPairs from 'lodash/toPairs';

export default ({ store, injectReducer, injectSagas, loadModule, errorLoading }) => ({ // eslint-disable-line no-unused-vars
  path: '/supplies',
  name: 'supplies',
  getComponent: async (nextState, cb) => {
    // TODO fetch product
    const { params: { id } } = nextState; // eslint-disable-line no-unused-vars
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
    await new Promise((resolve, reject) => {
      const { actions: { searchSupplyProducts }, selectors } = ducks;
      const searchSupplyProductState = selectors.searchSupplyProducts(store.getState());
      // if the data has been fetched before, don't wait for the api response. otherwise, wait for it
      if (searchSupplyProductState && searchSupplyProductState.fulfilled) {
        store.dispatch(searchSupplyProducts({
        }));
        resolve();
      } else {
        store.dispatch(searchSupplyProducts({
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
