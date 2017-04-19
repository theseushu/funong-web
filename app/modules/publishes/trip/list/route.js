import createRouteCreator from '../../utils/list/createRouteCreator';
import { listRoute } from '../constants';

export default createRouteCreator(
  listRoute.path,
  listRoute.name,
  System.import('./index'),
  System.import('./ducks'),
);
