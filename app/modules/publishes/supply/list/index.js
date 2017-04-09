import createPage from '../../utils/list/createPage';
import type, { catalogGroups } from '../constants';
import * as ducks from './ducks';

export default createPage({ type, ducks, catalogGroups });
