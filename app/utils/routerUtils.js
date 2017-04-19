import { injectAsyncModule } from 'utils/asyncInjectors';
import { currentUserSelector, myShopSelector } from 'modules/data/ducks/selectors';
import { actions } from 'api/profile';
import { actions as shopActions } from 'api/shop';

const debug = require('debug')('funongweb:routerUtils');

export const loadAsyncModules = async ({ store, loadModule, errorLoading, cb, routeName, componentPromise, ducksPromise, otherPromises = [], beforeRender }) => {
  if (process.env.NODE_ENV !== 'production') {
    if ((typeof loadModule !== 'function')
      || (typeof errorLoading !== 'function')
      || !cb
      || (typeof routeName !== 'string')
      || (!componentPromise || typeof componentPromise.then !== 'function')
      || (ducksPromise && typeof ducksPromise.then !== 'function')
      || (beforeRender && typeof beforeRender !== 'function')
    ) {
      debug('wrong arguments!');
    }
  }
  try {
    const importModules = Promise.all(ducksPromise ? [
      componentPromise,
      ducksPromise,
      ...otherPromises,
    ] : [
      componentPromise,
      ...otherPromises,
    ]);
    const renderRoute = loadModule(cb);
    const [component, ...other] = await importModules;
    const ducks = ducksPromise ? other[0] : null;
    if (ducks) {
      injectAsyncModule(store, routeName, ducks.default, ducks.sagas);
    }
    if (typeof beforeRender === 'function') {
      beforeRender(...other);
    }
    renderRoute(component);
  } catch (err) {
    errorLoading(err);
  }
};

const fetchProfile = actions.fetch;
const fetchMyShop = shopActions.fetchMine;

export const requireAuth = async (store) => {
  const result = { login: false };
  try {
    let currentUser = currentUserSelector(store.getState());
    // if currentUser's not been fetched, fetch it before continue
    // if it's fetched already, don't wait for the result
    if (!currentUser) {
      await new Promise((resolve, reject) => {
        store.dispatch(fetchProfile({ meta: { resolve, reject } }));
      });
    }
    currentUser = currentUserSelector(store.getState());
    if (currentUser) {
      result.login = true;
    }
    return result;
  } catch (err) {
    return result;
  }
};

export const requireShop = async (store) => {
  const result = await requireAuth(store);
  if (!result.login) {
    return { login: false, shop: false };
  }
  try {
    let shop = myShopSelector(store.getState());
    // if currentUser's not been fetched, fetch it before continue
    // if it's fetched already, don't wait for the result
    if (!shop) {
      await new Promise((resolve, reject) => {
        store.dispatch(fetchMyShop({ meta: { resolve, reject } }));
      });
    }
    shop = myShopSelector(store.getState());
    if (shop) {
      return { login: true, shop: true };
    }
    return { login: true, shop: false };
  } catch (err) {
    return result;
  }
};


const FormModuleName = 'form';
export const requireForm = async (store) => {
  const reduxForm = await System.import('redux-form');
  const reducer = reduxForm.reducer;
  injectAsyncModule(store, FormModuleName, { [FormModuleName]: reducer });
};

export const error = (err, replace) => {
  debug(err);
  // todo deal with error
  replace('/error');
};
