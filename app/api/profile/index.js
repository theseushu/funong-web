import combineModules from '../utils/combineModules';
import * as create from './create';
import * as update from './update';
import * as fetch from './fetch';
import { SLICE_NAME } from './constants';

let modules = { create, update, fetch };
if (process.env.ADMIN) {
  const countAll = require('./admin/countAll'); // eslint-disable-line global-require
  const fetchUsers = require('./admin/fetchUsers'); // eslint-disable-line global-require
  const fetchAdmins = require('./admin/fetchAdmins'); // eslint-disable-line global-require
  modules = { ...modules, countAll, fetchAdmins, fetchUsers };
}

const combined = combineModules(modules, SLICE_NAME); export default combined.default; export const actions = combined.actions; export const selectors = combined.selectors; export const sagas = combined.sagas;
