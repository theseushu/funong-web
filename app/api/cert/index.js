import combineModules from '../utils/combineModules';
import * as create from './create';
import * as update from './update';
import * as searchMine from './searchMine';
import { SLICE_NAME } from './constants';

let modules = { create, update, searchMine };
if (process.env.ADMIN) {
  const search = require('./admin/search'); // eslint-disable-line global-require
  const searchUnverified = require('./admin/searchUnverified'); // eslint-disable-line global-require
  const changeStatus = require('./admin/changeStatus'); // eslint-disable-line global-require
  const verify = require('./admin/verify'); // eslint-disable-line global-require
  const reject = require('./admin/reject'); // eslint-disable-line global-require
  modules = { ...modules, search, searchUnverified, changeStatus, verify, reject };
}

module.exports = combineModules(modules, SLICE_NAME);
