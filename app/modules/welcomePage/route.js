import { currentUserSelector } from 'modules/data/ducks/selectors';
import { actions } from 'api/profile';
import { loadAsyncModules } from 'utils/routerUtils';
import nextRoute from './nextRoute';

const fetchProfile = actions.fetch;
const NAME = 'welcome';

export default ({ store, injectReducer, injectSagas, loadModule, errorLoading }) => ({ // eslint-disable-line no-unused-vars
  path: '/welcome',
  name: NAME,
  onEnter: async (nextState, replace, callback) => {
    const proceed = (user) => {
      if (user.type) {
        replace(nextRoute(user.type));
        callback();
      } else {
        callback();
      }
    };
    const currentUser = currentUserSelector(store.getState());
    if (!currentUser) {
      store.dispatch(fetchProfile({ meta: { resolve: proceed, errorLoading } }));
    } else {
      proceed(currentUser);
    }
  },
  getComponent: async (nextState, cb) => {
    await loadAsyncModules({
      store,
      loadModule,
      errorLoading,
      cb,
      routeName: NAME,
      componentPromise: System.import('./index'),
      ducksPromise: System.import('./ducks'),
    }
    );
  },
});
