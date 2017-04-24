import { routes } from 'funong-common/lib/appConstants';
import { requireAuth, loadAsyncModules } from 'utils/routerUtils';
import { actions } from 'api/cart';

const fetchCart = actions.fetch;

export default ({ store, loadModule, errorLoading }) => ({
  path: routes.page_my_cart,
  name: 'page_my_cart',
  onEnter: async ({ location }, replace, callback) => {
    const { login } = await requireAuth(store);
    if (login) {
      callback();
    } else {
      const redirect = `${location.pathname}${location.search}`;
      const message = '请登录';
      replace(`/login?message=${message}&redirect=${redirect}`);
      callback();
    }
  },
  getComponent: async (nextState, cb) => loadAsyncModules({
    store,
    loadModule,
    errorLoading,
    cb,
    routeName: 'page_my_cart',
    componentPromise: System.import('./index'),
    ducksPromise: System.import('./ducks'),
    otherPromises: [
      new Promise((resolve, reject) => {
        store.dispatch(fetchCart({
          meta: {
            resolve,
            reject: (err) => {
              console.log(err); // eslint-disable-line
              reject();
              // todo deal with error
            },
          },
        }));
      }),
    ],
  }),
});
