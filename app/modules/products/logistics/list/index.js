import createPage from '../../utils/list/createPage';
import type, { Card, BriefCard, catalogGroups } from '../constants';
import * as ducks from './ducks';

export default createPage({ type, ducks, Card, BriefCard, catalogGroups, horizontal: true });
