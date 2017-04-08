import { getAsyncInjectors } from 'utils/asyncInjectors';
import createHomePageRoute from 'modules/homePage/route';
import createWelcomePageRoute from 'modules/welcomePage/route';
import createMePageRoute from 'modules/mePage/route';
import createUserRoute from 'modules/userPage/route';
import createSupplyRoute from 'modules/products/supply/page/route';
import createSuppliesRoute from 'modules/products/supply/list/route';
import createLogisticsRoute from 'modules/products/logistics/page/route';
import createLogisticsListRoute from 'modules/products/logistics/list/route';
import createTripRoute from 'modules/products/trip/page/route';
import createTripsRoute from 'modules/products/trip/list/route';
import createShopProductRoute from 'modules/products/shop/page/route';
import createShopProductsRoute from 'modules/products/shop/list/route';
import createOrderPageRoute from 'modules/orderPage/route';
import createInquiryRoute from 'modules/inquiry/page/route';
import createInquiriesRoute from 'modules/inquiry/list/route';

const errorLoading = (err) => {
  console.error('Dynamic page loading failed', err); // eslint-disable-line no-console
};

const loadModule = (cb) => (componentModule) => {
  cb(null, componentModule.default);
};

export default function createRoutes(store) {
  // Create reusable async injectors using getAsyncInjectors factory
  const { injectReducer, injectSagas } = getAsyncInjectors(store); // eslint-disable-line no-unused-vars

  return [
    createHomePageRoute({ store, injectReducer, injectSagas, loadModule, errorLoading }),
    {
      path: '/login',
      name: 'singupOrLogin',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          System.import('modules/signupOrLoginPage'),
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
    createShopProductRoute({ store, injectReducer, injectSagas, loadModule, errorLoading }),
    createShopProductsRoute({ store, injectReducer, injectSagas, loadModule, errorLoading }),
    createOrderPageRoute({ store, injectReducer, injectSagas, loadModule, errorLoading }),
    createInquiryRoute({ store, injectReducer, injectSagas, loadModule, errorLoading }),
    createInquiriesRoute({ store, injectReducer, injectSagas, loadModule, errorLoading }),
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
