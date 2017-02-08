import _toPairs from 'lodash/toPairs';
import { ensureProfile } from 'utils/routerUtils';
import { actions } from 'api/supplyProduct';

const fetchSupplyProduct = actions.fetch;

const fetchData = async (store, id, query) => {
  if (id === 'new' || query.edit) {
    await ensureProfile(store);
  }
  await new Promise((resolve, reject) => {
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
  });
};

export default ({ store, injectReducer, injectSagas, loadModule, errorLoading }) => ({ // eslint-disable-line no-unused-vars
  path: '/supply/:id',
  name: 'supply',
  getComponent(nextState, cb) {
    // TODO fetch product
    const { params: { id }, location: { query } } = nextState;
    const importModules = Promise.all([
      System.import('./index'),
      System.import('./ducks'),
      fetchData(store, id, query),
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
