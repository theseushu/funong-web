import { loadAsyncModules } from 'utils/routerUtils';
import { routes } from 'funong-common/lib/appConstants';

export default ({ store, loadModule, errorLoading }) =>
   ({
     path: routes.page_home,
     name: 'page_home',
     onEnter: async ({ location }, replace, callback) => {
       callback();
     },
     getComponent: async (nextState, cb) => loadAsyncModules({
       store,
       loadModule,
       errorLoading,
       cb,
       routeName: 'page_home',
       componentPromise: System.import('./index'),
       ducksPromise: System.import('./ducks'),
       beforeRender: async (ducks) => {
         const recommend = ducks.actions.recommend;
         const selector = ducks.selectors.recommend;
         if (!selector(store.getState()).fulfilled) {
           await new Promise((resolve) => store.dispatch(recommend({ meta: {
             resolve,
           } })));
         }
       },
     }),
   });
