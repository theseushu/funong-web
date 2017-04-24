import { routes } from 'funong-common/lib/appConstants';
import { myShopSelector } from 'modules/data/ducks/selectors';
import { queryToCriteria, criteriaToApiParams } from 'funong-common/lib/utils/criteriaUtils';
import { loadAsyncModules } from 'utils/routerUtils';
import info from 'modules/toastr/info';

export default (path, name, componentPromise, ducksPromise) => ({ store, loadModule, errorLoading }) => ({
  path,
  name,
  onEnter: async ({ location }, replace, callback) => {
    try {
      const myShop = myShopSelector(store.getState());
      if (!myShop) {
        info({ title: '您还没有创建店铺', message: '创建店铺后就可以发布商品啦！' });
        replace({ pathname: routes.page_my_shop, query: location.query, state: { redefined: true } });
        callback();
      } else {
        callback();
      }
    } catch (err) {
      replace('/error');
      callback();
    }
  },
  getComponent: async ({ location: { query } }, cb) => loadAsyncModules({
    store,
    loadModule,
    errorLoading,
    cb,
    routeName: name,
    componentPromise,
    ducksPromise,
    beforeRender: async (ducks) => {
      const myShop = myShopSelector(store.getState());
      const criteria = queryToCriteria(query);
      await new Promise((resolve, reject) => {
        const { actions: { page }, selectors } = ducks;
        const pageState = selectors.page(store.getState());
          // if the data has been fetched before, don't wait for the api response. otherwise, wait for it
        if (pageState && pageState.fulfilled) {
          store.dispatch(page({
            shop: myShop,
            ...criteriaToApiParams(criteria),
          }));
          resolve();
        } else {
          store.dispatch(page({
            shop: myShop,
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

