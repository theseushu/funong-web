import combineModules from 'api/utils/combineModules';
import * as conversations from './conversations';
import * as currentConversation from './currentConversation';
import * as sendingMessages from './sendingMessages';
import * as messages from './messages';
import { SLICE_NAME } from './constants';

const modules = { conversations, currentConversation, sendingMessages, messages };
// todo leave this line here
if (process.env.ADMIN) {} // eslint-disable-line

const combined = combineModules(modules, SLICE_NAME); export default combined.default; export const actions = combined.actions; export const selectors = combined.selectors; export const sagas = combined.sagas;
