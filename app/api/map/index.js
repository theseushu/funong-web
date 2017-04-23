import combineModules from '../utils/combineModules';
import * as init from './init';
import * as destroy from './destroy';
import * as center from './center';
import * as getCurrentLocation from './getCurrentLocation';
import { SLICE_NAME } from './constants';

const modules = { init, destroy, center, getCurrentLocation };

const combined = combineModules(modules, SLICE_NAME); export default combined.default; export const actions = combined.actions; export const selectors = combined.selectors; export const sagas = combined.sagas;
