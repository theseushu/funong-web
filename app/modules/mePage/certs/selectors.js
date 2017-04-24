import _find from 'lodash/find';
import { certsSelector } from 'modules/data/ducks/selectors';
import { certTypes } from 'funong-common/lib/appConstants';

export const personal = (state) => _find(certsSelector(state), (c) => c.type === certTypes.personal.value);
export const company = (state) => _find(certsSelector(state), (c) => c.type === certTypes.company.value);
export const expert = (state) => _find(certsSelector(state), (c) => c.type === certTypes.expert.value);
export const products = (state) => certsSelector(state).filter((c) => c.type === certTypes.expert.value);
