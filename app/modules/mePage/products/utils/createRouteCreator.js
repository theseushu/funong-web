import _toPairs from 'lodash/toPairs';
import { currentUserSelector } from 'modules/data/ducks/selectors';

export default (path, name, modulesAndDucks) => ({ store, injectReducer, injectSagas, loadModule, errorLoading }) => {
  let injected = false;
  return {
    path,
    name,
    getComponent: async (nextState, cb) => {
      const renderRoute = loadModule(cb);
      const [component, ducks] = await modulesAndDucks;
      if (!injected) {
        injected = true;
        _toPairs(ducks.default).forEach((pair) => {
          injectReducer(pair[0], pair[1]);
        });
        injectSagas(ducks.sagas);
      }
      const currentUser = currentUserSelector(store.getState());
      await new Promise((resolve, reject) => {
        const { actions: { searchProducts }, selectors } = ducks;
        const searchProductsState = selectors.searchProducts(store.getState());
        // if the data has been fetched before, don't wait for the api response. otherwise, wait for it
        if (searchProductsState && searchProductsState.fulfilled) {
          store.dispatch(searchProducts({
            owner: currentUser,
            page: 1,
            pageSize: 1000,
          }));
          resolve();
        } else {
          store.dispatch(searchProducts({
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
      modulesAndDucks.catch(errorLoading);
    },
  };
};

