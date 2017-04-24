import _toPairs from 'lodash/toPairs';
import { actions } from 'api/species';
import { actions as categoryActions } from 'api/category';
import { queryToCriteria, criteriaToApiParams } from 'funong-common/lib/utils/criteriaUtils';

const fetchSpecies = actions.fetchSpecies;
const fetchCategory = categoryActions.fetch;

export default (path, name, componentAndDucks) => ({ store, injectReducer, injectSagas, loadModule, errorLoading }) => {
  let injected = false;
  return ({
    path,
    name,
    getComponent: async (nextState, cb) => {
      // TODO fetch product
      const { location: { query } } = nextState; // eslint-disable-line no-unused-vars

      const renderRoute = loadModule(cb);
      const [component, ducks] = await componentAndDucks;
      if (!injected) {
        _toPairs(ducks.default).forEach((pair) => {
          injectReducer(pair[0], pair[1]);
        });
        injectSagas(ducks.sagas);
        injected = true;
      }

      // set criteria according to url params
      const criteria = queryToCriteria(query);

      const toFetch = [];
      toFetch.push(new Promise((resolve, reject) => {
        const { actions: { pageProducts }, selectors } = ducks;
        const pageParams = criteriaToApiParams(criteria);
        // count
        const pageProductsState = selectors.pageProducts(store.getState());
        // if the data has been fetched before, don't wait for the api response. otherwise, wait for it
        if (pageProductsState && pageProductsState.fulfilled) {
          store.dispatch(pageProducts(pageParams));
          resolve();
        } else {
          store.dispatch(pageProducts({
            ...pageParams,
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
      componentAndDucks.catch(errorLoading);
    },
  });
};
