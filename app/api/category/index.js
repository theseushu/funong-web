import combineModules from '../utils/combineModules';
import * as fetchCategories from './fetchCategories';
import * as fetch from './fetch';
import { SLICE_NAME } from './constants';

let modules = { fetch, fetchCategories };
if (process.env.ADMIN) {
  modules = { ...modules };
}

const combined = combineModules(modules, SLICE_NAME);
export default combined.default;
export const actions = combined.actions;
export const selectors = combined.selectors;
export const sagas = combined.sagas;

