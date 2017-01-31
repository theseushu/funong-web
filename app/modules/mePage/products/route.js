import _toPairs from 'lodash/toPairs';
import { ensureProfile } from '../../../utils/routerUtils';
import { fetchSupplyProducts } from '../../api/fetchSupplyProducts';


export default ({ store, injectReducer, injectSagas, loadModule, errorLoading }) => { // eslint-disable-line
  const supplyRoute = {
    path: 'supply',
    name: 'supplyProducts',
    getComponent(nextState, cb) {
      const importModules = Promise.all([
        System.import('./supply'),
        System.import('./supply/ducks'),
        new Promise((resolve, reject) => {
          ensureProfile(store).then((currentUser) => {
            store.dispatch(fetchSupplyProducts({
              ownerId: currentUser.objectId,
              meta: {
                resolve,
                reject,
              },
            }));
          });
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
  };
  return { // eslint-disable-line
    path: 'products',
    name: 'products',
    indexRoute: { getComponent: supplyRoute.getComponent },
    childRoutes: [
      supplyRoute,
      {
        path: 'shop',
        name: 'shopProducts',
        getComponent(nextState, cb) {
          const importModules = Promise.all([
            System.import('./shop'),
            System.import('./shop/ducks'),
            ensureProfile(store),
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
      },
    ],
  };
};
