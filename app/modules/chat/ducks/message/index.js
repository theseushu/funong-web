import combineModules from 'api/utils/combineModules';
import * as send from './send';
import * as retry from './retry';
import * as query from './query';
import { SLICE_NAME } from './constants';

const modules = { send, retry, query };
// todo leave this line here
if (process.env.ADMIN) {} // eslint-disable-line

const combined = combineModules(modules, SLICE_NAME); export default combined.default; export const actions = combined.actions; export const selectors = combined.selectors; export const sagas = combined.sagas;
