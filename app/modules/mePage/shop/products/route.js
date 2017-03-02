import _toPairs from 'lodash/toPairs';
import { myShopSelector } from 'modules/data/ducks/selectors';
import { actions, selectors } from 'api/shopProduct';
import { generateKey } from 'utils/objectUtils';
import { queryToSearch } from './queryUtils';

const search = actions.search;
const searchSelector = selectors.search;

export default ({ store, injectReducer, injectSagas, loadModule, errorLoading }) => ({
  path: 'products',
  name: 'myShopProducts',
  onEnter: async ({ location: { query } }, replace, proceed) => {
    const myShop = myShopSelector(store.getState());
    const searchParams = queryToSearch({ shop: { objectId: myShop.objectId }, ...query });
    const storeKey = generateKey(searchParams);
    const searchState = searchSelector(store.getState())[storeKey];
    if (searchState && searchState.fulfilled) {
      store.dispatch(search({ ...searchParams, shop: { objectId: myShop.objectId }, meta: { storeKey } }));
      proceed();
    } else {
      store.dispatch(search({
        ...searchParams,
        shop: { objectId: myShop.objectId },
        meta: {
          storeKey,
          resolve: proceed,
          reject: (err) => {
            // todo prompt error to user
            console.log(err); // eslint-disable-line
            replace('/error');
            proceed();
          },
        },
      }));
    }
  },
  getComponent: async ({ location: { query } }, cb) => {
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
      if (ducks.sagas) {
        injectSagas(ducks.sagas);
      }
    }
    renderRoute(component);
    importModules.catch(errorLoading);
  },
});
