import { actions } from 'api/species';
import { actions as categoryActions } from 'api/category';
import { queryToCriteria, criteriaToApiParams } from 'funong-common/lib/utils/criteriaUtils';
import { loadAsyncModules } from 'utils/routerUtils';

const fetchSpecies = actions.fetchSpecies;
const fetchCategory = categoryActions.fetch;

export default (path, name, componentPromise, ducksPromise) => ({ store, loadModule, errorLoading }) => ({
  path,
  name,
  getComponent: async (nextState, cb) => loadAsyncModules({
    store,
    loadModule,
    errorLoading,
    cb,
    routeName: name,
    componentPromise,
    ducksPromise,
    beforeRender: async (ducks) => {
      const { location: { query } } = nextState;
      const criteria = queryToCriteria(query);

      const toFetch = [];
      toFetch.push(new Promise((resolve, reject) => {
        const { actions: { page }, selectors } = ducks;
        const pageParams = criteriaToApiParams(criteria);
          // count
        const pageState = selectors.page(store.getState());
          // if the data has been fetched before, don't wait for the api response. otherwise, wait for it
        if (pageState && pageState.fulfilled) {
          store.dispatch(page(pageParams));
          resolve();
        } else {
          store.dispatch(page({
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
    },
  }),
});
