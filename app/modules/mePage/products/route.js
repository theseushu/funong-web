import _toPairs from 'lodash/toPairs';
import { ensureProfile } from '../../../utils/routerUtils';
import createSupplyRoute from './supply/route';
import createLogisticsRoute from './logistics/route';

export default ({ store, injectReducer, injectSagas, loadModule, errorLoading }) => {
  const supplyRoute = createSupplyRoute({ store, injectReducer, injectSagas, loadModule, errorLoading });
  return { // eslint-disable-line
    path: 'products',
    name: 'products',
    indexRoute: { getComponent: supplyRoute.getComponent },
    childRoutes: [
      supplyRoute,
      createLogisticsRoute({ store, injectReducer, injectSagas, loadModule, errorLoading }),
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
