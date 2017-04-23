import { SLICE_NAME, apiName, setData, selectFromData } from './constants';
import createDucks from '../utils/createDucks';

const ducks = createDucks(SLICE_NAME, apiName, setData, selectFromData);

export default ducks.default;
export const actions = ducks.actions;
export const selectors = ducks.selectors;
export const sagas = ducks.sagas;
