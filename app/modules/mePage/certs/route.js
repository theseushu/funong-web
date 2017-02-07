import _toPairs from 'lodash/toPairs';
import { actions } from 'api/cert';
import { ensureProfile } from 'utils/routerUtils';

const searchMine = actions.searchMine;

export default ({ store, injectReducer, injectSagas, loadModule, errorLoading }) => ({ // eslint-disable-line
  path: 'certs',
  name: 'certs',
  getComponent(nextState, cb) {
    const importModules = Promise.all([
      System.import('./index'),
      System.import('./ducks'),
      new Promise((resolve, reject) => {
        ensureProfile(store).then(() => {
          store.dispatch(searchMine({
            meta: {
              resolve,
              reject,
            },
          }));
        });
      }),
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
