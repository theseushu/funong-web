import { requireAuth, requireShop, requireForm, loadAsyncModules } from 'utils/routerUtils';

export default (path, name, actions, componentPromise, ducksPromise, isShop) => ({ store, loadModule, errorLoading }) => {
  const fetch = actions.fetch;
  return {
    path,
    name,
    onEnter: async ({ params: { id }, location: { pathname, search, query } }, replace, proceed) => {
      if (id === 'new' || query.edit) {
        const { login } = await requireAuth(store);
        if (!login) {
          const redirect = `${pathname}${search}`;
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
        requireForm(store);
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
    getComponent: async (nextState, cb) => loadAsyncModules({
      store,
      loadModule,
      errorLoading,
      cb,
      routeName: name,
      componentPromise,
      ducksPromise,
    }),
  };
};
