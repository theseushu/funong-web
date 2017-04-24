import { routes } from 'funong-common/lib/appConstants';
import { loadAsyncModules } from 'utils/routerUtils';


export default ({ store, loadModule, errorLoading }) => ({
  path: routes.page_my_orders,
  name: 'page_my_orders',
  getComponent: async (nextState, cb) => loadAsyncModules({
    store,
    loadModule,
    errorLoading,
    cb,
    routeName: 'page_my_orders',
    componentPromise: System.import('./index'),
    ducksPromise: System.import('./ducks'),
    beforeRender: async (ducks) => {
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
    },
  }),
});
