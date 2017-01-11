export default ({ store, injectReducer, injectSagas, loadModule, errorLoading }) => ({ // eslint-disable-line no-unused-vars
  path: '/prototype/login',
  name: 'login',
  getComponent(nextState, cb) {
    const importModules = Promise.all([
      System.import('./index'),
    ]);
    const renderRoute = loadModule(cb);
    importModules.then(([component]) => {
      renderRoute(component);
    });

    importModules.catch(errorLoading);
  },
});
