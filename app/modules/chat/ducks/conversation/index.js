import combineModules from 'api/utils/combineModules';
import * as create from './create';
import * as markAsRead from './markAsRead';
import * as quit from './quit';
import * as loadRecent from './loadRecent';
import { SLICE_NAME } from './constants';

const modules = { create, quit, markAsRead, loadRecent };
// todo leave this line here
if (process.env.ADMIN) {} // eslint-disable-line

const combined = combineModules(modules, SLICE_NAME); export default combined.default; export const actions = combined.actions; export const selectors = combined.selectors; export const sagas = combined.sagas;
