import combineModules from 'api/utils/combineModules';
import * as conversations from './conversations';
import * as currentConversation from './currentConversation';
import { SLICE_NAME } from './constants';

const modules = { conversations, currentConversation };
// todo leave this line here
if (process.env.ADMIN) {} // eslint-disable-line

module.exports = combineModules(modules, SLICE_NAME);
