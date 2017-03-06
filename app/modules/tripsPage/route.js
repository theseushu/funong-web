import _toPairs from 'lodash/toPairs';
import { queryToCriteria } from 'modules/common/criteria/utils';

export default ({ store, injectReducer, injectSagas, loadModule, errorLoading }) => ({ // eslint-disable-line no-unused-vars
  path: '/trips',
  name: 'trips',
  getComponent: async (nextState, cb) => {
    // TODO fetch product
    const { location: { query } } = nextState; // eslint-disable-line no-unused-vars
    const importModules = Promise.all([
      System.import('./index'),
      System.import('./ducks'),
    ]);

    const renderRoute = loadModule(cb);
    const [component, ducks] = await importModules;
    if (!this.injected) {
      this.injected = true;
      _toPairs(ducks.default).forEach((pair) => {
        injectReducer(pair[0], pair[1]);
      });
      injectSagas(ducks.sagas);
    }

    // set criteria according to url params
    const { setCriteria } = ducks.actions;
    const criteria = queryToCriteria(query);
    store.dispatch(setCriteria(criteria));

    const toFetch = [];
    toFetch.push(new Promise((resolve, reject) => {
      const { actions: { searchTripProducts, countTripProducts }, selectors } = ducks;
      const countParams = {
        category: criteria.category ? { objectId: criteria.category } : undefined,
        species: criteria.species ? criteria.species.map((s) => ({ objectId: s })) : undefined,
        location: { address: { provinces: criteria.provinces } },
        sort: criteria.sort,
      };
      const queryParams = {
        ...countParams,
        page: criteria.page ? criteria.page : undefined,
        pageSize: criteria.pageSize ? criteria.pageSize : undefined,
      };
      // count
      store.dispatch(countTripProducts(countParams));
      const searchTripProductState = selectors.searchTripProducts(store.getState());
      // if the data has been fetched before, don't wait for the api response. otherwise, wait for it
      if (searchTripProductState && searchTripProductState.fulfilled) {
        store.dispatch(searchTripProducts(queryParams));
        resolve();
      } else {
        store.dispatch(searchTripProducts({
          ...queryParams,
          meta: {
            resolve,
            reject,
          },
        }));
      }
    }));
    await Promise.all(toFetch);
    renderRoute(component);
    importModules.catch(errorLoading);
  },
});
