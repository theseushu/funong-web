import _toPairs from 'lodash/toPairs';
import { requireAuth } from 'utils/routerUtils';
import { actions } from 'api/inquiry';

export default ({ store, injectReducer, injectSagas, loadModule, errorLoading }) => {
  let injected = false;
  const fetchInquiry = actions.fetch;
  return {
    path: '/inquiry/:id',
    name: 'inquiry',
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
      }
      if (id !== 'new') {
        await new Promise((resolve, reject) => {
          store.dispatch(fetchInquiry({
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
      const importModules = Promise.all([
        System.import('./index'),
        System.import('./ducks'),
      ]);

      const renderRoute = loadModule(cb);
      const [component, ducks] = await importModules;
      if (!injected) {
        _toPairs(ducks.default).forEach((pair) => {
          injectReducer(pair[0], pair[1]);
        });
        injectSagas(ducks.sagas);
        injected = true;
      }
      renderRoute(component);
      importModules.catch(errorLoading);
    },
  };
};
