import _toPairs from 'lodash/toPairs';
import { requireAuth, requireShop } from 'utils/routerUtils';

export default (path, name, actions, componentAndDucks, isShop) => ({ store, injectReducer, injectSagas, loadModule, errorLoading }) => {
  const fetch = actions.fetch;
  let injected = false;
  return {
    path,
    name,
    onEnter: async ({ params: { id }, location: { pathname, search, query } }, replace, proceed) => {
      if (id === 'new' || query.edit) {
        const { login } = await requireAuth(store);
        if (!login) {
          const redirect = `${location.pathname}${location.search}`;
          const message = '请登录';
          replace(`/login?message=${message}&redirect=${redirect}`);
          proceed();
          return;
        }
        if (isShop) {
          const { shop } = await requireShop(store);
          if (!shop) {
            replace('/me/shop');
            proceed();
            return;
          }
        }
      }
      if (id !== 'new') {
        await new Promise((resolve, reject) => {
          store.dispatch(fetch({
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
    getComponent: async (nextState, cb) => {
      const renderRoute = loadModule(cb);
      const [component, ducks] = await componentAndDucks;
      if (!injected) {
        _toPairs(ducks.default).forEach((pair) => {
          injectReducer(pair[0], pair[1]);
        });
        if (ducks.sagas) {
          injectSagas(ducks.sagas);
        }
        injected = true;
      }
      renderRoute(component);
      componentAndDucks.catch(errorLoading);
    },
  };
};
