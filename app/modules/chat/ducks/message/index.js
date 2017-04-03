import combineModules from 'api/utils/combineModules';
import * as send from './send';
import * as retry from './retry';
import * as query from './query';
import { SLICE_NAME } from './constants';

const modules = { send, retry, query };
// todo leave this line here
if (process.env.ADMIN) {} // eslint-disable-line

module.exports = combineModules(modules, SLICE_NAME);
