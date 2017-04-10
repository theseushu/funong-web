import createRouteCreator from '../../utils/page/createRouteCreator';
import { pageRoute, actions, shop } from '../constants';

export default createRouteCreator(
  pageRoute.path,
  pageRoute.name,
  actions,
  Promise.all([
    System.import('./index'),
    System.import('./ducks'),
  ]),
  shop,
);
