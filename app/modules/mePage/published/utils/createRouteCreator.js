import { currentUserSelector } from 'modules/data/ducks/selectors';
import { queryToCriteria, criteriaToApiParams } from 'utils/criteriaUtils';
import { loadAsyncModules } from 'utils/routerUtils';

export default (path, name, componentPromise, ducksPromise) => ({ store, loadModule, errorLoading }) => ({
  path,
  name,
  getComponent: async ({ location: { query } }, cb) => loadAsyncModules({
    store,
    loadModule,
    errorLoading,
    cb,
    routeName: name,
    componentPromise,
    ducksPromise,
    beforeRender: async (ducks) => {
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
    },
  }),
});

