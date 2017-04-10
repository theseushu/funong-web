import _toPairs from 'lodash/toPairs';
// import { currentUserSelector } from 'modules/data/ducks/selectors';

export default ({ store, injectReducer, injectSagas, loadModule, errorLoading }) => {  // eslint-disable-line no-unused-vars
  let injected = false;
  return ({
    path: '/',
    name: 'home',
    onEnter: async ({ location }, replace, callback) => {
      replace('/products');
      callback();
    },
    getComponent: async (nextState, cb) => {
      try {
        const importModules = Promise.all([
          System.import('./index'),
          System.import('./ducks'),
        ]);

        const renderRoute = loadModule(cb);
        const [component, ducks] = await importModules;
        if (!injected) {
          _toPairs(ducks.default).forEach((pair) => {
            injectReducer(pair[0], pair[1]);
          });
          if (ducks.sagas && ducks.sagas.length > 0) {
            injectSagas(ducks.sagas);
          }
          injected = true;
        }
        renderRoute(component);
      } catch (err) {
        errorLoading(err);
      }
    },
  });
};
