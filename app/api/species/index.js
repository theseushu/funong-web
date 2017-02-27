import combineModules from '../utils/combineModules';
import * as fetchSpecies from './fetchSpecies';
import * as create from './create';
import { SLICE_NAME } from './constants';

let modules = { create, fetchSpecies };
if (process.env.ADMIN) {
  modules = { ...modules };
}

module.exports = combineModules(modules, SLICE_NAME);
