import createPage from '../../utils/list/createPage';
import type, { catalogGroups, noRecommend } from '../constants';
import * as ducks from './ducks';

export default createPage({ type, ducks, catalogGroups, noRecommend });
