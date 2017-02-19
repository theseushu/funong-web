import _toPairs from 'lodash/toPairs';
import { requireShop } from 'utils/routerUtils';
import { actions } from 'api/shopProduct';

const fetchShopProduct = actions.fetch;

export default ({ store, injectReducer, injectSagas, loadModule, errorLoading }) => ({ // eslint-disable-line no-unused-vars
  path: '/product/:id',
  name: 'product',
  onEnter: async ({ params: { id }, location: { pathname, search, query } }, replace, proceed) => {
    if (id === 'new' || !query.edit) {
      const { login, shop } = await requireShop(store);
      if (!login) {
        const redirect = `${location.pathname}${location.search}`;
        const message = '请登录';
        replace(`/login?message=${message}&redirect=${redirect}`);
        proceed();
        return;
      } else if (!shop) {
        // todo display this message
        replace('/me/shop?message=您需要先开店，才能编辑商品');
        proceed();
        return;
      }
    }
    if (id !== 'new') {
      await new Promise((resolve, reject) => {
        store.dispatch(fetchShopProduct({
          objectId: id,
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
    }
    proceed();
  },
  getComponent(nextState, cb) {
    // TODO fetch product
    const importModules = Promise.all([
      System.import('./index'),
      System.import('./ducks'),
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
