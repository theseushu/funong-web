import { createSelector } from 'reselect';
import rootSelector from './rootSelector';

export default ({ slice }) => createSelector(rootSelector, (api) => ({ ...api[slice] }));
