import combineModules from '../utils/combineModules';
import * as fetchCategories from './fetchCategories';
import * as fetch from './fetch';
import { SLICE_NAME } from './constants';

let modules = { fetch, fetchCategories };
if (process.env.ADMIN) {
  modules = { ...modules };
}

module.exports = combineModules(modules, SLICE_NAME);
