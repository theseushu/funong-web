import { getAsyncInjectors } from 'utils/asyncInjectors';
import createWelcomePageRoute from 'modules/welcomePage/route';
import createMePageRoute from 'modules/mePage/route';
import createSupplyRoute from 'modules/supplyPage/route';
import createSuppliesRoute from 'modules/suppliesPage/route';
import createLogisticsRoute from 'modules/logisticsPage/route';
import createCartPageRoute from 'modules/cartPage/route';
import createProductPageRoute from 'modules/productPage/route';
import createTripsRoute from 'modules/tripsPage/route';
import createTripPageRoute from 'modules/tripPage/route';

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
    {
      path: '/',
      name: 'home',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          System.import('containers/HomePage'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([component]) => {
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    }, {
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
    createSuppliesRoute({ store, injectReducer, injectSagas, loadModule, errorLoading }),
    createSupplyRoute({ store, injectReducer, injectSagas, loadModule, errorLoading }),
    createLogisticsRoute({ store, injectReducer, injectSagas, loadModule, errorLoading }),
    createProductPageRoute({ store, injectReducer, injectSagas, loadModule, errorLoading }),
    createTripsRoute({ store, injectReducer, injectSagas, loadModule, errorLoading }),
    createTripPageRoute({ store, injectReducer, injectSagas, loadModule, errorLoading }),
    createCartPageRoute({ store, injectReducer, injectSagas, loadModule, errorLoading }),
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
