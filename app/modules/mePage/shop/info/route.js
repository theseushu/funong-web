import _toPairs from 'lodash/toPairs';
import { ensureProfile } from 'utils/routerUtils';

export default ({ injectReducer, loadModule, errorLoading }) => ({
  path: 'info',
  name: 'myShopInfo',
  getComponent: async (nextState, cb) => {
    const importModules = Promise.all([
      System.import('./index'),
      System.import('./ducks'),
    ]);
    const renderRoute = loadModule(cb);
    const [component, ducks] = await importModules;
    _toPairs(ducks.default).forEach((pair) => {
      injectReducer(pair[0], pair[1]);
    });
    renderRoute(component);
    importModules.catch(errorLoading);
  },
});
