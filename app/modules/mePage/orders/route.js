import _toPairs from 'lodash/toPairs';

let injected = false;

export default ({ store, injectReducer, injectSagas, loadModule, errorLoading }) => ({ // eslint-disable-line
  path: 'orders',
  name: 'orders',
  getComponent: async (nextState, cb) => {
    const renderRoute = loadModule(cb);
    const importModules = Promise.all([
      System.import('./index'),
      System.import('./ducks'),
    ]);

    const [component, ducks] = await importModules;
    if (!injected) {
      injected = true;
      _toPairs(ducks.default).forEach((pair) => {
        injectReducer(pair[0], pair[1]);
      });
      injectSagas(ducks.sagas);
    }

    await new Promise((resolve, reject) => {
      const { actions: { search }, selectors } = ducks;
      const searchState = selectors.search(store.getState());
      // if the data has been fetched before, don't wait for the api response. otherwise, wait for it
      if (searchState && searchState.fulfilled) {
        store.dispatch(search({
          page: 1,
          pageSize: 50,
        }));
        resolve();
      } else {
        store.dispatch(search({
          page: 1,
          pageSize: 50,
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
