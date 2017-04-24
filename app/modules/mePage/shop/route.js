import { actions } from 'api/shop';
import { routes } from 'funong-common/lib/appConstants';
import { myShopSelector } from 'modules/data/ducks/selectors';
import createInfoRoute from './info/route';
import createProductRoute from './product/route';
import createFlashSalesRoute from './flashSale/route';

const fetchMine = actions.fetchMine;

export default ({ store, injectReducer, injectSagas, loadModule, errorLoading }) => {
  const infoRoute = createInfoRoute({ store, injectReducer, injectSagas, loadModule, errorLoading });
  return { // eslint-disable-line
    path: routes.page_my_shop,
    name: 'page_my_shop',
    onEnter: async ({ location }, replace, callback) => {
      try {
        const myShop = myShopSelector(store.getState());
        if (myShop) {
          store.dispatch(fetchMine());
          callback();
        } else {
          store.dispatch(fetchMine({
            meta: {
              resolve: () => {
                callback();
              },
              reject: (err) => {
                throw err;
              },
            },
          }));
        }
      } catch (err) {
        replace('/error');
        callback();
      }
    },
    indexRoute: { getComponent: infoRoute.getComponent },
    childRoutes: [
      infoRoute,
      createProductRoute({ store, injectReducer, injectSagas, loadModule, errorLoading }),
      createFlashSalesRoute({ store, injectReducer, injectSagas, loadModule, errorLoading }),
    ],
  };
};
