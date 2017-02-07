import _find from 'lodash/find';
import { certsSelector } from 'modules/data/ducks/selectors';
import { certTypes } from 'appConstants';

export const personal = (state) => _find(certsSelector(state), (c) => c.type === certTypes.personal);
export const company = (state) => _find(certsSelector(state), (c) => c.type === certTypes.company);
