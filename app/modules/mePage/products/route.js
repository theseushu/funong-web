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
    ],
  };
};
