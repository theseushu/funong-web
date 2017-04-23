import type from '../constants';
import createDucks from '../../utils/page/createDucks';

const ducks = createDucks(type);

export default ducks.default;
export const actions = ducks.actions;
export const selectors = ducks.selectors;
export const sagas = ducks.sagas;
