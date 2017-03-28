import createSupplyRoute from './supply/route';
import createLogisticsRoute from './logistics/route';
import createTripRoute from './trip/route';
import createInquiryRoute from './inquiry/route';

export default ({ store, injectReducer, injectSagas, loadModule, errorLoading }) => {
  const supplyRoute = createSupplyRoute({ store, injectReducer, injectSagas, loadModule, errorLoading });
  return { // eslint-disable-line
    path: 'published',
    name: 'published',
    indexRoute: { getComponent: supplyRoute.getComponent },
    childRoutes: [
      supplyRoute,
      createLogisticsRoute({ store, injectReducer, injectSagas, loadModule, errorLoading }),
      createTripRoute({ store, injectReducer, injectSagas, loadModule, errorLoading }),
      createInquiryRoute({ store, injectReducer, injectSagas, loadModule, errorLoading }),
    ],
  };
};
