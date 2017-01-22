import _toPairs from 'lodash/toPairs';

export default ({ store, injectReducer, injectSagas, loadModule, errorLoading }) => { // eslint-disable-line
  const supplyRoute = {
    path: 'supply',
    name: 'supplyProducts',
    getComponent(nextState, cb) {
      const importModules = Promise.all([
        System.import('./supply'),
        System.import('./supply/ducks'),
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
    getComponent(nextState, cb) {
      const importModules = Promise.all([
        System.import('./index'),
        System.import('./ducks'),
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
