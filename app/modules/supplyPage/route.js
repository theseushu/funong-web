import _toPairs from 'lodash/toPairs';
import { ensureProfile } from 'utils/routerUtils';
import { actions } from 'api/supplyProduct';

const fetchSupplyProduct = actions.fetch;

export default ({ store, injectReducer, injectSagas, loadModule, errorLoading }) => ({ // eslint-disable-line no-unused-vars
  path: '/supply/:id',
  name: 'supply',
  getComponent(nextState, cb) {
    // TODO fetch product
    const { params: { id } } = nextState; // eslint-disable-line no-unused-vars
    const importModules = Promise.all([
      System.import('./index'),
      System.import('./ducks'),
      new Promise((resolve, reject) => {
        ensureProfile(store).then(() => {
          if (id === 'new') {
            resolve();
          } else {
            store.dispatch(fetchSupplyProduct({
              objectId: id,
              meta: {
                resolve,
                reject: (err) => {
                  console.log(err); // eslint-disable-line
                  reject();
                  // todo deal with error
                },
              },
            }));
          }
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