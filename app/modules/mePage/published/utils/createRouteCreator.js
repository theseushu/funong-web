import _toPairs from 'lodash/toPairs';
import { currentUserSelector } from 'modules/data/ducks/selectors';
import { queryToCriteria, criteriaToApiParams } from 'utils/criteriaUtils';

export default (path, name, modulesAndDucks) => ({ store, injectReducer, injectSagas, loadModule, errorLoading }) => {
  let injected = false;
  return {
    path,
    name,
    getComponent: async ({ location: { query } }, cb) => {
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
      const criteria = queryToCriteria(query);
      await new Promise((resolve, reject) => {
        const { actions: { page }, selectors } = ducks;
        const pageState = selectors.page(store.getState());
        // if the data has been fetched before, don't wait for the api response. otherwise, wait for it
        if (pageState && pageState.fulfilled) {
          store.dispatch(page({
            owner: currentUser,
            ...criteriaToApiParams(criteria),
          }));
          resolve();
        } else {
          store.dispatch(page({
            owner: currentUser,
            ...criteriaToApiParams(criteria),
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

