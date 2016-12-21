import _toPairs from 'lodash/toPairs';
export default ({ store, injectReducer, injectSagas, loadModule, errorLoading }) => ({ // eslint-disable-line no-unused-vars
  path: '/product/:id',
  name: 'newProduct',
  getComponent(nextState, cb) {
    // TODO fetch product
    const { params: { id } } = nextState; // eslint-disable-line no-unused-vars
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
});
