import { getAsyncInjectors } from 'utils/asyncInjectors';
import App from 'containers/App';
import { requireForm } from 'utils/routerUtils';
import createHomePageRoute from 'modules/homePage/route';
import createWelcomePageRoute from 'modules/welcomePage/route';
import createMePageRoute from 'modules/mePage/route';
import createUserRoute from 'modules/userPage/route';
import createSupplyRoute from 'modules/publishes/supply/page/route';
import createSuppliesRoute from 'modules/publishes/supply/list/route';
import createLogisticsRoute from 'modules/publishes/logistics/page/route';
import createLogisticsListRoute from 'modules/publishes/logistics/list/route';
import createTripRoute from 'modules/publishes/trip/page/route';
import createTripsRoute from 'modules/publishes/trip/list/route';
import createProductRoute from 'modules/publishes/product/page/route';
import createProductsRoute from 'modules/publishes/product/list/route';
import createOrderPageRoute from 'modules/orderPage/route';
import createInquiryRoute from 'modules/publishes/inquiry/page/route';
import createInquiriesRoute from 'modules/publishes/inquiry/list/route';
import createFlashSaleRoute from 'modules/publishes/flashSale/page/route';
import createFlashSalesRoute from 'modules/publishes/flashSale/list/route';
import createOfficialSuppliesRoute from 'modules/publishes/officialSupply/list/route';

const errorLoading = (err) => {
  console.error('Dynamic page loading failed', err); // eslint-disable-line no-console
};

const loadModule = (cb) => (componentModule) => {
  cb(null, componentModule.default);
};

function createChildRoutes(store) {
  // Create reusable async injectors using getAsyncInjectors factory
  const { injectReducer, injectSagas } = getAsyncInjectors(store); // eslint-disable-line no-unused-vars
  console.log(createOfficialSuppliesRoute({ store, injectReducer, injectSagas, loadModule, errorLoading }));
  return [
    createHomePageRoute({ store, injectReducer, injectSagas, loadModule, errorLoading }),
    {
      path: '/login',
      name: 'singupOrLogin',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          System.import('modules/signupOrLoginPage'),
          requireForm(store),
        ]);
        const renderRoute = loadModule(cb);
        importModules.then(([component]) => {
          renderRoute(component);
        });
        importModules.catch(errorLoading);
      },
    }, {
      path: '/signup',
      name: 'singupOrLogin',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          System.import('modules/signupOrLoginPage'),
          requireForm(store),
        ]);
        const renderRoute = loadModule(cb);
        importModules.then(([component]) => {
          renderRoute(component);
        });
        importModules.catch(errorLoading);
      },
    },
    createWelcomePageRoute({ store, injectReducer, injectSagas, loadModule, errorLoading }),
    createMePageRoute({ store, injectReducer, injectSagas, loadModule, errorLoading }),
    createUserRoute({ store, injectReducer, injectSagas, loadModule, errorLoading }),
    createSuppliesRoute({ store, injectReducer, injectSagas, loadModule, errorLoading }),
    createSupplyRoute({ store, injectReducer, injectSagas, loadModule, errorLoading }),
    createLogisticsRoute({ store, injectReducer, injectSagas, loadModule, errorLoading }),
    createLogisticsListRoute({ store, injectReducer, injectSagas, loadModule, errorLoading }),
    createTripRoute({ store, injectReducer, injectSagas, loadModule, errorLoading }),
    createTripsRoute({ store, injectReducer, injectSagas, loadModule, errorLoading }),
    createProductRoute({ store, injectReducer, injectSagas, loadModule, errorLoading }),
    createProductsRoute({ store, injectReducer, injectSagas, loadModule, errorLoading }),
    createOrderPageRoute({ store, injectReducer, injectSagas, loadModule, errorLoading }),
    createInquiryRoute({ store, injectReducer, injectSagas, loadModule, errorLoading }),
    createInquiriesRoute({ store, injectReducer, injectSagas, loadModule, errorLoading }),
    createFlashSaleRoute({ store, injectReducer, injectSagas, loadModule, errorLoading }),
    createFlashSalesRoute({ store, injectReducer, injectSagas, loadModule, errorLoading }),
    createOfficialSuppliesRoute({ store, injectReducer, injectSagas, loadModule, errorLoading }),
    {
      path: '*',
      name: 'notfound',
      getComponent(nextState, cb) {
        System.import('containers/NotFoundPage')
          .then(loadModule(cb))
          .catch(errorLoading);
      },
    },
  ];
}
export default function createRootRoute(store) {
  return {
    component: App,
    childRoutes: createChildRoutes(store),
  };
}
