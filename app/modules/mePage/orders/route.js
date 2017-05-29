import { routes } from 'funong-common/lib/appConstants';
import { loadAsyncModules } from 'utils/routerUtils';
import { queryToCriteria, criteriaToApiParams } from 'funong-common/lib/utils/criteriaUtils';


export default ({ store, loadModule, errorLoading }) => ({
  path: routes.page_my_orders,
  name: 'page_my_orders',
  getComponent: async ({ location: { query } }, cb) => loadAsyncModules({
    store,
    loadModule,
    errorLoading,
    cb,
    routeName: 'page_my_orders',
    componentPromise: System.import('./index'),
    ducksPromise: System.import('./ducks'),
    beforeRender: async (ducks) => {
      await new Promise((resolve, reject) => {
        const criteria = queryToCriteria(query);
        const { actions: { page }, selectors } = ducks;
        const pageState = selectors.page(store.getState());
        // if the data has been fetched before, don't wait for the api response. otherwise, wait for it
        if (pageState && pageState.fulfilled) {
          store.dispatch(page({
            ...criteriaToApiParams(criteria),
          }));
          resolve();
        } else {
          store.dispatch(page({
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
