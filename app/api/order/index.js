import combineModules from '../utils/combineModules';
import * as create from './create';
import * as update from './update';
import * as confirm from './confirm';
import * as search from './search';
import { SLICE_NAME } from './constants';

const modules = { create, update, confirm, search };
// todo leave this line here
if (process.env.ADMIN) {} // eslint-disable-line

module.exports = combineModules(modules, SLICE_NAME);
