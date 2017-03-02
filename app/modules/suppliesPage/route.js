import _toPairs from 'lodash/toPairs';
import { actions } from 'api/species';
import { actions as categoryActions } from 'api/category';
import { queryToCriteria } from 'modules/common/criteria/utils';

const fetchSpecies = actions.fetchSpecies;
const fetchCategory = categoryActions.fetch;

export default ({ store, injectReducer, injectSagas, loadModule, errorLoading }) => ({ // eslint-disable-line no-unused-vars
  path: '/supplies',
  name: 'supplies',
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
      const { actions: { searchSupplyProducts, countSupplyProducts }, selectors } = ducks;
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
      store.dispatch(countSupplyProducts(countParams));
      const searchSupplyProductState = selectors.searchSupplyProducts(store.getState());
      // if the data has been fetched before, don't wait for the api response. otherwise, wait for it
      if (searchSupplyProductState && searchSupplyProductState.fulfilled) {
        store.dispatch(searchSupplyProducts(queryParams));
        resolve();
      } else {
        store.dispatch(searchSupplyProducts({
          ...queryParams,
          meta: {
            resolve,
            reject,
          },
        }));
      }
    }));
    if (query.category) { // we fetch species&category whether its been fetched before or not
      toFetch.push(new Promise((resolve, reject) => {
        store.dispatch(fetchSpecies({
          category: { objectId: query.category },
          meta: {
            resolve: (speciesArray) => {
              if (speciesArray.length > 0) { // if there's valid species, category will be fetch according to data relations
                resolve();
              } else {
                store.dispatch(fetchCategory({ // if there's no species, we'd have to fetch category directly
                  objectId: query.category,
                  meta: {
                    resolve,
                    reject,
                  },
                }));
              }
            },
            reject,
          },
        }));
      }));
    }
    await Promise.all(toFetch);

    renderRoute(component);
    importModules.catch(errorLoading);
  },
});
