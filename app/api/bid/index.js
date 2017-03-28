import combineModules from '../utils/combineModules';
import * as create from './create';
import * as update from './update';
import * as withdraw from './withdraw';
import * as page from './page';
import { SLICE_NAME } from './constants';

let modules = { create, update, withdraw, page };
if (process.env.ADMIN) {
  modules = { ...modules };
}

module.exports = combineModules(modules, SLICE_NAME);
