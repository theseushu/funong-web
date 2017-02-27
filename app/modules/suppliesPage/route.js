import _toPairs from 'lodash/toPairs';
import { actions } from 'api/species';
import { actions as categoryActions } from 'api/category';

const fetchSpecies = actions.fetchSpecies;
const fetchCategory = categoryActions.fetch;

export default ({ store, injectReducer, injectSagas, loadModule, errorLoading }) => ({ // eslint-disable-line no-unused-vars
  path: '/supplies',
  name: 'supplies',
  getComponent: async (nextState, cb) => {
    // TODO fetch product
    const { location: { query: { category, species, provinces } } } = nextState; // eslint-disable-line no-unused-vars
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
    const toFetch = [];
    toFetch.push(new Promise((resolve, reject) => {
      const { actions: { searchSupplyProducts }, selectors } = ducks;
      const searchSupplyProductState = selectors.searchSupplyProducts(store.getState());
      // if the data has been fetched before, don't wait for the api response. otherwise, wait for it
      if (searchSupplyProductState && searchSupplyProductState.fulfilled) {
        store.dispatch(searchSupplyProducts({
        }));
        resolve();
      } else {
        store.dispatch(searchSupplyProducts({
          meta: {
            resolve,
            reject,
          },
        }));
      }
    }));
    if (category) { // we fetch species&category whether its been fetched before or not
      toFetch.push(new Promise((resolve, reject) => {
        store.dispatch(fetchSpecies({
          category: { objectId: category },
          meta: {
            resolve: (speciesArray) => {
              if (speciesArray.length > 0) { // if there's valid species, category will be fetch according to data relations
                resolve();
              } else {
                store.dispatch(fetchCategory({ // if there's no species, we'd have to fetch category directly
                  objectId: category,
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

    // set criteria according to url params
    const { setCriteria } = ducks.actions;
    const criteria = {};
    if (category) {
      criteria.category = category; // _find(categoriesSelector(store.getState()), (c) => c.objectId === category);
    }
    if (species) {
      criteria.species = typeof species === 'string' ? [species] : species; // _find(speciesSelector(store.getState()), (s) => s.objectId === species);
    }
    if (provinces) {
      criteria.provinces = typeof provinces === 'string' ? [provinces] : provinces; // _find(speciesSelector(store.getState()), (s) => s.objectId === species);
    }
    store.dispatch(setCriteria(criteria));

    renderRoute(component);
    importModules.catch(errorLoading);
  },
});
