import { actions } from 'api/shop';
import { myShopSelector } from 'modules/data/ducks/selectors';
import createInfoRoute from './info/route';
import createProductsRoute from './products/route';

const fetchMine = actions.fetchMine;

export default ({ store, injectReducer, injectSagas, loadModule, errorLoading }) => {
  const infoRoute = createInfoRoute({ store, injectReducer, injectSagas, loadModule, errorLoading });
  return { // eslint-disable-line
    path: 'shop',
    name: 'myShop',
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
      createProductsRoute({ store, injectReducer, injectSagas, loadModule, errorLoading }),
    ],
  };
};
