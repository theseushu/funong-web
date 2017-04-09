import createPage from '../../utils/list/createPage';
import type, { disabled } from '../constants';
import * as ducks from './ducks';

export default createPage({ type, ducks, disabled });
