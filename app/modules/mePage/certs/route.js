import { routes } from 'appConstants';
import { loadAsyncModules, requireForm } from 'utils/routerUtils';
import { actions, selectors } from 'api/cert';

const searchMine = actions.searchMine;
const searchMineState = selectors.searchMine;

export default ({ store, injectReducer, injectSagas, loadModule, errorLoading }) => ({ // eslint-disable-line
  path: routes.page_my_certs,
  name: 'page_my_certs',
  onEnter: async ({ location }, replace, callback) => {
    await requireForm(store);
    callback();
  },
  getComponent: async (nextState, cb) => await loadAsyncModules({
    store,
    loadModule,
    errorLoading,
    cb,
    routeName: 'certs',
    componentPromise: System.import('./index'),
    otherPromises: [
      new Promise((resolve, reject) => {
        if (searchMineState(store.getState()).fulfilled) {
          resolve();
          store.dispatch(searchMine());
        } else {
          store.dispatch(searchMine({
            meta: {
              resolve,
              reject,
            },
          }));
        }
      }),
    ],
  }),
});
