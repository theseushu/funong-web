import _find from 'lodash/find';
import { error, loadAsyncModules } from 'utils/routerUtils';
import { routes, productTypes } from 'appConstants';
import { actions } from 'api/profile';
import { usersSelector } from 'modules/data/ducks/selectors';
import tabTypes from './tabTypes';

const { fetch } = actions;
export default ({ store, loadModule, errorLoading }) => {
  return ({ // eslint-disable-line no-unused-vars
    path: routes.page_user,
    name: 'page_user',
    onEnter: async ({ params: { id } }, replace, callback) => {
      try {
        const user = await new Promise((resolve) => {
          store.dispatch(fetch({ objectId: id, meta: { resolve } }));
        });
        if (user) {
          callback();
        } else {
          throw new Error('找不到对象');
        }
      } catch (err) {
        error(err, replace);
      }
    },
    getComponent: async ({ params: { id }, location: { query } }, cb) => loadAsyncModules({
      store,
      loadModule,
      errorLoading,
      cb,
      routeName: 'page_user',
      componentPromise: System.import('./index'),
      ducksPromise: System.import('./ducks'),
      beforeRender: async (ducks) => {
        const { t, p, s } = query;
        const pageState = {
          type: tabTypes.indexOf(t) > 0 ? t : tabTypes[0],
          page: Number(p) || 1,
          pageSize: Number(s) || 1,
        };
        store.dispatch(ducks.actions.setPageState(pageState));
        const user = _find(usersSelector(store.getState()), (u) => u.objectId === id);
        const type = pageState.type;
        switch (type) {
          case productTypes.supply:
          case productTypes.logistics:
          case productTypes.trip: {
            const pageProduct = ducks.actions.pageProducts;
            const pagingStateSelector = ducks.selectors.createPageProductsSelector(type);
            const pagingState = pagingStateSelector(store.getState());
            if (pagingState.fulfilled) {
              store.dispatch(pageProduct({ type, owner: user, page: pageState.page, pageSize: pageState.pageSize }));
            } else {
              await new Promise((resolve) => {
                store.dispatch(pageProduct({
                  type,
                  owner: user,
                  page: pageState.page,
                  pageSize: pageState.pageSize,
                  meta: { resolve },
                }));
              });
            }
            break;
          }
          case 'inquiry': {
            const pageInquiries = ducks.actions.pageInquiries;
            const pagingState = ducks.selectors.pageInquiries(store.getState());
            if (pagingState.fulfilled) {
              store.dispatch(pageInquiries({ owner: user, page: pageState.page, pageSize: pageState.pageSize }));
            } else {
              await new Promise((resolve) => {
                store.dispatch(pageInquiries({ owner: user, page: pageState.page, pageSize: pageState.pageSize, meta: { resolve } }));
              });
            }
            break;
          }
          default:
        }
      },
    }),
  });
};
