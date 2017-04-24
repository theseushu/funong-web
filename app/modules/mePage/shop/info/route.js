import { routes } from 'funong-common/lib/appConstants';
import { requireForm, loadAsyncModules } from 'utils/routerUtils';

export default ({ store, loadModule, errorLoading }) => ({
  path: routes.page_my_shop,
  name: 'page_my_shop',
  getComponent: async (nextState, cb) => loadAsyncModules({
    store,
    loadModule,
    errorLoading,
    cb,
    routeName: 'page_my_shop',
    componentPromise: System.import('./index'),
    otherPromises: [
      requireForm(store),
    ],
  }),
});
