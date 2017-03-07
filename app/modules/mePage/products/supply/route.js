import { path, name } from './constants';
import createRouteCreator from '../utils/createRouteCreator';

export default createRouteCreator(
  path,
  name,
  Promise.all([
    System.import('./index'),
    System.import('./ducks'),
  ]),
);
