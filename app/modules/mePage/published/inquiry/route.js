import { path, name } from './constants';
import createRouteCreator from '../utils/createRouteCreator';

export default createRouteCreator(
  path,
  name,
  System.import('./index'),
  System.import('./ducks'),
);
