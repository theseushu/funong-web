import _toPairs from 'lodash/toPairs';
import { routes } from 'appConstants';
import { requireAuth } from 'utils/routerUtils';
import { actions } from 'api/cart';

const fetchCart = actions.fetch;

const fetchData = async (store) => {
  await new Promise((resolve, reject) => {
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
  });
};

export default ({ store, injectReducer, injectSagas, loadModule, errorLoading }) => ({ // eslint-disable-line no-unused-vars
  path: routes.page_my_cart,
  name: 'page_my_certs',
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
  getComponent(nextState, cb) {
    // TODO fetch product
    const importModules = Promise.all([
      System.import('./index'),
      System.import('./ducks'),
      fetchData(store),
    ]);

    const renderRoute = loadModule(cb);

    importModules.then(([component, ducks]) => {
      _toPairs(ducks.default).forEach((pair) => {
        injectReducer(pair[0], pair[1]);
      });
      renderRoute(component);
    });

    importModules.catch(errorLoading);
  },
});
