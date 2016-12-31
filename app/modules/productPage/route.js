import _toPairs from 'lodash/toPairs';
import _find from 'lodash/find';
import { fetchProduct } from '../api/fetchProduct';
import { productsSelector } from '../data/ducks/selectors';
export default ({ store, injectReducer, injectSagas, loadModule, errorLoading }) => ({ // eslint-disable-line no-unused-vars
  path: '/product/:id',
  name: 'product',
  getComponent(nextState, cb) {
    // TODO fetch product
    const { params: { id } } = nextState; // eslint-disable-line no-unused-vars
    const importModules = Promise.all([
      System.import('./index'),
      System.import('./ducks'),
      new Promise((resolve, reject) => {
        const products = productsSelector(store.getState());
        const product = _find(products, (prod) => prod.objectId === id);
        if (product) {
          resolve();
        } else {
          store.dispatch(fetchProduct({ objectId: id, meta: { resolve, reject } }));
        }
      }),
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
