import _toPairs from 'lodash/toPairs';
import { actions } from 'api/logisticsProduct';
import { ensureProfile } from 'utils/routerUtils';

const fetchLogisticsProduct = actions.fetch;

export default ({ store, injectReducer, injectSagas, loadModule, errorLoading }) => ({ // eslint-disable-line no-unused-vars
  path: '/logistics/:id',
  name: 'newLogistics',
  getComponent(nextState, cb) {
    // TODO fetch product
    const { params: { id }, location: { query } } = nextState;
    const importModules = Promise.all([
      System.import('./index'),
      System.import('./ducks'),
      new Promise((resolve, reject) => {
        if (id === 'new' || query.edit) {
          ensureProfile(store).then(resolve);
        } else {
          store.dispatch(fetchLogisticsProduct({
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
