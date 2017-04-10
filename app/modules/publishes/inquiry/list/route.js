import createRouteCreator from '../../utils/list/createRouteCreator';
import { listRoute } from '../constants';

export default createRouteCreator(
  listRoute.path,
  listRoute.name,
  Promise.all([
    System.import('./index'),
    System.import('./ducks'),
  ]),
);
