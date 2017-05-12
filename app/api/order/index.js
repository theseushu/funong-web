import combineModules from '../utils/combineModules';
import * as create from './create';
import * as commit from './commit';
import * as search from './search';
import * as generateBill from './generateBill';
import { SLICE_NAME } from './constants';

const modules = { create, commit, search, generateBill };
// todo leave this line here
if (process.env.ADMIN) {} // eslint-disable-line

const combined = combineModules(modules, SLICE_NAME);
export default combined.default;
export const actions = combined.actions;
export const selectors = combined.selectors;
export const sagas = combined.sagas;
