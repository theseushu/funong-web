import combineModules from '../utils/combineModules';
import * as create from './create';
import * as update from './update';
import * as fetch from './fetch';
import * as remove from './remove';
import * as search from './search';
import { SLICE_NAME } from './constants';

let modules = { create, update, fetch, remove, search };
if (process.env.ADMIN) {
  modules = { ...modules };
}

const combined = combineModules(modules, SLICE_NAME); export default combined.default; export const actions = combined.actions; export const selectors = combined.selectors; export const sagas = combined.sagas;
