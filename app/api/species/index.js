import combineModules from '../utils/combineModules';
import * as fetchSpecies from './fetchSpecies';
import * as create from './create';
import { SLICE_NAME } from './constants';

let modules = { create, fetchSpecies };
if (process.env.ADMIN) {
  modules = { ...modules };
}

const combined = combineModules(modules, SLICE_NAME); export default combined.default; export const actions = combined.actions; export const selectors = combined.selectors; export const sagas = combined.sagas;
