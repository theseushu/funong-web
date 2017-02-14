import combineModules from '../utils/combineModules';
import { SLICE_NAME } from './constants';

let modules = {};
if (process.env.ADMIN) {
  const fetchAll = require('./admin/fetchAll'); // eslint-disable-line global-require
  const fetchUserRoles = require('./admin/fetchUserRoles'); // eslint-disable-line global-require
  const addUserToRole = require('./admin/addUserToRole'); // eslint-disable-line global-require
  const removeUserFromRole = require('./admin/removeUserFromRole'); // eslint-disable-line global-require
  modules = { ...modules, fetchAll, fetchUserRoles, addUserToRole, removeUserFromRole };
}

module.exports = combineModules(modules, SLICE_NAME);
