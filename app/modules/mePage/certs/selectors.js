import _find from 'lodash/find';
import { certsSelector } from '../../data/ducks/selectors';
import { certTypes } from '../../../constants';

export const personal = (state) => _find(certsSelector(state), (c) => c.type === certTypes.personal);
export const selfEmployed = (state) => _find(certsSelector(state), (c) => c.type === certTypes.selfEmployed);
export const company = (state) => _find(certsSelector(state), (c) => c.type === certTypes.company);
